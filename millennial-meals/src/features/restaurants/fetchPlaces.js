// import { key } from "./apiKey";

export async function fetchGooglePlaces(term, location, radius) {
    // location is now an object: { lat, lng }
    const radiusInMeters = Math.floor(radius * 1609.34);

    // Add console log for latitude and longitude
    console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);

    // const apiEndPoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    
    // for production
    // const url = `${apiEndPoint}?location=${location.lat},${location.lng}&radius=${radiusInMeters}&keyword=${encodeURIComponent(term)}&key=${key}`;

    const url = `http://localhost:5000/api/places?location=${location.lat},${location.lng}&radius=${radiusInMeters}&keyword=${encodeURIComponent(term)}`;


    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}
