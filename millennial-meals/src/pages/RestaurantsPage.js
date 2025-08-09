import SubHeader from '../components/SubHeader'
import { useState } from 'react';

// If you use react-bootstrap, uncomment the next line:
// import { Container } from "react-bootstrap";

const Restaurants = () => {
    const [categories, setCategories] = useState("");
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState("");
    const [results, setResults] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement search logic here, possibly fetch from API
        setResults("Search feature not implemented.");
    };

    return (
        // Replace Container with div if not using react-bootstrap
        <div className="container">
            <SubHeader current='Restaurants' />
            <main>
                <h1>Food Finder</h1>
                <p>Having a hard time deciding where to eat?</p>
                <p>Use this tool to see restaurants near you!</p>
                <form id="searchForm" onSubmit={handleSubmit}>
                    <label htmlFor="categories">
                        Type what you what feel like eating or going to below <br />
                        (for example: bars, burgers, pasta, pizza, or even boba!)
                    </label>
                    <br />
                    <input
                        id="categories"
                        type="text"
                        placeholder="What are ya feelin?"
                        required
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                    />
                    <br />
                    <br />
                    <label htmlFor="location">
                        Provide your location to narrow down the search to places near you.
                    </label>
                    <br />
                    <input
                        id="location"
                        autoComplete="on"
                        type="text"
                        placeholder="address, city, or zip"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <br />
                    <br />
                    <label htmlFor="radius">
                        Provide how far you're wiling to go in miles (the max of the tool is 24 miles)
                    </label>
                    <br />
                    <input
                        id="radius"
                        autoComplete="on"
                        type="text"
                        placeholder="1 mile, 5 miles, or more?!"
                        required
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                    />
                    <br />
                    <button id="submit" type="submit">
                        Search
                    </button>
                </form>
                <div id="results">{results && <div>{results}</div>}</div>
            </main>
        </div>
    )
}

export default Restaurants;