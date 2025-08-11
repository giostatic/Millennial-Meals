import { API_KEY } from "./googlePlacesApiKey";

export function displayRestaurants (data) {
    // Clear any existing results
    const businessesContainer = document.getElementById('results');
    businessesContainer.innerHTML = '';
    
    // display new results (Google Places API: data.results)
    data.results.forEach(place => {
        const businessDiv = document.createElement('div');
        businessDiv.className = `grid-item`;
        businessDiv.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${place.photos && place.photos.length > 0 ? 
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}` : 
                ''}" alt="${place.name}" />
            <p>Rating: ${place.rating || 'N/A'}</p>
            <p>Types: ${place.types ? place.types.join(', ') : 'N/A'}</p>
            <p>Address: ${place.vicinity || place.formatted_address || 'N/A'}</p>
            <a href="https://www.google.com/maps/place/?q=place_id:${place.place_id}" target="_blank">Read more</a>`;
        businessesContainer.appendChild(businessDiv);
    });
};