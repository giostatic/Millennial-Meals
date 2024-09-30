export const displayRestaurants(data) {
    // Clear any existing results
    const businessesContainer = document.getElementById('results');
    businessesContainer.innerHTML = '';
    
    //display new results
    data.businesses.forEach(business => {
        const businessDiv = document.createElement('div');
        businessDiv.className = `grid-item`;
        // Construct HTML content for each result
        businessDiv.innerHTML = `
            <h3>${business.name}</h3>
            <img src="${business.image_url}" alt="${business.name}" />
            <p>Rating: ${business.rating}</p>
            <p>Categories: ${business.categories.map(category => category.title).join(', ')}</p>
            <p>Address: ${business.location.display_address.join(', ')}</p>
            <a href="${business.url}" target="_blank">Read more</a>`;
        businessesContainer.appendChild(businessDiv);
    });
}