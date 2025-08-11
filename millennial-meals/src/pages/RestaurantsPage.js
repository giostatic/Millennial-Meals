import SubHeader from '../components/SubHeader'
import { useState } from 'react';
import RestaurantForm from '../features/restaurants/RestaurantsForm';

// If you use react-bootstrap, uncomment the next line:
// import { Container } from "react-bootstrap";

const Restaurants = () => {
    const [results, setResults] = useState(""); 

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
                <RestaurantForm />
                <div id="results">{results && <div>{results}</div>}</div>
            </main>
        </div>
    )
}

export default Restaurants;