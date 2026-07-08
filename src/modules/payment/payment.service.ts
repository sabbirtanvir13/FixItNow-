import {
  Booking_Status,
  Payment_Provider,
  Payment_Status
} from "../../../generated/prisma/enums";

import { prisma } from "../../lib/prisma";
import { paymentService } from "../../utlis/payment";



const createPaymentIntoDB = async (
  userId:string,
  bookingId:string
)=>{


  const booking =
  await prisma.booking.findFirstOrThrow({

    where:{

      id:bookingId,

      customer_id:userId,

      status:Booking_Status.ACCEPTED

    }

  });



  const existingPayment =
  await prisma.payment.findUnique({

    where:{
      booking_id:bookingId
    }

  });



  if(existingPayment){

    return {

      payment:existingPayment,

      paymentUrl:
      existingPayment.payment_url

    };

  }



  const user =
  await prisma.user.findUniqueOrThrow({

    where:{
      id:userId
    }

  });



  const sslPayment =
  await paymentService.initialPayment(
    booking,
    user
  );



  const payment =
  await prisma.payment.create({

    data:{


      booking_id:
      booking.id,


      transaction_id:
      sslPayment.tran_id,


      amount:
      booking.price,


      provider:
      Payment_Provider.SSLCOMMERZ,


      status:
      Payment_Status.PENDING,


      payment_url:
      sslPayment.GatewayPageURL

    }

  });



  return {

    payment,

    paymentUrl:
    sslPayment.GatewayPageURL

  };


};






const paymentSuccessIntoDB = async(
tranId:string
)=>{


const payment =
await prisma.payment.update({

where:{
 transaction_id:tranId
},


data:{

 status:
 Payment_Status.COMPLETED

}

});



await prisma.booking.update({

where:{
 id:payment.booking_id
},


data:{

 status:
 Booking_Status.PAID

}

});



return payment;


};






const paymentFailIntoDB = async(
tranId:string
)=>{


return prisma.payment.update({

where:{
 transaction_id:tranId
},


data:{

 status:
 Payment_Status.FAILED

}

});


};







const paymentCancelIntoDB = async(
tranId:string
)=>{


return prisma.payment.update({

where:{
 transaction_id:tranId
},


data:{

 status:
 Payment_Status.CANCELLED

}

});


};






const getMyPaymentsFromDB = async(
userId:string
)=>{


return prisma.payment.findMany({

where:{


 booking:{


 customer_id:userId


 }

},


include:{


booking:true


},


orderBy:{


created_at:"desc"


}


});


};






const getSinglePaymentFromDB = async(
userId:string,
paymentId:string
)=>{


return prisma.payment.findFirstOrThrow({

where:{


id:paymentId,


booking:{


customer_id:userId


}


},


include:{


booking:true


}


});


};





export const PaymentService={


createPaymentIntoDB,

paymentSuccessIntoDB,

paymentFailIntoDB,

paymentCancelIntoDB,

getMyPaymentsFromDB,

getSinglePaymentFromDB


};