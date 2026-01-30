import { useState, useEffect } from 'react'
import './App.css'
import BirdSightingForm from './components/BirdSightingForm'
import BirdMap from './components/BirdMap'
import ScrapbookGallery from './components/ScrapbookGallery'

function App() {
  const [sightings, setSightings] = useState(() => {
    const stored = localStorage.getItem('birdSightings')
    return stored ? JSON.parse(stored) : []
  })
  const [showForm, setShowForm] = useState(false)

  // Save sightings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('birdSightings', JSON.stringify(sightings))
  }, [sightings])

  const addSighting = (sighting) => {
    const newSighting = {
      ...sighting,
      id: crypto.randomUUID(),
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
