import { useState, useEffect } from 'react'
import './App.css'
import BirdSightingForm from './components/BirdSightingForm'
import BirdMap from './components/BirdMap'
import ScrapbookGallery from './components/ScrapbookGallery'

function App() {
  const [sightings, setSightings] = useState([])
  const [showForm, setShowForm] = useState(false)

  // Load sightings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('birdSightings')
    if (stored) {
      setSightings(JSON.parse(stored))
    }
  }, [])

  // Save sightings to localStorage whenever they change
  useEffect(() => {
    if (sightings.length > 0) {
      localStorage.setItem('birdSightings', JSON.stringify(sightings))
    }
  }, [sightings])

  const addSighting = (sighting) => {
    const newSighting = {
      ...sighting,
      id: Date.now(),
      date: new Date().toISOString()
    }
    setSightings([newSighting, ...sightings])
    setShowForm(false)
  }

  const deleteSighting = (id) => {
    setSightings(sightings.filter(s => s.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🐦 The Bird Watch</h1>
        <p className="app-subtitle">Track your feathered friends</p>
      </header>

      <div className="app-content">
        <div className="sidebar">
          <button 
            className="add-sighting-btn" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Close' : '+ Add Sighting'}
          </button>

          {showForm && (
            <BirdSightingForm onSubmit={addSighting} onCancel={() => setShowForm(false)} />
          )}

          <div className="sightings-count">
            <p>{sightings.length} bird{sightings.length !== 1 ? 's' : ''} spotted!</p>
          </div>
        </div>

        <div className="main-content">
          <section className="map-section">
            <h2 className="section-title">Sighting Map</h2>
            <BirdMap sightings={sightings} />
          </section>

          <section className="gallery-section">
            <h2 className="section-title">Scrapbook</h2>
            <ScrapbookGallery sightings={sightings} onDelete={deleteSighting} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
