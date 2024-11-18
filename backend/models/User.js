// models/User.js

import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize.js"
import bcrypt from "bcrypt"

class User extends Model {
  // Method to check password validity
  async validPassword(password) {
    return await bcrypt.compare(password, this.password)
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // UNIQUE constraint
      validate: {
        isEmail: true, // Validates email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    // Preferences will be added later
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
)

// Hash password before saving
User.beforeCreate(async (user, options) => {
  const saltRounds = 10
  user.password = await bcrypt.hash(user.password, saltRounds)
})

export default User
