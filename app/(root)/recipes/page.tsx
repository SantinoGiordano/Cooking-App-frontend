"use client";

import { Recipe } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipes(data.data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Recipes page</h1>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.name}</h2>
            <p className="text-sm text-gray-500">
              Instructions: {recipe.instructions}
            </p>
            Prep Time: {recipe.prepTime} minutes <br />
            <p className="text-sm text-gray-500">
              Ingredients: {recipe.ingredients.join(", ")} <br />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
