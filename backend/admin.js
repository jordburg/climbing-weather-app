// admin.js

import AdminJS, { ComponentLoader } from "adminjs"
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import path from "path"
import { fileURLToPath } from "url"

import dotenv from "dotenv"

import sequelize from "./sequelize.js"
import { User, Location } from "./models/index.js"

dotenv.config()

AdminJS.registerAdapter(AdminJSSequelize)

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create a component loader
const componentLoader = new ComponentLoader()

// Register your custom component
const ShowLocationsComponent = componentLoader.add(
  "ShowLocations",
  path.join(__dirname, "components/ShowLocations")
)

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        properties: {
          locations: {
            isVisible: { list: false, filter: false, show: true, edit: false },
            components: {
              show: ShowLocationsComponent,
            },
          },
        },
        actions: {
          show: {
            after: async (response, request, context) => {
              const { record } = context
              if (record) {
                const locations =
                  await record.resource.sequelizeInstance.getLocations()
                record.params.locations = locations.map((loc) => loc.toJSON())
              }
              return response
            },
          },
        },
      },
    },
    {
      resource: Location,
      options: {
        properties: {
          userId: {
            reference: "users",
          },
        },
      },
    },
  ],
  branding: {
    companyName: "Your Company",
    softwareBrothers: false,
  },
  componentLoader,
})

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return { email }
    }
    return null
  },
  cookieName: "adminjs",
  cookiePassword: process.env.COOKIE_SECRET || "some-secret-password",
})

export default router
