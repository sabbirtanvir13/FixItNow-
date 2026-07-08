import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";
import { AdminController } from "./admin.controller";

const router = Router();


router.get(
  "/bookings",
  auth(Role.Admin),
  AdminController.getAllBookings
);


router.get(
  "/users",
  auth(Role.Admin),
  AdminController.getAllUsers
);


router.patch(
  "/users/:id",
  auth(Role.Admin),
  AdminController.updateUserStatus
);


router.get(
  "/categories",
  auth(Role.Admin),
  AdminController.getAllCategories
);


router.post(
  "/categories",
  auth(Role.Admin),
  AdminController.createCategory
);


export const adminRoutes = router;