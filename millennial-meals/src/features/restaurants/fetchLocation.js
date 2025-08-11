import { key } from "./apiKey";

async function fetchLatLng({ address, city, zip }) {
    let query = '';
    if (address) {
        query = address;
    } else if (city) {
        query = city;
    } else if (zip) {
        query = zip;
    } else {
        throw new Error('At least one of address, city, or zip must be provided.');
    }

    // For development, use the full backend URL if your frontend and backend run on different ports
    const url = `http://localhost:5000/api/geocode?address=${encodeURIComponent(query)}`;

    // For production or if using a proxy in package.json, use the relative path:
    // const url = `/api/geocode?address=${encodeURIComponent(query)}`;

    console.log('Geocoding URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch geolocation data');
    }

    const data = await response.json();
    if (data.status !== 'OK' || !data.results.length) {
        throw new Error('No results found for the provided location');
    }

    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
}

export default fetchLatLng;