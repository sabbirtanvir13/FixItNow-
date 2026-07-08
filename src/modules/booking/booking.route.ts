import { Router } from "express";
import { BookingController } from "./booking.controller";
import { Role } from "../../../generated/prisma/client";
import { auth } from "../../middlewares/auth";



const router = Router();



router.post(
"/",
auth(Role.Customer),
BookingController.createBooking
);



router.get(
"/",
auth(Role.Customer),
BookingController.getMyBookings
);



router.get(
"/:id",
auth(Role.Customer),
BookingController.getSingleBooking
);



export const bookingRoutes = router;