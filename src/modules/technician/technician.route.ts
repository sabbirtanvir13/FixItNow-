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



export const technicianRoutes = router;