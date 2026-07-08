import { prisma } from "../../lib/prisma";
import { AvailabilityPayload, UpdateTechnicianProfilePayload } from "./technician.interface";




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

const profile =await prisma.technicianProfile.findUniqueOrThrow({

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


const getAllTechniciansFromDB = async () => {
 const technicians =await prisma.technicianProfile.findMany({

    include:{
      user:{
        select:{
          id:true,
          name:true,
          email:true
        }
      },

      services:{
        include:{
          category:true
        }
      },

      reviews:true

    },

    orderBy:{
      createdAt:"desc"
    }

  });
  return technicians;
};

const getSingleTechnicianFromDB = async(
 id:string
)=>{


const technician =
await prisma.technicianProfile.findUniqueOrThrow({

where:{
 id
},
include:{
 user:{
  select:{
   id:true,
   name:true,
   email:true
  }
 },

 services:{
  include:{
   category:true
  }
 },

 reviews:{
  include:{
   customer:{
    select:{
     id:true,
     name:true
    }
   }
  }
 },

 availabilities:true
}

});

return technician;

};


const updateAvailabilityIntoDB = async(
 userId:string,
 payload:AvailabilityPayload[]
)=>{


const technician =
await prisma.technicianProfile.findUniqueOrThrow({

where:{
 userId
}

});



await prisma.availability.deleteMany({

where:{
 technician_id:technician.id
}

});



await prisma.availability.createMany({

data:
payload.map((item)=>({

technician_id:technician.id,

day:item.day,

start_time:item.start_time,

end_time:item.end_time,

is_available:item.is_available ?? true

}))

});



return await prisma.availability.findMany({

where:{
 technician_id:technician.id
}

});


};

export const TechnicianService={

updateTechnicianProfileIntoDB,
getTechnicianProfileFromDB,
getTechnicianBookingsFromDB,
getAllTechniciansFromDB,
getSingleTechnicianFromDB,
updateBookingStatusIntoDB,
updateAvailabilityIntoDB
};