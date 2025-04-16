export interface Recipe {
    id: number;
    title: string;
    image: string;
    ingredients: string[];
    instructions: string;
    nutrition: {
      calories: number;
      protein: string;
      fat: string;
      carbohydrates: string;
    };
  }
  
  // search by user
  export interface UserQuery {
    ingredients: string[];
  }
  
  // users favorites
  export interface Favorites {
    favoriteRecipes: number[];
  }
  