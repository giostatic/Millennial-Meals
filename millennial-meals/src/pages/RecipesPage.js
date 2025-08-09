import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../features/recipes/recipes/stylesheet.css";

const RecipesPage = () => {
  // Dummy goSomewhere function for the button
  const goSomewhere = () => {
    // Implement random recipe navigation logic here
    alert("Random recipe feature not implemented.");
  };

  return (
    <>
      <header>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-light" id="navbar">
          <a className="navbar-brand" href="index.html">
            <h1>Millenial Meals</h1>
          </a>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav-items"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="container">
            <div className="collapse navbar-collapse" id="nav-items">
              <ul className="ms-auto mb-2 mb-lg-0">
                <li className="nav-item d-lg-inline-block d-block">
                  <a className="nav-link active" href="index.html">
                    Home
                  </a>
                </li>
                <li className="nav-item d-lg-inline-block d-block">
                  <a className="nav-link active" href="#breakfast">
                    All Recipes
                  </a>
                </li>
                <li className="nav-item d-lg-inline-block d-block">
                  <a className="nav-link active" href="#lunch">
                    Poultry
                  </a>
                </li>
                <li className="nav-item d-lg-inline-block d-block">
                  <a className="nav-link active" href="#dinner">
                    Beef
                  </a>
                </li>
                <li className="nav-item d-lg-inline-block d-block">
                  <a className="nav-link active" href="#dinner">
                    Pork
                  </a>
                </li>
                <li className="nav-item d-lg-inline-block d-block">
                  <a className="nav-link active" href="#dinner">
                    Plant-Based
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section id="protein-base">
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src="recipe-images/Chicken-header.png"
                alt="Poultry dishes"
                title="Poultry dishes"
              />
              <div className="slider-overlay">Poultry</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src="recipe-images/Beef-header.png"
                alt="Beef Dishes"
                title="Beef Dishes"
              />
              <div className="slider-overlay">Beef</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src="recipe-images/Pork-header.png"
                alt="Pork Dishes"
                title="Pork Dishes"
              />
              <div className="slider-overlay">Pork</div>
            </a>
          </div>
          <div className="slider-image">
            <a href="recipes/ribs.html">
              <img
                src="recipe-images/plant-based-header.png"
                alt="Plant-Based Dishes"
                title="Plant-Based Dishes"
              />
              <div className="slider-overlay">Plant-Based</div>
            </a>
          </div>
        </section>
        <section id="random-recipe">
          <h2>Don't know what to pick?</h2>
          <button onClick={goSomewhere}>Click here to get a random recipe</button>
        </section>
      </main>
      {/* Bootstrap JS and main.js would be included via bundler or index.html in React */}
    </>
  );
};

export default RecipesPage;
