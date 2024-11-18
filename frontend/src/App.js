// App.js
import "./App.css"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Login from "./components/Login"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (token) localStorage.setItem("token", token)
    else localStorage.removeItem("token")
  }, [token])

  if (!token) {
    return <Login setToken={setToken} />
  }

  useEffect(() => {
    // Fetch users with their locations from the backend
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <h1>Users and Their Locations</h1>
      <ul>
        {users.map((users) => (
          <li key={users.id}>
            <strong>
              {users.name} ({users.email})
            </strong>
            {users.locations && users.locations.length > 0 ? (
              <ul>
                {users.locations.map((locations) => (
                  <li key={locations.id}>
                    {locations.name} - Latitude: {locations.latitude},
                    Longitude: {locations.longitude}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No locations for this user.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
