import { Router } from "express";

import { PaymentController } from "./payment.controller";

import { auth } from "../../middlewares/auth";

import { Role } from "../../../generated/prisma/enums";


const router = Router();




// create payment

router.post(

"/create",

auth(Role.Customer),

PaymentController.createPayment

);


router.post(
  "/confirm",
  auth(Role.Customer),
  PaymentController.confirmPayment
);


// SSL callback

router.post(

"/success",

PaymentController.paymentSuccess

);



router.post(

"/fail",

PaymentController.paymentFail

);



router.post(

"/cancel",

PaymentController.paymentCancel

);





// customer payment history

router.get(

"/",

auth(Role.Customer),

PaymentController.getMyPayments

);





router.get(

"/:id",

auth(Role.Customer),

PaymentController.getSinglePayment

);




export const paymentRoutes = router;