// import { Request, Response } from "express";
// import httpStatus from "http-status";

// import { catchAsync } from "../../utlis/catchAsync";
// import { sendResponse } from "../../utlis/sendResponse";
// import { PaymentService } from "./payment.service";

// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// const createPayment = catchAsync(async (req: Request, res: Response) => {
//   const bookingId = req.body.bookingId || req.body.booking_id;

//   if (!bookingId) {
//     throw new Error("bookingId is missing in the request body!");
//   }

//   const payment = await PaymentService.createPaymentIntoDB(
//     req.user!.id,
//     bookingId
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Payment initialized successfully",
//     data: payment
//   });
// });

// const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
//    console.log("========== SUCCESS CALLBACK ==========");
//   console.log("METHOD:", req.method);
//   console.log("BODY:", req.body);
//   console.log("QUERY:", req.query);

//   const tranId = req.body.tran_id || req.query.tran_id || req.body.val_id;

//   if (tranId) {
//     try {
//       await PaymentService.paymentSuccessIntoDB(tranId as string);
//     } catch (err) {
//       console.error("Error in paymentSuccessIntoDB:", err);
//     }
//   }

//   res.redirect(303, `${FRONTEND_URL}/payment/confirm?tran_id=${tranId || ""}&payment=success`);
// });

// const paymentFail = catchAsync(async (req: Request, res: Response) => {
//   const tranId = req.body.tran_id || req.query.tran_id || req.body.val_id;

//   if (tranId) {
//     try {
//       await PaymentService.paymentFailIntoDB(tranId as string);
//     } catch (err) {
//       console.error("Error in paymentFailIntoDB:", err);
//     }
//   }

//   res.redirect(303, `${FRONTEND_URL}/payment/confirm?tran_id=${tranId || ""}&payment=failed`);
// });

// const paymentCancel = catchAsync(async (req: Request, res: Response) => {
//   const tranId = req.body.tran_id || req.query.tran_id || req.body.val_id;

//   if (tranId) {
//     try {
//       await PaymentService.paymentCancelIntoDB(tranId as string);
//     } catch (err) {
//       console.error("Error in paymentCancelIntoDB:", err);
//     }
//   }

//   res.redirect(303, `${FRONTEND_URL}/payment/confirm?tran_id=${tranId || ""}&payment=cancelled`);
// });

// const getMyPayments = catchAsync(async (req: Request, res: Response) => {
//   const payments = await PaymentService.getMyPaymentsFromDB(req.user!.id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Payments fetched successfully",
//     data: payments
//   });
// });

// const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
//   const payment = await PaymentService.getSinglePaymentFromDB(
//     req.user!.id,
//     req.params.id as string
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Payment fetched successfully",
//     data: payment
//   });
// });

// const confirmPayment = catchAsync(async (req: Request, res: Response) => {
//   const tranId = req.body.tran_id || req.body.tranId;

//   if (!tranId) {
//     throw new Error("Transaction ID is missing in the request body!");
//   }

//   const payment = await PaymentService.paymentSuccessIntoDB(tranId);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Payment confirmed successfully",
//     data: payment
//   });
// });

// export const PaymentController = {
//   createPayment,
//   paymentSuccess,
//   paymentFail,
//   paymentCancel,
//   getMyPayments,
//   getSinglePayment,
//   confirmPayment
// };


import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utlis/catchAsync";
import { sendResponse } from "../../utlis/sendResponse";
import { PaymentService } from "./payment.service";

const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://fixitnow-frontend-flax.vercel.app";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.body.bookingId || req.body.booking_id;

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
    data: payment,
  });
});

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  console.log("\n========== SUCCESS CALLBACK ==========");
  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("BODY:", req.body);
  console.log("QUERY:", req.query);
  console.log("HEADERS:", req.headers);

  const tranId =
    req.body?.tran_id ||
    req.query?.tran_id ||
    req.body?.val_id ||
    req.query?.val_id;

  console.log("TRANSACTION ID:", tranId);

  if (tranId) {
    try {
      await PaymentService.paymentSuccessIntoDB(tranId as string);
      console.log("✅ Payment marked as COMPLETED");
    } catch (err) {
      console.error("❌ Error in paymentSuccessIntoDB:", err);
    }
  } else {
    console.log("❌ No transaction ID received.");
  }

  res.redirect(
    303,
    `${FRONTEND_URL}/payment/confirm?tran_id=${tranId || ""}&payment=success`
  );
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  console.log("\n========== FAIL CALLBACK ==========");
  console.log("METHOD:", req.method);
  console.log("BODY:", req.body);
  console.log("QUERY:", req.query);

  const tranId =
    req.body?.tran_id ||
    req.query?.tran_id ||
    req.body?.val_id ||
    req.query?.val_id;

  console.log("TRANSACTION ID:", tranId);

  if (tranId) {
    try {
      await PaymentService.paymentFailIntoDB(tranId as string);
      console.log("❌ Payment marked as FAILED");
    } catch (err) {
      console.error("Error in paymentFailIntoDB:", err);
    }
  }

  res.redirect(
    303,
    `${FRONTEND_URL}/payment/confirm?tran_id=${tranId || ""}&payment=failed`
  );
});

const paymentCancel = catchAsync(async (req: Request, res: Response) => {
  console.log("\n========== CANCEL CALLBACK ==========");
  console.log("METHOD:", req.method);
  console.log("BODY:", req.body);
  console.log("QUERY:", req.query);

  const tranId =
    req.body?.tran_id ||
    req.query?.tran_id ||
    req.body?.val_id ||
    req.query?.val_id;

  console.log("TRANSACTION ID:", tranId);

  if (tranId) {
    try {
      await PaymentService.paymentCancelIntoDB(tranId as string);
      console.log("⚠️ Payment marked as CANCELLED");
    } catch (err) {
      console.error("Error in paymentCancelIntoDB:", err);
    }
  }

  res.redirect(
    303,
    `${FRONTEND_URL}/payment/confirm?tran_id=${tranId || ""}&payment=cancelled`
  );
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await PaymentService.getMyPaymentsFromDB(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payments fetched successfully",
    data: payments,
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
    data: payment,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const tranId = req.body?.tran_id || req.body?.tranId;

  if (!tranId) {
    throw new Error("Transaction ID is missing in the request body!");
  }

  const payment = await PaymentService.paymentSuccessIntoDB(tranId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: payment,
  });
});

export const PaymentController = {
  createPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getMyPayments,
  getSinglePayment,
  confirmPayment,
};