import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { ReviewService } from "./review.service";

// Create Review
const createReview = catchAsync(async (req: Request, res: Response) => {
    const review = await ReviewService.createReviewIntoDB(
        req.user!.id as string,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review created successfully",
        data: review,
    });
});

// Get My Reviews
const getMyReviews = catchAsync(async (req: Request, res: Response) => {
    const reviews = await ReviewService.getMyReviewsFromDB(
        req.user!.id as string
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My reviews fetched successfully",
        data: reviews,
    });
});

// Get Single Review
const getSingleReview = catchAsync(async (req: Request, res: Response) => {
    const review = await ReviewService.getSingleReviewFromDB(
        req.user!.id as string,
        req.params.id as string
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review fetched successfully",
        data: review,
    });
});

// Update Review
const updateReview = catchAsync(async (req: Request, res: Response) => {
    const review = await ReviewService.updateReviewIntoDB(
        req.user!.id as string,
        req.params.id as string,
        req.body
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review updated successfully",
        data: review,
    });
});

// Delete Review
const deleteReview = catchAsync(async (req: Request, res: Response) => {
    await ReviewService.deleteReviewFromDB(
        req.user!.id as string,
        req.params.id as string
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review deleted successfully",
        data: null,
    });
});

export const ReviewController = {
    createReview,
    getMyReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};