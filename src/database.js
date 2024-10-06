import pkg from "pg";
import config from "./config.js";

const { Client } = pkg;

class Database {
  constructor() {
    if (!Database.instance) {
      this.connectToDatabase();  // Llamamos a la función para conectar a la base de datos
      Database.instance = this;
    }

    return Database.instance;
  }

  // Función para intentar conectarse a la base de datos
  async connectToDatabase() {
    this.client = new Client({
      user: config.database.user,
      host: config.database.host,
      database: config.database.database,
      password: config.database.password,
      port: config.database.port,
    });

    // Manejador de errores para reconexión
    this.client.on('error', async (err) => {
      console.error('Error en la conexión a PostgreSQL:', err.stack);
      console.log('Intentando reconectar en 5 segundos...');
      setTimeout(() => {
        this.reconnect();  // Intentamos reconectar
      }, 5000);  // Espera 5 segundos antes de intentar reconectar
    });

    try {
      await this.client.connect();
      console.log("Conectado a PostgreSQL");
    } catch (err) {
      console.error("Error de conexión inicial:", err.stack);
      console.log("Intentando reconectar en 5 segundos...");
      setTimeout(() => {
        this.reconnect();  // Intentamos reconectar si falla la conexión inicial
      }, 5000);
    }
  }

  // Método para reconectar
  async reconnect() {
    try {
      await this.client.end();  // Cerramos la conexión actual si existe
    } catch (err) {
      console.error("Error al cerrar la conexión existente:", err.stack);
    }

    this.connectToDatabase();  // Volvemos a intentar la conexión
  }

  // Método para obtener una instancia del cliente
  getClient() {
    return this.client;
  }
}

// Instancia única de la clase.
const instance = new Database();
Object.freeze(instance);

export default instance;
