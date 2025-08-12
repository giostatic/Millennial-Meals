
export function displayRestaurants (data, currentPage = 1, fetchRestaurantsPage) {
    // Get the main results container
    const mainContainer = document.getElementById('results');
    mainContainer.innerHTML = '';

    // Calculate page info
    const totalResults = data.results.length;
    const resultsPerPage = 20;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    // Create page counter element (top)
    const pageCounterTop = document.createElement('div');
    pageCounterTop.className = 'restaurants-page-counter';
    pageCounterTop.textContent = `Page ${currentPage} of ${totalPages}`;
    mainContainer.appendChild(pageCounterTop);

    // Create grid wrapper
    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'restaurants-grid';

    // Display new results (Google Places API: data.results)
    const startIdx = (currentPage - 1) * resultsPerPage;
    const endIdx = startIdx + resultsPerPage;
    const pageResults = data.results.slice(startIdx, endIdx);

    pageResults.forEach(place => {
        const businessDiv = document.createElement('div');
        businessDiv.className = `restaurants-grid-item`;
        
        // Find the first photo_reference in the photos array, if any
        const firstPhoto = place.photos && place.photos.find(photo => photo.photo_reference);

        const imageUrl = firstPhoto
          ? `/api/photo?maxwidth=400&photoreference=${firstPhoto.photo_reference}`
          : 'https://via.placeholder.com/220x140?text=No+Image';

        businessDiv.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${imageUrl}" alt="${place.name}" />
            <p>Rating: ${place.rating || 'N/A'}</p>
            <p>Types: ${place.types ? place.types.join(', ') : 'N/A'}</p>
            <p>Address: ${place.vicinity || place.formatted_address || 'N/A'}</p>
            <a href="https://www.google.com/maps/place/?q=place_id:${place.place_id}" target="_blank">Read more</a>`;
        gridWrapper.appendChild(businessDiv);
    });

    // Add grid to main container
    mainContainer.appendChild(gridWrapper);

    // Add page counter below results
    const pageCounterBottom = document.createElement('div');
    pageCounterBottom.className = 'restaurants-page-counter';
    pageCounterBottom.textContent = `Page ${currentPage} of ${totalPages}`;
    mainContainer.appendChild(pageCounterBottom);

    // Pagination controls
    const paginationControls = document.createElement('div');
    paginationControls.className = 'restaurants-pagination-controls';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    // Only enable "Previous" if not on the first page
    prevBtn.disabled = currentPage === 1;

    prevBtn.onclick = () => {
        if (currentPage > 1) {
            displayRestaurants(data, currentPage - 1, fetchRestaurantsPage);
        }
    };
    paginationControls.appendChild(prevBtn);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    // Only enable "Next" if there are more local results or a next_page_token
    const moreLocal = endIdx < data.results.length;
    const moreRemote = !!data.next_page_token;
    nextBtn.disabled = !(moreLocal || moreRemote);

    nextBtn.onclick = () => {
        if (moreLocal) {
            // Just show the next local page
            displayRestaurants(data, currentPage + 1, fetchRestaurantsPage);
        } else if (moreRemote) {
            // Fetch from API
            fetchRestaurantsPage(data.next_page_token, 1); // 1 for new remote page
        }
    };
    paginationControls.appendChild(nextBtn);

    mainContainer.appendChild(paginationControls);

    // Inject responsive grid and card styles if not already present
    if (!document.getElementById('restaurants-grid-style')) {
        const style = document.createElement('style');
        style.id = 'restaurants-grid-style';
        style.textContent = `
            #results {
                padding-bottom: 4rem;
            }
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
                margin: 1rem 0 3rem 0; /* Add extra bottom margin to prevent being cut off by footer */
            }
        `;
        document.body.appendChild(style);
    }
};