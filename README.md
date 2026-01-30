# 🐦 The Bird Watch

A beautiful bird tracking app with a scrapbook-style UI that allows you to record and map your bird sightings.

## Features

✨ **Scrapbook UI** - Polaroid-style cards with a handcrafted, scrapbook aesthetic  
🗺️ **Interactive Map** - Track bird sightings on an interactive map with markers  
📍 **Location Tracking** - Record where you spotted each bird with coordinates  
💾 **Local Storage** - Your sightings are saved automatically in your browser  
🌤️ **Weather Notes** - Record weather conditions and observations  
📝 **Detailed Notes** - Add detailed observations for each sighting  

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Add a Bird Sighting**: Click the "+ Add Sighting" button
2. **Fill in Details**: 
   - Bird species (required)
   - Location name (required)
   - Latitude/Longitude (optional - will use your current location if not provided)
   - Weather conditions
   - Notes about your observation
3. **View on Map**: All sightings appear as markers on the interactive map
4. **Browse Scrapbook**: View all your sightings in the beautiful scrapbook gallery
5. **Delete Sightings**: Hover over a card and click the trash icon to remove it

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Leaflet** - Interactive maps
- **React-Leaflet** - React components for Leaflet
- **LocalStorage** - Data persistence
- **Google Fonts** - Caveat and Patrick Hand fonts for scrapbook aesthetic

## License

MIT
