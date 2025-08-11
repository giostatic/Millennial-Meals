import "bootstrap/dist/css/bootstrap.min.css";
import "../features/recipes/recipes/stylesheet.css";

import {
  Button,
  Container
} from 'reactstrap';

import { useState } from 'react';

import chickenHeader from '../app/assets/img/Chicken-header.png';
import beefHeader from '../app/assets/img/Beef-header.png';
import porkHeader from '../app/assets/img/Pork-header.png';
import plantBasedHeader from '../app/assets/img/plant-based-header.png';

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
        </section>
      </main>
      {/* Bootstrap JS and main.js would be included via bundler or index.html in React */}
    </>
  );
};

export default RecipesPage;
