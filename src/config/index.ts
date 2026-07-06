import dotenv from "dotenv";
import path from "path/win32";
dotenv.config({path: path.join(process.cwd(), ".env")});

export default {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    bcrypt_Salt_Rounds: process.env.BCRYPT_SALT_ROUNDS ,
    jwt_access_Secret: process.env.JWT_SECRET,
    jwt_refresh_Secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_ExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_ExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,


};