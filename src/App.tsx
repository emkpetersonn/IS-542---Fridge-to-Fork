import { useState, useEffect } from "react";
import { fetchRecipes } from "./api/spoonacular";
import { Recipe } from "./types/models";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import Favorites from "./components/Favorites";
import cuteBackground from "./assets/cute-Photoroom.png";
import cookbookIcon from "./assets/cookbook.png";
import './App.css';

const App: React.FC = () => {
  // hold search results
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // current recipe
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // load favorites from local storage
  const [favorites, setFavorites] = useState<Set<number>>((): Set<number> => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed) && parsed.every((item: any) => typeof item === 'number')) {
          return new Set<number>(parsed);
        }
      } catch (error) {
        console.error("Error parsing favorites from localStorage", error);
      }
    }
    // Return empty if nothing found
    return new Set<number>(); 
  });

  // Create favorite recipes as a map
  const [favoriteRecipesMap, setFavoriteRecipesMap] = useState<Map<number, Recipe>>(() => {
    const saved = localStorage.getItem("favoriteRecipes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Map(parsed.map((r: Recipe) => [r.id, r]));
        }
      } catch (e) {
        console.error("Error parsing favorite recipes", e);
      }
    }
    return new Map<number, Recipe>();
  });

  // Save favorites to local storage when it updates
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const handleSearch = async (ingredients: string[]) => {
    const data = await fetchRecipes(ingredients); 
    // set new search 
    setRecipes(data);
    // clear selected recipe
    setSelectedRecipe(null);
  };

  // set favorite & unfavorite
  const handleFavorite = (recipeId: number) => {
    const recipe = recipes.find(r => r.id === recipeId);
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(recipeId)) {
        // remove
        updated.delete(recipeId);
      } else {
        // add
        updated.add(recipeId);
        // Save recipe in the map if its being added to favs
        if (recipe) {
          setFavoriteRecipesMap((prevMap) => new Map(prevMap).set(recipeId, recipe));
        }
      }
      return updated;
    });

    // If its being deleted from favs, remove it from the map
    if (favorites.has(recipeId)) {
      setFavoriteRecipesMap((prevMap) => {
        const updatedMap = new Map(prevMap);
        updatedMap.delete(recipeId);
        return updatedMap;
      });
    }
  };

  // Handle selecting a recipe
  const handleSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe); // update selected recipe
  };
  
  // Get favorites list
  const favoriteRecipes = Array.from(favoriteRecipesMap.values());

  return (
    <>
      <div>
        <img
          src={cuteBackground}
          alt="Cute Kitchen Background"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100vw",
            height: "400px",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <h1
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "48px",
            color: "#000",
            textShadow: "none",
            margin: 0,
          }}
        >
          Fridge to Fork
        </h1>
        <img
          src={cookbookIcon}
          alt="Cookbook Icon"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "auto",
          }}
        />
      </div>
      <div className="app-container" style={{ paddingTop: "400px" }}>
        <SearchBar onSearch={handleSearch} />
        <RecipeList
          recipes={recipes}
          favorites={favorites}
          onFavorite={(recipe) => handleFavorite(recipe.id)}
          onSelect={handleSelect}
        />
{selectedRecipe && (
  <RecipeDetails
    recipe={selectedRecipe}
    onFavorite={() => handleFavorite(selectedRecipe.id)}
    favorites={favorites}
  />
)}
        <Favorites favorites={favoriteRecipes} />
      </div>
    </>
  );
};

export default App;


