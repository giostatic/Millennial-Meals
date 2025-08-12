import {key} from '../../components/apiKey';

export function displayRestaurants (data, currentPage = 1, fetchRestaurantsPage) {
    // Clear any existing results
    const businessesContainer = document.getElementById('results');
    businessesContainer.innerHTML = '';
    // Add responsive grid class
    businessesContainer.className = 'restaurants-grid';

    // Calculate page info
    const totalResults = data.results.length;
    const resultsPerPage = 20;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    // Create page counter element
    const pageCounterTop = document.createElement('div');
    pageCounterTop.className = 'restaurants-page-counter';
    pageCounterTop.textContent = `Page ${currentPage} of ${totalPages}`;
    businessesContainer.appendChild(pageCounterTop);

    // display new results (Google Places API: data.results)
    (data.results.slice(0, 20)).forEach(place => {
        const businessDiv = document.createElement('div');
        businessDiv.className = `restaurants-grid-item`;
        
        // Find the first photo_reference in the photos array, if any
        const firstPhoto = place.photos && place.photos.find(photo => photo.photo_reference);

        const imageUrl = firstPhoto
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${firstPhoto.photo_reference}&key=${key}`
          : 'https://via.placeholder.com/220x140?text=No+Image';

        businessDiv.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${imageUrl}" alt="${place.name}" />
            <p>Rating: ${place.rating || 'N/A'}</p>
            <p>Types: ${place.types ? place.types.join(', ') : 'N/A'}</p>
            <p>Address: ${place.vicinity || place.formatted_address || 'N/A'}</p>
            <a href="https://www.google.com/maps/place/?q=place_id:${place.place_id}" target="_blank">Read more</a>`;
        businessesContainer.appendChild(businessDiv);
    });

    // Add page counter below results
    const pageCounterBottom = document.createElement('div');
    pageCounterBottom.className = 'restaurants-page-counter';
    pageCounterBottom.textContent = `Page ${currentPage} of ${totalPages}`;
    businessesContainer.appendChild(pageCounterBottom);

    // Pagination controls
    const paginationControls = document.createElement('div');
    paginationControls.className = 'restaurants-pagination-controls';

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
            .restaurants-grid-item {
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                padding: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: box-shadow 0.2s;
            }
            .restaurants-grid-item img {
                width: 100%;
                max-width: 220px;
                height: 140px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 0.75rem;
            }
            .restaurants-grid-item h3 {
                margin: 0.5rem 0 0.25rem 0;
                font-size: 1.1rem;
                text-align: center;
            }
            .restaurants-grid-item p {
                margin: 0.2rem 0;
                font-size: 0.95rem;
                text-align: center;
            }
            .restaurants-grid-item a {
                margin-top: 0.5rem;
                color: #1976d2;
                text-decoration: none;
                font-weight: 500;
            }
            .restaurants-grid-item a:hover {
                text-decoration: underline;
            }
            .restaurants-page-counter {
                text-align: center;
                margin: 0.5rem 0;
                font-weight: 500;
            }
            .restaurants-pagination-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin: 1rem 0;
            }
        `;
        document.body.appendChild(style);
    }
};