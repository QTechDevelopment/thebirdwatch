import './ScrapbookGallery.css'

function ScrapbookGallery({ sightings, onDelete }) {
  if (sightings.length === 0) {
    return (
      <div className="empty-gallery">
        <p>📔 Your scrapbook is empty. Start adding bird sightings!</p>
      </div>
    )
  }

  return (
    <div className="scrapbook-gallery">
      {sightings.map((sighting, index) => (
        <div 
          key={sighting.id} 
          className="polaroid-card"
          style={{
            transform: `rotate(${(index % 3 - 1) * 2}deg)`,
          }}
        >
          <div className="polaroid-photo">
            <div className="bird-icon">🐦</div>
            <div className="photo-details">
              <h3 className="bird-name">{sighting.species}</h3>
            </div>
          </div>
          
          <div className="polaroid-caption">
            <p className="location">📍 {sighting.location}</p>
            
            {sighting.weather && (
              <p className="weather">🌤️ {sighting.weather}</p>
            )}
            
            {sighting.notes && (
              <p className="notes">{sighting.notes}</p>
            )}
            
            <p className="date">
              {new Date(sighting.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            
            <button 
              className="delete-btn"
              onClick={() => {
                if (window.confirm('Delete this sighting?')) {
                  onDelete(sighting.id)
                }
              }}
              title="Delete sighting"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScrapbookGallery
