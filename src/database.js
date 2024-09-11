import pkg from "pg";
import config from "./config.js";

const { Client } = pkg;

// Clase que maneja la conexión a la base de datos PostgreSQL y proporciona una instancia única por el Singleton.
class Database {
  constructor() {
    if (!Database.instance) {
      this.client = new Client({
        user: config.database.user,
        host: config.database.host,
        database: config.database.database,
        password: config.database.password,
        port: config.database.port,
      });

      // Se conecta a la base de datos PostgreSQL.
      try {
        this.client.connect();
        console.log("Conectado a PostgreSQL");
      } catch (err) {
        console.error("Error de conexión", err.stack);
      }

      Database.instance = this;
    }

    return Database.instance;
  }

  // Método para obtener una instancia de la clase.
  getClient() {
    return this.client;
  }
}

// Instancia única de la clase.
const instance = new Database();
Object.freeze(instance);

export default instance;
