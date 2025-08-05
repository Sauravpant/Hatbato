import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.ts";
import { rateLimit } from "express-rate-limit";

const app = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50, //
  standardHeaders: "draft-8",
  ipv6Subnet: 56,
});
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(limiter);

import authRoutes from "./routes/auth.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import notificationRoute from "./routes/notification.routes.ts";
import productRoutes from "./routes/product.routes.ts";
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/notification", notificationRoute);
app.use("/api/v1/user/product", productRoutes);
app.use(errorMiddleware);
export default app;
