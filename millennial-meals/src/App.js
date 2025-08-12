import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';
import Recipes from './pages/RecipesPage';
import RecipeCategoryPage from './features/recipes/recipesList';
import Restaurants from './pages/RestaurantsPage';
import RecipesForm from './features/recipes/recipesForm';
import RecipeView from './features/recipes/recipeView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path='/recipes/:category' element={<RecipeCategoryPage />} />
        <Route path="/recipes/:category/:id" element={<RecipeView />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/recipesForm" element={<RecipesForm />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
