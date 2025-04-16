import axios from "axios";
import { Recipe } from "../types/models";

const API_KEY = "c689bd66384d46a5b01106b7350b4eec";
const FIND_URL = "https://api.spoonacular.com/recipes/findByIngredients";
const INFO_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  try {
    const findResponse = await axios.get(FIND_URL, {
      params: {
        ingredients: ingredients.join(","),
        number: 5, // Limit to 5 recipes for performance (optional)
        apiKey: API_KEY,
      },
    });

    const recipesBasic = findResponse.data;

    // Fetch full details for each recipe
    const detailedRecipes = await Promise.all(
      recipesBasic.map(async (recipe: any) => {
        const infoResponse = await axios.get(`${INFO_URL}/${recipe.id}/information`, {
          params: {
            apiKey: API_KEY,
            includeNutrition: true,
          },
        });

        const data = infoResponse.data;

        const detailedRecipe: Recipe = {
          id: data.id,
          title: data.title,
          image: data.image,
          ingredients: data.extendedIngredients?.map((ing: any) => ing.original) || [],
          instructions:
            data.analyzedInstructions?.[0]?.steps?.map((s: any) => s.step).join(" ") ||
            data.instructions ||
            "No instructions available.",
          nutrition: {
            calories:
              data.nutrition?.nutrients.find((n: any) => n.name === "Calories")?.amount || 0,
            protein:
              data.nutrition?.nutrients.find((n: any) => n.name === "Protein")?.amount + " g" ||
              "N/A",
            fat:
              data.nutrition?.nutrients.find((n: any) => n.name === "Fat")?.amount + " g" || "N/A",
            carbohydrates:
              data.nutrition?.nutrients.find((n: any) => n.name === "Carbohydrates")?.amount +
                " g" || "N/A",
          },
        };

        return detailedRecipe;
      })
    );

    return detailedRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};


