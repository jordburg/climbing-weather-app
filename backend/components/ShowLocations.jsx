import React from "react"
import { BasePropertyComponent } from "adminjs"

const ShowLocations = (props) => {
  const { record } = props
  const locations = record.params.locations || []

  return (
    <div>
      <h3>Locations</h3>
      {locations.length > 0 ? (
        <ul>
          {locations.map((location) => (
            <li key={location.id}>
              <strong>{location.name}</strong> ({location.latitude},{" "}
              {location.longitude})
            </li>
          ))}
        </ul>
      ) : (
        <p>No locations for this user.</p>
      )}
    </div>
  )
}

export default ShowLocations
