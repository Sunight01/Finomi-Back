import { signToken } from "../functions/jwt.js";
import supabase from "../supabase.js";
import response from "../functions/network.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const token = signToken({
      id: data.user.id,
      user: data.user.user_metadata.display_name,
      email: data.user.email
    });

    response.successCookie(req, res, 200, "User registered succesfully", {
      id: data.user.id,
      username: data.user.user_metadata.display_name,
      email: data.user.email,
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = signToken({
      id: data.user.id,
      user: data.user.user_metadata.display_name,
      email: data.user.email
    });

    response.success(req, res, 200, "User logged in succesfully", {
      id: data.user.id,
      username: data.user.user_metadata.display_name,
      email: data.user.email,
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const verfySession = async (req, res) => {
  response.success(req, res, 200, "Session verified");
}

export default {
  register,
  login,
  verfySession
};
