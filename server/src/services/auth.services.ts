import { prisma } from "../db/config.ts";
import bcrypt from "bcrypt";
import type { RegisterData, LoginData, RegistrationResponse, LoginResponse } from "../types/auth.types.ts";
import { AppError } from "../utils/app-error.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/token.ts";

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

export const logOut = async (userId: string) :Promise<void>=> {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: "",
    },
  });
};
