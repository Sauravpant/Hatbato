import { prisma } from "../db/config.ts";
import bcrypt from "bcrypt";
import type { RegisterData, LoginData, RegistrationResponse, LoginResponse, ResetPasswordData } from "../types/auth.types.ts";
import { AppError } from "../utils/app-error.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/token.ts";
import { User } from "../../generated/prisma/index.js";
import sendMail from "../utils/nodemailer.ts";

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
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      refreshToken: refreshToken,
    },
  });
  const { password, ...userData } = user;
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

export const resetPassword = async (data: ResetPasswordData): Promise<Omit<User, "password">> => {
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
  const { password, ...userData } = user;
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
  await prisma.otp.create({
    data: {
      email,
      otp: userOtp,
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
    await prisma.otp.delete({
      where: {
        email: email,
      },
    });
    throw new AppError(400, "OTP expired");
  }

  //Check if the OTP matches with the submitted OTP
  if (otpEntry.otp !== submittedOtp) {
    throw new AppError(400, "Invalid OTP.Try again");
  }
  //If the submitted otp matches mark the user as verified
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      isVerified: true,
    },
  });
  //Delete the entry in the otp table after successful verification
  await prisma.otp.delete({ where: { email } });
};
