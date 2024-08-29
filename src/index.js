import App from './app.js'
import Database from './database.js'

const main = () => {
  App.start()
  Database.getClient()
}

main()
