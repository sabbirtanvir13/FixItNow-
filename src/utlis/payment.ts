import axios from "axios";
import qs from "qs";
import { Booking, User } from "../../generated/prisma/client";
import config from "../config";


const initialPayment = async (
  booking: Booking,
  user: User
) => {


  const tranId = `TRNX_ID_${Date.now()}`;



  const paymentData = {

    store_id: config.ssl_commerz_store_id,

    store_passwd: config.ssl_commerz_store_password,


    total_amount: String(booking.price),


    currency: "BDT",


    tran_id: tranId,



    success_url:
      "http://localhost:5000/api/payments/success",


    fail_url:
      "http://localhost:5000/api/payments/fail",


    cancel_url:
      "http://localhost:5000/api/payments/cancel",



    cus_name: user.name,


    cus_email: user.email,


    cus_add1: "Dhaka",


    cus_add2: "N/A",


    cus_city: "Dhaka",


    cus_state: "Dhaka",


    cus_postcode: "1200",


    cus_country: "Bangladesh",


    cus_phone: "01711111111",


    cus_fax: "N/A",



    shipping_method: "NO",


    product_name:
      "FixItNow Home Service",


    product_category:
      "Home Service",


    product_profile:
      "general"

  };



  console.log(
    "PAYMENT DATA =====>",
    paymentData
  );



  const response = await axios.post(


    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",


    qs.stringify(paymentData),


    {

      headers:{

        "Content-Type":
        "application/x-www-form-urlencoded"

      }

    }

  );



  const data = response.data;



  console.log(
    "SSL RESPONSE =====>",
    data
  );

  if(data.status !== "SUCCESS"){

    throw new Error(
      data.failedreason ||
      "SSL Payment Failed"
    );

  }



  return {

    tran_id: tranId,


    GatewayPageURL:
      data.GatewayPageURL

  };


};



export const paymentService = {

  initialPayment

};