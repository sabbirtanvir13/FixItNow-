// import app from "./app";
// import { prisma } from "./lib/prisma";
// import config from "./config";
// const PORT = config.PORT ;
// async function main() {
//     try {
   
//       await prisma.$connect();
//        console.log("Connected to the database successfully.");
//       app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//       });
    
//     } catch (error) {
        
//       console.error("Error connecting to the database:", error);
//       await prisma.$disconnect();
//         process.exit(1);
 
  
//     }
// }

// main();



import app from "./app";
import { prisma } from "./lib/prisma";


// Vercel serverless export
export default app;


// Local development এর জন্য
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  async function main() {
    try {

      await prisma.$connect();

      console.log("Database connected successfully");

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });

    } catch (error) {

      console.error("Database connection failed", error);

      await prisma.$disconnect();

      process.exit(1);
    }
  }

  main();
}