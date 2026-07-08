import cookieParser from "cookie-parser";
import express, { Application,Request,Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/auth/auth.route";
import { technicianRoutes } from "./modules/technician/technician.route";
import { categoryRoutes } from "./modules/Category/category.route";
import { serviceRoutes } from "./modules/service/service.route";
import { bookingRoutes } from "./modules/booking/booking.route";
import { reviewRoutes } from "./modules/review/review.route";

const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: config.app_url,
  credentials: true,
}));



app.get('/', async(req :Request, res:Response) => {
 
  res.send('Hello World!')
})

app.use(
  "/api/auth",
  userRoutes
);

app.use(
"/api/technician",
technicianRoutes
);


app.use(
 "/api/categories",
 categoryRoutes
);


app.use(
"/api/technician/services",
serviceRoutes
);

app.use("/api/services", serviceRoutes);



app.use(
 "/api/bookings",
 bookingRoutes
);



app.use(
"/api/reviews",
reviewRoutes
);

export default app;