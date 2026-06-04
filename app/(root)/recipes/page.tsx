"use client";

import NavButton from "@/app/components/navButton";
import { Recipe } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Recipe Collection
          </h1>
          <p className="mt-2 text-gray-600">
            Browse and discover delicious recipes.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-900">
                    {recipe.name}
                  </h2>

                  <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                    {recipe.prepTime} min
                  </span>
                </div>

                {/* Difficulty */}
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm text-gray-500">
                    Difficulty:
                  </span>

                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < recipe.difficulty
                            ? "text-yellow-400 text-lg"
                            : "text-gray-300 text-lg"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Instructions
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {recipe.instructions}
                </p>
              </div>

              {/* Ingredients */}
              <div className="px-6 pb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Ingredients
                </h3>

                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No recipes found.
            </p>
          </div>
        )}
      </div>
      <NavButton />
    </div>
  );
}