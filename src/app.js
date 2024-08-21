import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import config from "./config.js";
import supabase from "./supabase.js";

import authRoutes from "./routes/auth.routes.js";

class App {
  constructor() {
    this.app = express();
    this.settings();
    this.middleware();
    this.routes();
  }

  settings() {
    this.app.set("port", config.PORT);
  }

  middleware() {
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(cors({credentials: true}));
    this.app.use(cookieParser());
    this.app.options("*", cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );

    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  }

  routes() {
    this.app.use("/api/auth", authRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is running on port ${this.app.get("port")}`);
    });
  }
}

export default new App();
