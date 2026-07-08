
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";

import { userRoutes } from "./modules/auth/auth.route";
import { technicianRoutes } from "./modules/technician/technician.route";
import { categoryRoutes } from "./modules/Category/category.route";
import { serviceRoutes } from "./modules/service/service.route";
import { bookingRoutes } from "./modules/booking/booking.route";
import { reviewRoutes } from "./modules/review/review.route";
import { adminRoutes } from "./modules/Admin/admin.route";
import { paymentRoutes } from "./modules/payment/payment.route";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Auth
app.use("/api/auth", userRoutes);

// Technician (Private)
app.use("/api/technician", technicianRoutes);

// Technician (Public)
app.use("/api/technicians", technicianRoutes);

// Categories
app.use("/api/categories", categoryRoutes);

// Technician Services
app.use("/api/technician/services", serviceRoutes);

// Public Services
app.use("/api/services", serviceRoutes);

// Bookings
app.use("/api/bookings", bookingRoutes);

// Reviews
app.use("/api/reviews", reviewRoutes);
// Admin
app.use("/api/admin",adminRoutes);

app.use("/api/payments",paymentRoutes);


app.use(notFound)
app.use(globalErrorHandler);
export default app;