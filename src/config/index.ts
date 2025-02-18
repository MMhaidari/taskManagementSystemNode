import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    dabase_url: process.env.DB_URL ? process.env.DB_URL.replace('<db_password>', process.env.DB_PASSWORD as string) : '',
    jwt_secret: process.env.JWT_SECRET,
    jwt_expiration: process.env.JWT_EXPIRES_IN,
}