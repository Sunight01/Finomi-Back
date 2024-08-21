import jwt from "jsonwebtoken";
import config from "../config.js";

export const signToken = (user) => {
  const token = jwt.sign(user, config.SECRET_KEY, { expiresIn: "1h" });
  return token;
};
