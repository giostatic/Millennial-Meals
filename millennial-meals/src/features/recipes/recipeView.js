import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeView() {
  const { category, id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/recipe-view?category=${category}&id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch recipe");
        return res.json();
      })
      .then(setRecipe)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, id]);

  if (loading) return <div>Loading recipe...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#fbe7c6"
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "2rem 0",
          marginLeft: "10vw", // pushes content to the right of center
          flex: 1
        }}
      >
        <h1 style={{ textAlign: "center" }}>{recipe.title}</h1>
        <p style={{ textAlign: "center" }}>{recipe.description}</p>
        {recipe.images && recipe.images.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              margin: "16px 0",
              flexWrap: "wrap",
              justifyContent: "center" // <-- add this line to center images
            }}
          >
            {recipe.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${recipe.title} ${idx + 1}`}
                style={{ width: 250, maxHeight: 250, objectFit: "cover", borderRadius: 8 }}
              />
            ))}
          </div>
        )}
        <h3 style={{ textAlign: "center" }}>Ingredients</h3>
        <ul style={{ textAlign: "left" }}>
          {recipe.ingredients?.map((item, idx) => (
            <li key={idx}>{item.ingredient}</li>
          ))}
        </ul>
        <h3 style={{ textAlign: "center" }}>Instructions</h3>
        <ol style={{ textAlign: "left" }}>
          {recipe.instructions?.map((item, idx) => (
            <li key={idx}>{item.instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}