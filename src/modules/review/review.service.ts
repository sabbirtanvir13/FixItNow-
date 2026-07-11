// import { Booking_Status } from "../../../generated/prisma/enums";
// import { prisma } from "../../lib/prisma";
// import { ICreateReview } from "./review.interface";


// const createReviewIntoDB = async(
//  userId:string,
//  payload:ICreateReview
// )=>{

// const booking = await prisma.booking.findFirstOrThrow({

// where:{

// id:payload.booking_id,

// customer_id:userId,

// status:Booking_Status.PAID

// }

// });


// const alreadyReviewed =await prisma.review.findUnique({

// where:{
//  booking_id:payload.booking_id
// }

// });

// if(alreadyReviewed){

// throw new Error("Review already submitted");

// }


// const review =await prisma.review.create({

// data:{

// booking_id:booking.id,

// customer_id:userId,

// technician_id:booking.technician_id,

// rating:payload.rating,

// comment:payload.comment

// }

// });


// await prisma.technicianProfile.update({

// where:{
//  id:booking.technician_id
// },

// data:{

// total_reviews:{
//  increment:1
// }

// }

// });


// return review;

// };

// export const ReviewService={

// createReviewIntoDB

// };



import { Booking_Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

const createReviewIntoDB = async (
  userId: string,
  payload: ICreateReview
) => {

  // ১. বুকিং চেক করা (PAID অথবা COMPLETED)
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

export const ReviewService = {
  createReviewIntoDB,
};