import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
}