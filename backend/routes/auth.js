// routes/auth.js

import express from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/index.js"

const router = express.Router()
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret"

// User registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser)
      return res.status(400).json({ error: "User already exists" })

    // Create new user
    const user = await User.create({ name, email, password })

    // Generate JWT
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" })

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error(err)
    res.status(500).send("Server Error")
  }
})

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).json({ error: "Invalid credentials" })

    // Check password
    const isMatch = await user.validPassword(password)
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" })

    // Generate JWT
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" })

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error(err)
    res.status(500).send("Server Error")
  }
})

export default router
