



import { Router } from "express";
import { auth } from "../../middlewares/auth";

import { TechnicianController } from "./technician.controller";
import { Role } from "../../../generated/prisma/enums";


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



// GET: সকল অ্যাভেইল্যাবিলিটি দেখার জন্য
router.get(
    "/availability",
    auth(Role.Technician),
    TechnicianController.getAvailabilities
);

// POST: নতুন অ্যাভেইল্যাবিলিটি স্লট অ্যাড (Create) করার জন্য
router.post(
    "/availability",
    auth(Role.Technician),
    TechnicianController.addAvailability
);

// PUT: সব অ্যাভেইল্যাবিলিটি একসাথে আপডেট/ওভাররাইট করার জন্য (আগের ফাংশন)
router.put(
    "/availability",
    auth(Role.Technician),
    TechnicianController.updateAvailability
);

// DELETE: নির্দিষ্ট আইডি দিয়ে অ্যাভেইল্যাবিলিটি ডিলিট করার জন্য
router.delete(
    "/availability/:id",
    auth(Role.Technician),
    TechnicianController.deleteAvailability
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