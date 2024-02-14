import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    databaseURL: process.env.DEV_DB_URL,
    bcrypt_salt: process.env.BCRYPT_SALT,
    user_default_password: process.env.USER_DEFAULT_PASSWORD,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_forgot_secret: process.env.JWT_FORGOT_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    cors_access: process.env.CORS_ACCESS,
    super_pass: process.env.SUPER_PASS
};