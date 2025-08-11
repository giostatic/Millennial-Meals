import { API_KEY } from './googlePlacesApiKey';

export async function fetchGooglePlaces(term, location, radius) {
    const radiusInMeters = Math.floor(radius * 1609.34);
    // Geocode the location to get lat/lng
    let lat, lng;
    try {
        const geoRes = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}`
        );
        const geoData = await geoRes.json();
        if (
            geoData.status === "OK" &&
            geoData.results &&
            geoData.results[0] &&
            geoData.results[0].geometry
        ) {
            lat = geoData.results[0].geometry.location.lat;
            lng = geoData.results[0].geometry.location.lng;
        } else {
            alert("Could not geocode location.");
            return;
        }
    } catch (err) {
        alert("Error geocoding location.");
        return;
    }

    // Google Places Nearby Search API
    const apiEndPoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const url = `${apiEndPoint}?location=${lat},${lng}&radius=${radiusInMeters}&keyword=${encodeURIComponent(term)}&key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}
