import { Link } from 'react-router-dom';

const Home = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to Millennial Meals</h1>
        <p>Discover delicious recipes or find great restaurants near you!</p>
        <div style={{ marginTop: '30px' }}>
            <Link to="/recipes" style={{ margin: '0 20px', fontSize: '18px' }}>
                Go to Recipes
            </Link>
            <Link to="/restaurants" style={{ margin: '0 20px', fontSize: '18px' }}>
                Go to Restaurants
            </Link>
        </div>
    </div>
);

export default Home;