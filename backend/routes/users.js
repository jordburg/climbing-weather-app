// routes/users.js
import express from "express"
import { User, Location } from "../models/index.js"

const router = express.Router()

router.put("/preferences", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    const { preferences } = req.body

    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ error: "User not found" })

    user.preferences = preferences
    await user.save()

    res.json({ message: "Preferences updated successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).send("Server Error")
  }
})

// Get all users with their locations
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Location,
          as: "locations",
        },
      ],
    })
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send("Server Error")
  }
})

export default router
