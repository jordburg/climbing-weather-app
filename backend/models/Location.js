// models/Location.js

import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize.js"

class Location extends Model {}

Location.init(
  {
    // Model attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to true temporarily
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    // Model options
    sequelize, // Pass the Sequelize instance
    modelName: "Location", // Model name
    tableName: "locations",
    timestamps: true,
  }
)

export default Location
