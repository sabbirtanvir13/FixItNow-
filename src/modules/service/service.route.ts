import { Router } from "express";
import { ServiceController } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";



const router = Router();


// Technician create service

router.post(
  "/",
  auth(Role.Technician),
  ServiceController.createService
);

router.get(
  "/my-services",
  auth(Role.Technician),
  ServiceController.getMyServices
);

router.get("/", ServiceController.getAllServices);

router.get("/:id", ServiceController.getSingleService);

router.patch(
  "/:id",
  auth(Role.Technician),
  ServiceController.updateService
);

router.delete(
  "/:id",
  auth(Role.Technician),
  ServiceController.deleteService
);

export const serviceRoutes = router;