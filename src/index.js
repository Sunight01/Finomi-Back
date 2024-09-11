import App from './app.js'
import Database from './database.js'

// Se ejecuta la función main cuando se importa el archivo.
const main = () => {
  // Se incia tanto la app como la base de datos.
  App.start()
  Database.getClient()
}

main()
