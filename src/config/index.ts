import dotenv from "dotenv";
import path from "path/win32";
dotenv.config({path: path.join(process.cwd(), ".env")});

export default {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    bcrypt_Salt_Rounds: process.env.BCRYPT_SALT_ROUNDS ,
 jwt_access_secret: process.env.jwt_access_secret !,
  jwt_refresh_secret: process.env.jwt_refresh_secret !,

  jwt_access_expires_in: process.env.jwt_access_expires_in !,
  jwt_refresh_expires_in: process.env.jwt_refresh_expires_in !


};