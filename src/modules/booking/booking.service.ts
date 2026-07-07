

import { prisma } from "../../lib/prisma";
import { ICreateBooking } from "./booking.interface";

const createBookingIntoDB = async(
 userId:string,
 payload:ICreateBooking
)=>{


const service = await prisma.service.findUniqueOrThrow({

 where:{
  id:payload.service_id
 }

});



const booking = await prisma.booking.create({

 data:{


  customer_id:userId,

  technician_id:service.technician_id,

  service_id:payload.service_id,


  booking_date:new Date(payload.booking_date),

  start_time:payload.start_time,

  end_time:payload.end_time,


  price:payload.price ?? service.price


 }

});



return booking;


};






const getMyBookingsFromDB = async(
 userId:string
)=>{


const bookings =
await prisma.booking.findMany({

where:{
 customer_id:userId
},


include:{


service:true,


technician:{
 include:{
  user:{
   omit:{
    password:true
   }
  }
 }
},


},


orderBy:{
 created_at:"desc"
}


});


return bookings;


};








const getSingleBookingFromDB = async(
 id:string,
 userId:string
)=>{


const booking =
await prisma.booking.findFirstOrThrow({

where:{
 id,

 customer_id:userId
},


include:{


service:true,


technician:{
 include:{
  user:{
   omit:{
    password:true
   }
  }
 }
}


}


});


return booking;


};





export const BookingService={

createBookingIntoDB,

getMyBookingsFromDB,

getSingleBookingFromDB

};