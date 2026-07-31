import { Booking_Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

// Create Review
const createReviewIntoDB = async (
  userId: string,
  payload: ICreateReview
) => {
  const booking = await prisma.booking.findFirstOrThrow({
    where: {
      id: payload.booking_id,
      customer_id: userId,
      status: {
        in: [Booking_Status.PAID, Booking_Status.COMPLETED],
      },
    },
  });

  const alreadyReviewed = await prisma.review.findUnique({
    where: {
      booking_id: payload.booking_id,
    },
  });

  if (alreadyReviewed) {
    throw new Error("Review already submitted");
  }

  const result = await prisma.$transaction(async (tx) => {
    const review = await tx.review.create({
      data: {
        booking_id: booking.id,
        customer_id: userId,
        technician_id: booking.technician_id,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    await tx.technicianProfile.update({
      where: {
        id: booking.technician_id,
      },
      data: {
        total_reviews: {
          increment: 1,
        },
      },
    });

    return review;
  });

  return result;
};

// Get My Reviews
const getMyReviewsFromDB = async (userId: string) => {
  return prisma.review.findMany({
    where: {
      customer_id: userId,
    },
    include: {
      booking: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

// Get Single Review
const getSingleReviewFromDB = async (
  userId: string,
  reviewId: string
) => {
  return prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
      customer_id: userId,
    },
    include: {
      booking: true,
      technician: {
        include: {
          user: true,
        },
      },
    },
  });
};

// Update Review
const updateReviewIntoDB = async (
  userId: string,
  reviewId: string,
  payload: {
    rating?: number;
    comment?: string;
  }
) => {
  await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
      customer_id: userId,
    },
  });

  return prisma.review.update({
    where: {
      id: reviewId,
    },
    data: payload,
  });
};

// Delete Review
const deleteReviewFromDB = async (
  userId: string,
  reviewId: string
) => {
  await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
      customer_id: userId,
    },
  });

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return null;
};

export const ReviewService = {
  createReviewIntoDB,
  getMyReviewsFromDB,
  getSingleReviewFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
};