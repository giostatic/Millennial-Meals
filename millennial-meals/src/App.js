import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/AboutPage';
import Recipes from './pages/RecipesPage';
import Restaurants from './pages/RestaurantsPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
