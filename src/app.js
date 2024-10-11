import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import config from "./config.js";
import supabase from "./supabase.js";

import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import suggestRoutes from "./routes/suggest.routes.js";

//Se utiliza Singleton para crear una sola instancia de express.
class App {
  constructor() {
    this.app = express();
    this.settings();
    this.middleware();
    this.routes();
  }

  //Configuracion de la app: Establecimiento de puerto
  settings() {
    this.app.set("port", config.PORT);
  }

  //Middlewares de la app.
  middleware() {
    this.app.use(morgan("dev")); // Muestra logs de las solicitudes HTTP que se realicen.
    this.app.use(helmet()); // Añade seguridad a los header de las solicitudes HTTP.
    this.app.use(cors({credentials: true})); // Permite las solicitudes de CORS.
    this.app.use(cookieParser()); // Almacena las cookies de las solicitudes HTTP.
    this.app.options("*", cors()); // Permite las solicitudes de CORS para los métodos OPTIONS.
    this.app.use(express.json()); // Almacena los datos de las solicitudes HTTP en formato JSON.
    this.app.use(bodyParser.json()); // Otra opcion para almacecnar los datos de las solicitudes HTTP en formato JSON.
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    ); //Permite procesar datos enviados desde formularios HTML.

    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    }); // Si ocurre algún error, se envia un mensaje de error al usuario.
  }

  // Rutas de la app.
  routes() {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/transactions", transactionRoutes);
    this.app.use("/api/chat", chatRoutes);
    this.app.use("/api/suggest", suggestRoutes);
  }

  //Inicia la app.
  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is running on port ${this.app.get("port")}`);
    });
  }
}

export default new App();
