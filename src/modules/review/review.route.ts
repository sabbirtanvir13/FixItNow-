import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/client";
import { ReviewController } from "./review.controller";


const router = Router();

router.post(
  "/",
  auth(Role.Customer),
  ReviewController.createReview
);

export const reviewRoutes = router;