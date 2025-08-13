export async function displayRestaurants(data, setLoading) {
    const mainContainer = document.getElementById('results');
    mainContainer.innerHTML = '';

    const pageResults = data.results.slice(0, 20);

    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'restaurants-grid';

    // Helper to load image and resolve when loaded or errored
    function loadImage(src) {
        return new Promise((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve('https://via.placeholder.com/220x140?text=No+Image');
            img.src = src;
        });
    }

    for (const place of pageResults) {
        const businessDiv = document.createElement('div');
        businessDiv.className = `restaurants-grid-item`;

        const firstPhoto = place.photos && place.photos.find(photo => photo.photo_reference);

        let imageUrl = firstPhoto
            ? `/api/photo?maxwidth=400&photoreference=${firstPhoto.photo_reference}`
            : 'https://via.placeholder.com/220x140?text=No+Image';

        // Wait for image to load or fallback
        imageUrl = await loadImage(imageUrl);

        businessDiv.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${imageUrl}" alt="${place.name}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/220x140?text=No+Image';" />
            <p>Rating: ${place.rating || 'N/A'}</p>
            <p>Types: ${place.types ? place.types.join(', ') : 'N/A'}</p>
            <p>Address: ${place.vicinity || place.formatted_address || 'N/A'}</p>
            <a href="https://www.google.com/maps/place/?q=place_id:${place.place_id}" target="_blank">Read more</a>`;
        gridWrapper.appendChild(businessDiv);
    }

    mainContainer.appendChild(gridWrapper);

    // Set loading to false only after all restaurants are rendered
    if (setLoading) {
        setLoading(false);
    }

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
        `;
        document.body.appendChild(style);
    }
}