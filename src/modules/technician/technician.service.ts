import { prisma } from "../../lib/prisma";
import { UpdateTechnicianProfilePayload } from "./technician.interface";




const updateTechnicianProfileIntoDB = async (
  userId: string,
  payload: UpdateTechnicianProfilePayload
) => {


  const technicianProfile =
    await prisma.technicianProfile.findUnique({
      where:{
        userId
      }
    });



  if(!technicianProfile){
    throw new Error(
      "Technician profile not found"
    );
  }



  const updatedProfile =
    await prisma.technicianProfile.update({

      where:{
        userId
      },


      data:{
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





const getTechnicianProfileFromDB = async(
 userId:string
)=>{


const profile =
 await prisma.technicianProfile.findUniqueOrThrow({

 where:{
  userId
 },


 include:{
  user:{
    select:{
      id:true,
      name:true,
      email:true,
      role:true
    }
  }
 }


 });



return profile;


};



const getTechnicianBookingsFromDB = async(
 userId:string
)=>{


const technician =
await prisma.technicianProfile.findUniqueOrThrow({

where:{
 userId
}

});



const bookings =
await prisma.booking.findMany({

where:{
 technician_id: technician.id
},


include:{


customer:{
 select:{
  id:true,
  name:true,
  email:true
 }
},


service:true


},


orderBy:{
 created_at:"desc"
}


});


return bookings;

};





const updateBookingStatusIntoDB = async(
 userId:string,
 bookingId:string,
 status:any
)=>{


const technician =
await prisma.technicianProfile.findUniqueOrThrow({

where:{
 userId
}

});



const booking =
await prisma.booking.findFirstOrThrow({

where:{
 id:bookingId,
 technician_id:technician.id
}

});



const updatedBooking =
await prisma.booking.update({

where:{
 id:booking.id
},


data:{
 status
}

});


return updatedBooking;


};



export const TechnicianService={

 updateTechnicianProfileIntoDB,

 getTechnicianProfileFromDB,
 getTechnicianBookingsFromDB,

updateBookingStatusIntoDB


};