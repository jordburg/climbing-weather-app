import express from "express"
import cors from "cors"
import pool from "./db.js"
import weatherRouter from "./routes/weather.js"

import dotenv from "dotenv"
dotenv.config()

// Initialize the Express application
const app = express()

// Use middleware
app.use(cors())
app.use(express.json()) // Use 'express.json()' instead of importing 'json'

// Use your routes
app.use("/api/weather", weatherRouter)

// Test route
app.get("/", (req, res) => {
  res.send("API is running")
})

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5001

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
