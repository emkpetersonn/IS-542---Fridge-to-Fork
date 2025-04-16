import { Recipe } from "../types/models";
import RecipeInstructions from "./RecipeInstructions";

interface RecipeDetailsProps {
  recipe: Recipe;
  onFavorite: () => void;
  favorites: Set<number>;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe, onFavorite, favorites }) => {
  // handle no recipe
  if (!recipe) {
    return <div>No recipe details available.</div>;
  }

  const { title, ingredients, instructions, nutrition } = recipe;

  // put instructions into array (https://chatgpt.com/c/67ffe0ba-1d38-8005-91f3-390378d3ce7e)
  const steps: string[] = Array.isArray(instructions)
    ? instructions
    : (instructions?.split(/(?:\r?\n|\.)/)
        .map(s => s.trim())
        .filter(s => s.length > 0)) || [];

  return (
    <div className="recipe-details">
      <h2>{title}</h2>

      <h3>Ingredients:</h3>
      {Array.isArray(ingredients) && ingredients.length > 0 ? (
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients available.</p>
      )}

      <h3>Instructions:</h3>
      {steps.length > 0 ? (
        <RecipeInstructions instructions={steps} />
      ) : (
        <p>No instructions available.</p>
      )}

      <h3>Nutritional Info:</h3>
      {nutrition ? (
        <div>
          <p>Calories: {nutrition.calories || "N/A"}</p>
          <p>Protein: {nutrition.protein || "N/A"}</p>
          <p>Fat: {nutrition.fat || "N/A"}</p>
          <p>Carbs: {nutrition.carbohydrates || "N/A"}</p>
        </div>
      ) : (
        <p>Nutritional info not available.</p>
      )}
    </div>
  );
};

export default RecipeDetails;

