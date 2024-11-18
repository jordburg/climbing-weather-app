// PreferencesForm.js

import React, { useState, useEffect } from "react"
import axios from "axios"

function PreferencesForm({ token }) {
  const [preferences, setPreferences] = useState({
    temperatureMin: "",
    temperatureMax: "",
    humidityMin: "",
    humidityMax: "",
    // Add more preference fields
  })

  useEffect(() => {
    // Fetch existing preferences if needed
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.preferences) {
          setPreferences(response.data.preferences)
        }
      })
      .catch((error) => console.error(error))
  }, [token])

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/preferences`,
        { preferences },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => alert("Preferences updated"))
      .catch((error) => console.error(error))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set Your Preferences</h2>
      <label>Minimum Temperature:</label>
      <input
        type="number"
        name="temperatureMin"
        value={preferences.temperatureMin}
        onChange={handleChange}
        required
      />
      <br />
      <label>Maximum Temperature:</label>
      <input
        type="number"
        name="temperatureMax"
        value={preferences.temperatureMax}
        onChange={handleChange}
        required
      />
      <br />
      <label>Minimum Humidity:</label>
      <input
        type="number"
        name="humidityMin"
        value={preferences.humidityMin}
        onChange={handleChange}
        required
      />
      <br />
      <label>Maximum Humidity:</label>
      <input
        type="number"
        name="humidityMax"
        value={preferences.humidityMax}
        onChange={handleChange}
        required
      />
      <br />
      {/* Add more preference inputs */}
      <button type="submit">Save Preferences</button>
    </form>
  )
}

export default PreferencesForm
