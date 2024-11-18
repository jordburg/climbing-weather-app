import jwt from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret"

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1] // Expecting 'Bearer <token>'

  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" })

  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded // Add user info to request
    next()
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" })
  }
}

export default authenticateToken
