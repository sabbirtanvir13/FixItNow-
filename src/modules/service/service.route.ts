import { Router } from "express";
import { ServiceController } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";


const router = Router();


// Technician create service

router.post("/",auth(Role.Technician),ServiceController.createService);


router.get("/",ServiceController.getAllServices);

// Single service

router.get("/:id",ServiceController.getSingleService);


export const serviceRoutes = router;