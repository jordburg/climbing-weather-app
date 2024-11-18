// index.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import sequelize from "./sequelize.js"
import { User, Location } from "./models/index.js"
import adminRouter from "./admin.js"
import weatherRouter from "./routes/weather.js"
import usersRouter from "./routes/users.js" // Import the users router
import authRouter from "./routes/auth.js"

app.use("/api/auth", authRouter)

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Synchronize models with the database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("All models were synchronized successfully.")
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err)
  })

// Use your routes
app.use("/api/weather", weatherRouter)
app.use("/api/users", usersRouter) // Use the users router

// Use the AdminJS router
app.use("/admin", adminRouter)

// Test route
app.get("/", (req, res) => {
  res.send("API is running")
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`AdminJS is available at http://localhost:${PORT}/admin`)
})
