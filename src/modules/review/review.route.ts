import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post(
  "/",
  auth(Role.Customer),
  ReviewController.createReview
);

export const reviewRoutes = router;