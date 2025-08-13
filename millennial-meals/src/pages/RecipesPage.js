import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/stylesheet.css";
import RecipesForm from "../features/recipes/recipesForm";
import { Link } from "react-router-dom";

import {
  Button,
  Container
} from 'reactstrap';

import { useState } from 'react';

import chickenHeader from '../app/assets/img/Chicken-header.png';
import beefHeader from '../app/assets/img/Beef-header.png';
import porkHeader from '../app/assets/img/Pork-header.png';
import plantBasedHeader from '../app/assets/img/plant-based-header.png';
import breakfastHeader from '../app/assets/img/breakfast-header.jpg';
import lunchHeader from '../app/assets/img/lunch-header.jpg';
import dinnerHeader from '../app/assets/img/dinner-header.jpg';
import dessertHeader from '../app/assets/img/dessert-header.jpg';
import seafoodHeader from '../app/assets/img/seafood-header.jpg';
import pastriesHeader from '../app/assets/img/pastries-header.jpg';
import starchesHeader from '../app/assets/img/starches-header.jpg';
import drinksHeader from '../app/assets/img/drinks-header.jpg';

const RecipesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Dummy goSomewhere function for the button
  const goSomewhere = () => {
    // Implement random recipe navigation logic here
    alert("Random recipe feature not implemented.");
  };

  return (
    <main style={{ paddingBottom: "60px" }}>
      <section id="buttons">
        <h1>Recipe Explorer</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          <Button color="primary" onClick={goSomewhere}>
            Click here to get a random recipe
          </Button>
          <Button color="primary" href="/recipesForm" onClick={RecipesForm}>
            Click here to submit your own recipe
          </Button>
        </div>
      </section>
      <section id="meal-categories">
        
        <div className="recipe-card slider-image">
          <Link to="/recipes/breakfast">
            <img
              src={breakfastHeader}
              alt="Breakfast dishes"
              title="Breakfast dishes"
            />
            <div className="slider-overlay">Breakfast</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/lunch">
            <img
              src={lunchHeader}
              alt="Lunch dishes"
              title="Lunch dishes"
            />
            <div className="slider-overlay">Lunch</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/dinner">
            <img
              src={dinnerHeader}
              alt="Dinner dishes"
              title="Dinner dishes"
            />
            <div className="slider-overlay">Dinner</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/dessert">
            <img
              src={dessertHeader}
              alt="Dessert dishes"
              title="Dessert dishes"
            />
            <div className="slider-overlay">Dessert</div>
          </Link>
        </div>
      </section>
      <section id="protein-base">
        <div className="recipe-card slider-image">
          <Link to="/recipes/poultry">
            <img
              src={chickenHeader}
              alt="Poultry dishes"
              title="Poultry dishes"
            />
            <div className="slider-overlay">Poultry</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/beef">
            <img
              src={beefHeader}
              alt="Beef Dishes"
              title="Beef Dishes"
            />
            <div className="slider-overlay">Beef</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/pork">
            <img
              src={porkHeader}
              alt="Pork Dishes"
              title="Pork Dishes"
            />
            <div className="slider-overlay">Pork</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/seafood">
            <img
              src={seafoodHeader}
              alt="Seafood dishes"
              title="Seafood dishes"
            />
            <div className="slider-overlay">Seafood</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/plant-based">
            <img
              src={plantBasedHeader}
              alt="Plant-Based Dishes"
              title="Plant-Based Dishes"
            />
            <div className="slider-overlay">Plant-Based</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/pastries">
            <img
              src={pastriesHeader}
              alt="Pastries"
              title="Pastries"
            />
            <div className="slider-overlay">Pastries</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/starches">
            <img
              src={starchesHeader}
              alt="Starches"
              title="Starches"
            />
            <div className="slider-overlay">Starches</div>
          </Link>
        </div>
        <div className="recipe-card slider-image">
          <Link to="/recipes/drinks">
            <img
              src={drinksHeader}
              alt="Drinks"
              title="Drinks"
            />
            <div className="slider-overlay">Drinks</div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RecipesPage;
