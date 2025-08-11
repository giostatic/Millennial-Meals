import {key} from '../../components/apiKey';

export function displayRestaurants (data, currentPage = 1, fetchRestaurantsPage) {
    // Clear any existing results
    const businessesContainer = document.getElementById('results');
    businessesContainer.innerHTML = '';
    // Add responsive grid class
    businessesContainer.className = 'restaurants-grid';

    // Inject responsive grid and card styles if not already present
    if (!document.getElementById('restaurants-grid-style')) {
        const style = document.createElement('style');
        style.id = 'restaurants-grid-style';
        style.textContent = `
            .restaurants-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1.5rem;
                margin: 1rem 0;
            }
            @media (max-width: 800px) {
                .restaurants-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            .grid-item {
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                padding: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: box-shadow 0.2s;
            }
            .grid-item img {
                width: 100%;
                max-width: 220px;
                height: 140px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 0.75rem;
            }
            .grid-item h3 {
                margin: 0.5rem 0 0.25rem 0;
                font-size: 1.1rem;
                text-align: center;
            }
            .grid-item p {
                margin: 0.2rem 0;
                font-size: 0.95rem;
                text-align: center;
            }
            .grid-item a {
                margin-top: 0.5rem;
                color: #1976d2;
                text-decoration: none;
                font-weight: 500;
            }
            .grid-item a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }

    // Calculate page info
    const totalResults = data.results.length;
    const resultsPerPage = 20;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    // Create page counter element
    const pageCounterTop = document.createElement('div');
    pageCounterTop.className = 'page-counter';
    pageCounterTop.textContent = `Page ${currentPage} of ${totalPages}`;
    businessesContainer.appendChild(pageCounterTop);

    // display new results (Google Places API: data.results)
    (data.results.slice(0, 20)).forEach(place => {
        const businessDiv = document.createElement('div');
        businessDiv.className = `grid-item`;
        businessDiv.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${place.photos && place.photos.length > 0 ? 
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${key}` : 
                ''}" alt="${place.name}" />
            <p>Rating: ${place.rating || 'N/A'}</p>
            <p>Types: ${place.types ? place.types.join(', ') : 'N/A'}</p>
            <p>Address: ${place.vicinity || place.formatted_address || 'N/A'}</p>
            <a href="https://www.google.com/maps/place/?q=place_id:${place.place_id}" target="_blank">Read more</a>`;
        businessesContainer.appendChild(businessDiv);
    });

    // Add page counter below results
    const pageCounterBottom = document.createElement('div');
    pageCounterBottom.className = 'page-counter';
    pageCounterBottom.textContent = `Page ${currentPage} of ${totalPages}`;
    businessesContainer.appendChild(pageCounterBottom);

    // Pagination controls
    const paginationControls = document.createElement('div');
    paginationControls.className = 'pagination-controls';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1 && typeof fetchRestaurantsPage === 'function') {
            fetchRestaurantsPage('prev', currentPage - 1);
        }
    };
    paginationControls.appendChild(prevBtn);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    // Only enable if next_page_token exists
    nextBtn.disabled = !data.next_page_token;
    nextBtn.onclick = () => {
        if (data.next_page_token && typeof fetchRestaurantsPage === 'function') {
            fetchRestaurantsPage(data.next_page_token, currentPage + 1);
        }
    };
    paginationControls.appendChild(nextBtn);

    businessesContainer.appendChild(paginationControls);
};