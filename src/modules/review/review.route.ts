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

router.get(
  "/my-reviews",
  auth(Role.Customer),
  ReviewController.getMyReviews
);

router.get(
  "/:id",
  auth(Role.Customer),
  ReviewController.getSingleReview
);

router.patch(
  "/:id",
  auth(Role.Customer),
  ReviewController.updateReview
);

router.delete(
  "/:id",
  auth(Role.Customer),
  ReviewController.deleteReview
);

export const reviewRoutes = router;