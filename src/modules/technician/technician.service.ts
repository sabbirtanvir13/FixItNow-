// import { prisma } from "../../lib/prisma";
// import { AvailabilityPayload, UpdateTechnicianProfilePayload } from "./technician.interface";




// const updateTechnicianProfileIntoDB = async (
//   userId: string,
//   payload: UpdateTechnicianProfilePayload
// ) => {


//   const technicianProfile =
//     await prisma.technicianProfile.findUnique({
//       where:{
//         userId
//       }
//     });



//   if(!technicianProfile){
//     throw new Error(
//       "Technician profile not found"
//     );
//   }



//   const updatedProfile =
//     await prisma.technicianProfile.update({

//       where:{
//         userId
//       },


//       data:{
//         profilePhoto: payload.profilePhoto,
//         bio: payload.bio,
//         experience_years: payload.experience_years,
//         skills: payload.skills,
//         location: payload.location,
//         hourly_rate: payload.hourly_rate
//       }

//     });



//   return updatedProfile;

// };

// const getTechnicianProfileFromDB = async(
//  userId:string
// )=>{

// const profile =await prisma.technicianProfile.findUniqueOrThrow({

//  where:{
//   userId
//  },


//  include:{
//   user:{
//     select:{
//       id:true,
//       name:true,
//       email:true,
//       role:true
//     }
//   }
//  }


//  });
// return profile;

// };

// const getTechnicianBookingsFromDB = async(
//  userId:string
// )=>{


// const technician =
// await prisma.technicianProfile.findUniqueOrThrow({

// where:{
//  userId
// }

// });



// const bookings =
// await prisma.booking.findMany({

// where:{
//  technician_id: technician.id
// },


// include:{


// customer:{
//  select:{
//   id:true,
//   name:true,
//   email:true
//  }
// },


// service:true


// },


// orderBy:{
//  created_at:"desc"
// }


// });


// return bookings;

// };


// const updateBookingStatusIntoDB = async(
//  userId:string,
//  bookingId:string,
//  status:any
// )=>{


// const technician =
// await prisma.technicianProfile.findUniqueOrThrow({

// where:{
//  userId
// }

// });



// const booking =
// await prisma.booking.findFirst({

// where:{
//  id:bookingId,
//  technician_id:technician.id
// }

// });

// if (!booking) {
//     const error: any = new Error("Booking not found or you don't have permission to update it.");
//     error.statusCode = 404;
//     throw error;
// }

// const updatedBooking =
// await prisma.booking.update({

// where:{
//  id:booking.id
// },


// data:{
//  status
// }

// });


// return updatedBooking;


// };


// const getAllTechniciansFromDB = async () => {
//  const technicians =await prisma.technicianProfile.findMany({

//     include:{
//       user:{
//         select:{
//           id:true,
//           name:true,
//           email:true
//         }
//       },

//       services:{
//         include:{
//           category:true
//         }
//       },

//       reviews:true

//     },

//     orderBy:{
//       createdAt:"desc"
//     }

//   });
//   return technicians;
// };

// const getSingleTechnicianFromDB = async(
//  id:string
// )=>{


// const technician =
// await prisma.technicianProfile.findUniqueOrThrow({

// where:{
//  id
// },
// include:{
//  user:{
//   select:{
//    id:true,
//    name:true,
//    email:true
//   }
//  },

//  services:{
//   include:{
//    category:true
//   }
//  },

//  reviews:{
//   include:{
//    customer:{
//     select:{
//      id:true,
//      name:true
//     }
//    }
//   }
//  },

//  availabilities:true
// }

// });

// return technician;

// };


// const updateAvailabilityIntoDB = async(
//  userId:string,
//  payload:AvailabilityPayload[]
// )=>{


// const technician =
// await prisma.technicianProfile.findUniqueOrThrow({

// where:{
//  userId
// }

// });



// await prisma.availability.deleteMany({

// where:{
//  technician_id:technician.id
// }

// });



// await prisma.availability.createMany({

// data:
// payload.map((item)=>({

// technician_id:technician.id,

// day:item.day,

// start_time:item.start_time,

// end_time:item.end_time,

// is_available:item.is_available ?? true

// }))

// });



// return await prisma.availability.findMany({

// where:{
//  technician_id:technician.id
// }

// });


// };

// export const TechnicianService={

// updateTechnicianProfileIntoDB,
// getTechnicianProfileFromDB,
// getTechnicianBookingsFromDB,
// getAllTechniciansFromDB,
// getSingleTechnicianFromDB,
// updateBookingStatusIntoDB,
// updateAvailabilityIntoDB
// };




import { Booking_Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  AvailabilityPayload,
  UpdateTechnicianProfilePayload,

} from "./technician.interface";
import httpStatus from "http-status";


class AppError extends Error {

  statusCode: number;

  constructor(
    statusCode: number,
    message: string
  ) {

    super(message);

    this.statusCode = statusCode;

  }

}



const updateTechnicianProfileIntoDB = async (
  userId: string,
  payload: UpdateTechnicianProfilePayload
) => {


  const technicianProfile =
    await prisma.technicianProfile.findUnique({

      where: {
        userId
      }

    });



  if (!technicianProfile) {

    throw new AppError(
      httpStatus.NOT_FOUND,
      "Technician profile not found"
    );

  }



  const updatedProfile =
    await prisma.technicianProfile.update({

      where: {
        userId
      },

      data: {

        profilePhoto: payload.profilePhoto,

        bio: payload.bio,

        experience_years: payload.experience_years,

        skills: payload.skills,

        location: payload.location,

        hourly_rate: payload.hourly_rate

      }

    });


  return updatedProfile;


};







const getTechnicianProfileFromDB = async (
  userId: string
) => {


  const profile =
    await prisma.technicianProfile.findUniqueOrThrow({

      where: {
        userId
      },


      include: {


        user: {

          select: {

            id: true,

            name: true,

            email: true,

            role: true

          }

        }


      }


    });


  return profile;


};







const getTechnicianBookingsFromDB = async (
  userId: string
) => {


  const technician =
    await prisma.technicianProfile.findUniqueOrThrow({

      where: {
        userId
      }

    });




  const bookings =
    await prisma.booking.findMany({

      where: {

        technician_id: technician.id

      },


      include: {


        customer: {

          select: {

            id: true,

            name: true,

            email: true

          }

        },


        service: true


      },


      orderBy: {

        created_at: "desc"

      }


    });


  return bookings;


};









const updateBookingStatusIntoDB = async (

  userId: string,

  bookingId: string,

  nextStatus: Booking_Status

) => {



  const technician =
    await prisma.technicianProfile.findUnique({

      where: {
        userId
      }

    });



  if (!technician) {

    throw new AppError(
      404,
      "Technician profile not found"
    );

  }





  const booking =
    await prisma.booking.findFirst({

      where: {


        id: bookingId,


        technician_id: technician.id


      }


    });



  if (!booking) {

    throw new AppError(

      404,

      "Booking not found or you don't have permission."

    );

  }




  const currentStatus =
    booking.status as Booking_Status;





  if (currentStatus === "CANCELLED") {


    throw new AppError(

      400,

      "Cancelled booking cannot be updated"

    );


  }





  if (
    nextStatus === "ACCEPTED" ||
    nextStatus === "DECLINED"
  ) {


    if (currentStatus !== "REQUESTED") {


      throw new AppError(

        400,

        `Can only accept or decline REQUESTED booking. Current status ${currentStatus}`

      );


    }


  }






  if (nextStatus === "IN_PROGRESS") {


    if (currentStatus !== "PAID") {


      throw new AppError(

        400,

        "Booking must be PAID before starting job"

      );


    }


  }






  if (nextStatus === "COMPLETED") {


    if (currentStatus !== "IN_PROGRESS") {


      throw new AppError(

        400,

        "Booking must be IN_PROGRESS before completing"

      );


    }


  }






  if (nextStatus === "PAID") {


    throw new AppError(

      400,

      "Payment status updated by payment system"

    );


  }






  const updatedBooking =
    await prisma.booking.update({

      where: {

        id: booking.id

      },


      data: {


        status: nextStatus


      }


    });



  return updatedBooking;



};









const getAllTechniciansFromDB = async () => {


  const technicians =
    await prisma.technicianProfile.findMany({


      include: {


        user: {

          select: {

            id: true,

            name: true,

            email: true

          }

        },


        services: {

          include: {

            category: true

          }

        },


        reviews: true


      },



      orderBy: {


        createdAt: "desc"


      }


    });



  return technicians;


};








const getSingleTechnicianFromDB = async (
  id: string
) => {


  const technician =
    await prisma.technicianProfile.findUniqueOrThrow({


      where: {

        id

      },


      include: {


        user: {

          select: {

            id: true,

            name: true,

            email: true

          }

        },


        services: {

          include: {

            category: true

          }

        },


        reviews: {

          include: {


            customer: {

              select: {

                id: true,

                name: true

              }

            }


          }


        },


        availabilities: true


      }


    });



  return technician;


};









const updateAvailabilityIntoDB = async (

  userId: string,

  payload: AvailabilityPayload[]

) => {



  const technician =
    await prisma.technicianProfile.findUniqueOrThrow({

      where: {
        userId
      }

    });




  if (!Array.isArray(payload)) {


    throw new AppError(

      400,

      "Availability must be array"

    );


  }






  const result =
    await prisma.$transaction(async (tx) => {


      await tx.availability.deleteMany({

        where: {

          technician_id: technician.id

        }

      });





      await tx.availability.createMany({

        data:

          payload.map(item => ({


            technician_id: technician.id,


            day: item.day,


            start_time: item.start_time,


            end_time: item.end_time,


            is_available: item.is_available ?? true


          }))


      });






      return tx.availability.findMany({

        where: {

          technician_id: technician.id

        }

      });


    });



  return result;



};








export const TechnicianService = {


  updateTechnicianProfileIntoDB,


  getTechnicianProfileFromDB,


  getTechnicianBookingsFromDB,


  getAllTechniciansFromDB,


  getSingleTechnicianFromDB,


  updateBookingStatusIntoDB,


  updateAvailabilityIntoDB


};