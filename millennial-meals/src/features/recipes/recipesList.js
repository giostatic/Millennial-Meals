import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Button
} from "reactstrap";
import "../../styles/recipestyles.css";

const categoryImages = {
  breakfast: require("../../app/assets/img/breakfast-header.jpg"),
  lunch: require("../../app/assets/img/lunch-header.jpg"),
  dinner: require("../../app/assets/img/dinner-header.jpg"),
  dessert: require("../../app/assets/img/dessert-header.jpg"),
  poultry: require("../../app/assets/img/Chicken-header.png"),
  beef: require("../../app/assets/img/Beef-header.png"),
  pork: require("../../app/assets/img/Pork-header.png"),
  seafood: require("../../app/assets/img/seafood-header.jpg"),
  plantBased: require("../../app/assets/img/plant-based-header.png"),
  pastries: require("../../app/assets/img/pastries-header.jpg"),
  starches: require("../../app/assets/img/starches-header.jpg"),
  drinks: require("../../app/assets/img/drinks-header.jpg"),
};

// Helper to fetch all recipe blobs (you may need to adjust the API endpoint)
async function fetchRecipesByCategory(category) {
  const res = await fetch(`/api/recipes-list?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return await res.json();
}

const PAGE_SIZE = 10;

export default function RecipeCategoryPage() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    setPage(1); // Reset to first page on category change
    fetchRecipesByCategory(category)
      .then(setRecipes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (!categoryImages[category]) {
    return <div>Category not found.</div>;
  }

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipes.length) return <div>No recipes found for this category.</div>;

  // Pagination logic
  const totalPages = Math.ceil(recipes.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const recipesToShow = recipes.slice(startIdx, endIdx);

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Recipes</h1>
      <Row className="g-4">
        {recipesToShow.map((recipe, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/recipes/${category}/${recipe.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card className="recipe-card slider-image" style={{ minHeight: 350 }}>
                <CardImg
                  top
                  src={
                    recipe.images && recipe.images.length > 0
                      ? recipe.images[0]
                      : "https://via.placeholder.com/300x180?text=No+Image"
                  }
                  alt={recipe.title}
                  style={{ height: 180, objectFit: "cover" }}
                />
                <CardBody>
                  <CardTitle tag="h2" style={{ fontSize: "1.25rem" }}>
                    {recipe.title}
                  </CardTitle>
                  <CardText style={{ color: "#555" }}>
                    {recipe.description}
                  </CardText>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
        <Button
          color="primary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ marginRight: "1rem" }}
        >
          Previous
        </Button>
        <span style={{ alignSelf: "center" }}>
          Page {page} of {totalPages}
        </span>
        <Button
          color="primary"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{ marginLeft: "1rem" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}