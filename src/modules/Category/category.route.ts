import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { CategoryController } from "./category.controller";
import { Role } from "../../../generated/prisma/client";



const router = Router();



// Admin only create

router.post(
 "/",
 auth(Role.Admin),
 CategoryController.createCategory
);



// Public get all

router.get(
 "/",
 CategoryController.getAllCategories
);



export const categoryRoutes = router;