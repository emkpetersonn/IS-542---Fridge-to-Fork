import { Recipe } from "../types/models";

interface FavoritesProps {
  favorites: Recipe[];
}

// display list of favorites 
const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <h3>{recipe.title}</h3>
          </div>
        ))
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};


export default Favorites;

