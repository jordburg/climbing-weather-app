import express from "express"

// Create a new router instance
const router = express.Router()

// Import the default export (pool) from '../db.js'
import pool from "../db.js"

// Get all weather data
router.get("/", async (req, res) => {
  try {
    // Use 'pool.query' to execute the SQL query
    const result = await pool.query("SELECT * FROM products")
    res.json(result.rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Export the router as the default export
export default router
