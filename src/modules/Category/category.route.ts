import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { CategoryController } from "./category.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Admin only create category
router.post(
    "/",
    auth(Role.Admin),
    CategoryController.createCategory
);

// Public get all categories
router.get(
    "/",
    CategoryController.getAllCategories
);

// Public get single category by ID
router.get(
    "/:id",
    CategoryController.getSingleCategory
);

// Admin only update category
router.patch(
    "/:id",
    auth(Role.Admin),
    CategoryController.updateCategory
);

// Admin only delete category
router.delete(
    "/:id",
    auth(Role.Admin),
    CategoryController.deleteCategory
);

export const categoryRoutes = router;