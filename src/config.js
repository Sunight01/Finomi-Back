import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
}