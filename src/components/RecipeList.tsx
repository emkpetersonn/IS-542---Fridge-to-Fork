import React, { useState } from "react";
import { Recipe } from "../types/models";
import RecipeDetails from "./RecipeDetails";

interface RecipeListProps {
  recipes: Recipe[];
  // to see details 
  onSelect: (recipe: Recipe) => void;
  // for favorites
  favorites: Set<number>; 
  // to set favorites 
  onFavorite: (recipe: Recipe) => void;
}

// (https://chatgpt.com/c/67ffe65c-9c78-8005-ae35-db7ac1730999)
const RecipeList: React.FC<RecipeListProps> = ({ recipes, favorites, onFavorite }) => {
  const [expandedRecipeId, setExpandedRecipeId] = useState<number | null>(null);

  const handleSelect = (recipe: Recipe) => {
    // Toggle expansion
    setExpandedRecipeId(prev => (prev === recipe.id ? null : recipe.id));
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          
          <h3 
            onClick={() => handleSelect(recipe)} 
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {recipe.title}
          </h3>

          <button onClick={() => onFavorite(recipe)}>
            {favorites.has(recipe.id) ? "❤️ Favorited" : "☆ Favorite"}
          </button>

          {/* Expand details if this recipe is selected */}
          {expandedRecipeId === recipe.id && (
            <div className="mt-2 border-t pt-2">
              <RecipeDetails 
                recipe={recipe} 
                onFavorite={() => onFavorite(recipe)} 
                favorites={favorites} 
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
