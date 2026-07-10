// import { Request, Response } from "express";
// import httpStatus from "http-status";

// import { catchAsync } from "../../utlis/catchAsync";
// import { sendResponse } from "../../utlis/sendResponse";
// import { PaymentService } from "./payment.service";





// const createPayment =
// catchAsync(async(
// req:Request,
// res:Response
// )=>{


// const payment =
// await PaymentService.createPaymentIntoDB(

// req.user!.id,

// req.body.bookingId

// );



// sendResponse(res,{

// success:true,

// statusCode:httpStatus.OK,

// message:"Payment initialized successfully",

// data:payment

// });


// });







// const paymentSuccess =
// catchAsync(async(
// req:Request,
// res:Response
// )=>{


// await PaymentService.paymentSuccessIntoDB(

// req.body.tran_id

// );



// res.status(200).json({

// success:true,

// message:"Payment successful"

// });


// });







// const paymentFail =
// catchAsync(async(
// req:Request,
// res:Response
// )=>{


// await PaymentService.paymentFailIntoDB(

// req.body.tran_id

// );



// res.status(200).json({

// success:false,

// message:"Payment failed"

// });


// });







// const paymentCancel =
// catchAsync(async(
// req:Request,
// res:Response
// )=>{


// await PaymentService.paymentCancelIntoDB(

// req.body.tran_id

// );



// res.status(200).json({

// success:false,

// message:"Payment cancelled"

// });


// });







// const getMyPayments =
// catchAsync(async(
// req:Request,
// res:Response
// )=>{


// const payments =
// await PaymentService.getMyPaymentsFromDB(

// req.user!.id

// );



// sendResponse(res,{

// success:true,

// statusCode:httpStatus.OK,

// message:"Payments fetched successfully",

// data:payments

// });


// });






// const getSinglePayment =
// catchAsync(async(
// req:Request,
// res:Response
// )=>{


// const payment =
// await PaymentService.getSinglePaymentFromDB(

// req.user!.id,

// req.params.id as string

// );



// sendResponse(res,{

// success:true,

// statusCode:httpStatus.OK,

// message:"Payment fetched successfully",

// data:payment

// });


// });

// const confirmPayment =
// catchAsync(async (
//   req: Request,
//   res: Response
// ) => {

//   const payment =
//   await PaymentService.paymentSuccessIntoDB(
//     req.body.tran_id
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Payment confirmed successfully",
//     data: payment
//   });

// });


// export const PaymentController={


// createPayment,

// paymentSuccess,

// paymentFail,

// paymentCancel,

// getMyPayments,

// getSinglePayment,
// confirmPayment


// };





import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { PaymentService } from "./payment.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  // ফ্রন্টএন্ড থেকে bookingId বা booking_id যেটাই আসুক, রিসিভ করবে
  const bookingId = req.body.bookingId || req.body.booking_id;

  // Validation: যদি bookingId না থাকে, তবে এরর থ্রো করবে
  if (!bookingId) {
    throw new Error("bookingId is missing in the request body!");
  }

  const payment = await PaymentService.createPaymentIntoDB(
    req.user!.id,
    bookingId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment initialized successfully",
    data: payment
  });
});

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  await PaymentService.paymentSuccessIntoDB(req.body.tran_id);

  res.status(200).json({
    success: true,
    message: "Payment successful"
  });
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  await PaymentService.paymentFailIntoDB(req.body.tran_id);

  res.status(200).json({
    success: false,
    message: "Payment failed"
  });
});

const paymentCancel = catchAsync(async (req: Request, res: Response) => {
  await PaymentService.paymentCancelIntoDB(req.body.tran_id);

  res.status(200).json({
    success: false,
    message: "Payment cancelled"
  });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await PaymentService.getMyPaymentsFromDB(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payments fetched successfully",
    data: payments
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await PaymentService.getSinglePaymentFromDB(
    req.user!.id,
    req.params.id as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment fetched successfully",
    data: payment
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await PaymentService.paymentSuccessIntoDB(req.body.tran_id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: payment
  });
});

export const PaymentController = {
  createPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getMyPayments,
  getSinglePayment,
  confirmPayment
};