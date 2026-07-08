import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";
import { TechnicianController } from "./technician.controller";

const router = Router();



router.put(
  "/profile",
  auth(Role.Technician),
  TechnicianController.updateTechnicianProfile
);

router.get(
  "/profile",
  auth(Role.Technician),
  TechnicianController.getTechnicianProfile
);

router.get(
  "/bookings",
  auth(Role.Technician),
  TechnicianController.getTechnicianBookings
);

router.patch(
  "/bookings/:id",
  auth(Role.Technician),
  TechnicianController.updateBookingStatus
);

router.put(
 "/availability",
 auth(Role.Technician),
 TechnicianController.updateAvailability
);



router.get(
  "/",
  TechnicianController.getAllTechnicians
);

router.get(
  "/:id",
  TechnicianController.getSingleTechnician
);

export const technicianRoutes = router;