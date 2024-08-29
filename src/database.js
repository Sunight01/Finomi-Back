import pkg from "pg";
import config from "./config.js";

const { Client } = pkg;

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

  getClient() {
    return this.client;
  }
}

const instance = new Database();
Object.freeze(instance);

export default instance;
