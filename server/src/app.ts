import express, { Request, Response } from "express";
import type { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import { rateLimit } from "express-rate-limit";

const app: Express = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50, //
  standardHeaders: "draft-8",
  ipv6Subnet: 56,
});

const environment = process.env.NODE_ENV;

app.use(
  cors({
    origin: environment === "production" ? process.env.CORS_ORIGIN : "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(limiter);

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import notificationRoute from "./routes/notification.routes";
import productRoutes from "./routes/product.routes";
import reportRoutes from "./routes/report.routes";
import reviewRoutes from "./routes/review.routes";
import orderRoutes from "./routes/order.routes";
import adminRoutes from "./routes/admin.routes";
import categoryRoutes from "./routes/category.routes";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/notification", notificationRoute);
app.use("/api/v1/user/product", productRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: "Route not found" });
});
app.use(errorMiddleware);
export default app;
