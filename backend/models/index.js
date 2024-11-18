import User from "./User.js"
import Location from "./Location.js"

// Define associations
User.hasMany(Location, { foreignKey: "userId", as: "locations" })
Location.belongsTo(User, { foreignKey: "userId", as: "user" })

export { User, Location }
