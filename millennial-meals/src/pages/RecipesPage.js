import "bootstrap/dist/css/bootstrap.min.css";
import "../features/recipes/recipes/stylesheet.css";
import RecipesForm from "../features/recipes/recipesForm";

import {
  Button,
  Container
} from 'reactstrap';

import { useState } from 'react';

import chickenHeader from '../app/assets/img/Chicken-header.png';
import beefHeader from '../app/assets/img/Beef-header.png';
import porkHeader from '../app/assets/img/Pork-header.png';
import plantBasedHeader from '../app/assets/img/plant-based-header.png';

// Add new category images
import breakfastHeader from '../app/assets/img/breakfast-header.jpg';
import lunchHeader from '../app/assets/img/lunch-header.jpg';
import dinnerHeader from '../app/assets/img/dinner-header.jpg';
import dessertHeader from '../app/assets/img/dessert-header.jpg';

const RecipesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Dummy goSomewhere function for the button
  const goSomewhere = () => {
    // Implement random recipe navigation logic here
    alert("Random recipe feature not implemented.");
  };

  return (
    <>
      <main>
        {/* New meal categories section */}
        <section id="meal-categories">
          <div className="slider-image">
            <a href="recipes/breakfast.html">
              <img
                src={breakfastHeader}
                alt="Breakfast dishes"
                title="Breakfast dishes"
              />
              <div className="slider-overlay">Breakfast</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/lunch.html">
              <img
                src={lunchHeader}
                alt="Lunch dishes"
                title="Lunch dishes"
              />
              <div className="slider-overlay">Lunch</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/dinner.html">
              <img
                src={dinnerHeader}
                alt="Dinner dishes"
                title="Dinner dishes"
              />
              <div className="slider-overlay">Dinner</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/dessert.html">
              <img
                src={dessertHeader}
                alt="Dessert dishes"
                title="Dessert dishes"
              />
              <div className="slider-overlay">Dessert</div>
            </a>
          </div>
        </section>
        {/* Existing protein-base section */}
        <section id="protein-base">
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src={chickenHeader}
                alt="Poultry dishes"
                title="Poultry dishes"
              />
              <div className="slider-overlay">Poultry</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src={beefHeader}
                alt="Beef Dishes"
                title="Beef Dishes"
              />
              <div className="slider-overlay">Beef</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src={porkHeader}
                alt="Pork Dishes"
                title="Pork Dishes"
              />
              <div className="slider-overlay">Pork</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src={plantBasedHeader}
                alt="Plant-Based Dishes"
                title="Plant-Based Dishes"
              />
              <div className="slider-overlay">Plant-Based</div>
            </a>
          </div>
        </section>
        <section id="random-recipe">
          <h2>Don't know what to pick?</h2>
          <Button color="primary" onClick={goSomewhere}>
            Click here to get a random recipe
          </Button>
          <Button color="primary" href="/recipesForm" onClick={RecipesForm}>
            Click here to submit your own recipe
          </Button>
        </section>
      </main>
      {/* Bootstrap JS and main.js would be included via bundler or index.html in React */}
    </>
  );
};

export default RecipesPage;
