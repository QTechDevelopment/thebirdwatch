import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './BirdMap.css'
import L from 'leaflet'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function BirdMap({ sightings }) {
  // Default center of the map
  const defaultCenter = [40.7128, -74.0060] // New York
  const defaultZoom = 10

  // Calculate center based on sightings
  const getCenter = () => {
    if (sightings.length === 0) return defaultCenter
    
    const lat = sightings.reduce((sum, s) => sum + parseFloat(s.latitude), 0) / sightings.length
    const lng = sightings.reduce((sum, s) => sum + parseFloat(s.longitude), 0) / sightings.length
    
    return [lat, lng]
  }

  return (
    <div className="map-container">
      <MapContainer 
        center={getCenter()} 
        zoom={defaultZoom} 
        className="leaflet-map"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {sightings.map((sighting) => (
          <Marker 
            key={sighting.id} 
            position={[parseFloat(sighting.latitude), parseFloat(sighting.longitude)]}
          >
            <Popup>
              <div className="popup-content">
                <h3>{sighting.species}</h3>
                <p><strong>Location:</strong> {sighting.location}</p>
                {sighting.weather && <p><strong>Weather:</strong> {sighting.weather}</p>}
                {sighting.notes && <p><strong>Notes:</strong> {sighting.notes}</p>}
                <p className="popup-date">
                  {new Date(sighting.date).toLocaleDateString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {sightings.length === 0 && (
        <div className="map-overlay">
          <p>Add your first bird sighting to see it on the map!</p>
        </div>
      )}
    </div>
  )
}

export default BirdMap
