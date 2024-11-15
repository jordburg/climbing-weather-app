import pg from "pg" // Import the default export from 'pg'
const { Pool } = pg // Destructure 'Pool' from the imported module

// Create a new pool instance with your configuration
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
})

export default pool
