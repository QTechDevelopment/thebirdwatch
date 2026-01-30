import { useState } from 'react'
import './BirdSightingForm.css'

function BirdSightingForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    species: '',
    location: '',
    latitude: '',
    longitude: '',
    notes: '',
    weather: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.species || !formData.location) {
      alert('Please fill in at least the bird species and location')
      return
    }

    // Use browser geolocation if coordinates not provided
    if (!formData.latitude || !formData.longitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSubmit({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          })
        },
        (error) => {
          // Default to a central location if geolocation fails
          console.warn('Geolocation error:', error)
          onSubmit({
            ...formData,
            latitude: '40.7128',  // Default to New York
            longitude: '-74.0060'
          })
        }
      )
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form className="bird-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="species">Bird Species *</label>
        <input
          type="text"
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          placeholder="e.g., Robin, Blue Jay..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location *</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Central Park, NYC"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="40.7128"
            step="any"
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="-74.0060"
            step="any"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="weather">Weather</label>
        <input
          type="text"
          id="weather"
          name="weather"
          value={formData.weather}
          onChange={handleChange}
          placeholder="e.g., Sunny, Cloudy..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="What did you observe?"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">Add to Scrapbook</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default BirdSightingForm
