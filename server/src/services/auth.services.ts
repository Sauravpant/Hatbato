import { prisma } from "../db/config";
import bcrypt from "bcrypt";
import type { RegisterData, LoginData, RegistrationResponse, LoginResponse, ResetPasswordData } from "../types/auth.types";
import { AppError } from "../utils/app-error";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { User } from "../../generated/prisma/index.js";
import sendMail from "../utils/nodemailer";

export const register = async (data: RegisterData): Promise<RegistrationResponse> => {
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { contactNumber: data.contactNumber }],
    },
  });
  if (userExists) {
    throw new AppError(409, "User with the above email address or contact number already exists");
  }
  const salts = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salts);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  //Create the notification for user
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: "account_created",
      message: "Your account has been successfully created.",
    },
  });
  const { password, ...userData } = user;
  return { userData };
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  const result = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      refreshToken: refreshToken,
      isActive: true,
    },
  });
  const { password, imagePublicId, refreshToken: token, ...userData } = result;
  return { accessToken, refreshToken, userData };
};

export const logOut = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: "",
    },
  });
};

export const resetPassword = async (data: ResetPasswordData): Promise<Omit<User, "password" | "refreshToken">> => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(data.oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new AppError(401, "Passwords do not match");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.newPassword, salt);
  await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      password: hashedPassword,
    },
  });
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: "password_changed",
      message: "Your password has been changed successfully.",
    },
  });
  const { password, refreshToken, ...userData } = user;
  return userData;
};

export const sendOTP = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new AppError(401, "User doesnt exist");
  }
  if (user.isVerified) {
    throw new AppError(401, "Account is already verified");
  }
  const userOtp = Math.floor(100000 + Math.random() * 900000).toString();
  //Hash the otp -> Save the hashed otp in the database and send the unhashed otp to user's email
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(userOtp, salt);
  await prisma.otp.create({
    data: {
      email,
      otp: hashedOtp,
    },
  });
  await sendMail(email, userOtp);
};

export const verifyEmail = async (email: string, submittedOtp: string) => {
  const otpEntry = await prisma.otp.findUnique({
    where: {
      email: email,
    },
  });
  if (!otpEntry) {
    throw new AppError(400, "OTP not found or expired");
  }
  const expiryTime = 5 * 60 * 1000; //5 minutes timestamp for otp
  if (Date.now() - otpEntry.createdAt.getTime() > expiryTime) {
    //Delete the OTP entry if the otp is expired
    await prisma.otp.deleteMany({
      where: {
        email: email,
      },
    });
    throw new AppError(400, "OTP expired");
  }
  const isOtpMatches = await bcrypt.compare(submittedOtp, otpEntry.otp);
  //Check if the OTP matches with the submitted OTP
  if (!isOtpMatches) {
    throw new AppError(400, "Invalid OTP.Try again");
  }
  const user = await prisma.user.findUnique({ where: { email } });
  //If the submitted otp matches mark the user as verified
  await prisma.$transaction([
    prisma.user.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    }),
    prisma.notification.create({
      data: {
        userId: user.id,
        type: "account_verified",
        message: "Your account has been verified successfully.",
      },
    }),
    //Delete the entry in the otp table after successful verification
    prisma.otp.delete({ where: { email } }),
  ]);
};
