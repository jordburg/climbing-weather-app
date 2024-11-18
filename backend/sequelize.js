import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST || "localhost",
    dialect: "postgres",
    port: process.env.PGPORT || 5432,
    logging: false, // Optional: Disable logging
  }
)

export default sequelize
