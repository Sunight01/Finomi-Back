import jwt from "jsonwebtoken";
import config from "../config.js";

// Función para crear un token JWT.
export const signToken = (user) => {
  const token = jwt.sign(user, config.SECRET_KEY, { expiresIn: "1h" });
  return token;
};
