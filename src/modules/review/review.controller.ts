import { Request, Response } from "express";
import httpStatus from "http-status";
import { sendResponse } from "../../utlis/sendResponse";
import { ReviewService } from "./review.service";
import { catchAsync } from "../../utlis/catchAsync";


const createReview = catchAsync(
async(req:Request,res:Response)=>{

const review =await ReviewService.createReviewIntoDB(
req.user!.id,
req.body

);

sendResponse(res,{

success:true,

statusCode:httpStatus.CREATED,

message:"Review created successfully",

data:review

});

});

export const ReviewController={

createReview

};