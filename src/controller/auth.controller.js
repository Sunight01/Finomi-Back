import { signToken } from "../functions/jwt.js";
import { hashPassword, verifyPassword } from "../functions/bpt.js";
import supabase from "../supabase.js";
import response from "../functions/network.js";
import Model from "../model/auth.model.js";

// Función para registrar un usuario en Supabase.
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const encryptedPassword = hashPassword(password);
    const data = await Model.insertUser(username, email, encryptedPassword);
    console.log(data)

    const token = signToken({
      id: data.user_id,
      user: data.username,
      email: data.email
    });
    console.log(token)

    response.success(req, res, 200, "User registered succesfully", {
      id: data.id,
      username: data.username,
      email: data.email,
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: "user already exists" });
  }
};

// Función para iniciar sesión en Supabase.
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await Model.getUser(email);
    console.log(data)
    const compare = verifyPassword(password, data.password);
    console.log(compare)
    if (compare) {
      const token = signToken({
        id: data.user_id,
        user: data.username,
        email: data.email
      });

      response.success(req, res, 200, "User logged in succesfully", {
        id: data.user_id,
        username: data.username,
        email: data.email,
        token: token
      });
    } else {
      response.error(req, res, 400, "Error logging in user", "Invalid login credentials");
    }
  } catch (error) {
    return response.error(req, res, 400, "Error logging in user", "Invalid login credentials");
  }
}

// Funcion para cerrar la sesión de un usuario.
const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error === null) {
      response.success(req, res, 200, "User logged out succesfully", error);
    } else {
      response.error(req, res, 400, "User not logged in");
    }


  } catch (error) {
    console.log(error)
    response.error(req, res, 500, "Error logging out", error);
  }
}

const verfySession = async (req, res) => {
  response.success(req, res, 200, "Session verified");
}

export default {
  register,
  login,
  verfySession,
  logout
};
