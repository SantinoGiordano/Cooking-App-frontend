"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/lib/types/types";
import RecipeFilters from "@/app/components/recipeFilter";
import { backend_route } from "@/lib/routes/page";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const [difficulty, setDifficulty] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetch(`${backend_route}/api/recipes`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.data);
      })
      .catch((error) => console.error("Error fetching recipes:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    if (difficulty && recipe.difficulty !== Number(difficulty)) {
      return false;
    }

    if (cuisine && recipe.cuisine.toLowerCase() !== cuisine.toLowerCase()) {
      return false;
    }

    if (time === "short" && recipe.prepTime > 15) {
      return false;
    }

    if (time === "medium" && (recipe.prepTime < 20 || recipe.prepTime > 40)) {
      return false;
    }

    if (time === "long" && recipe.prepTime <= 40) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Header Skeleton */}
          <div className="mb-10">
            <div className="skeleton h-12 w-80 mb-4"></div>
            <div className="skeleton h-5 w-64"></div>
          </div>

          {/* Recipe Card Skeletons */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex justify-between mb-6">
                  <div className="skeleton h-8 w-40"></div>
                  <div className="skeleton h-8 w-16 rounded-full"></div>
                </div>

                <div className="skeleton h-4 w-24 mb-4"></div>

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="skeleton h-5 w-5"></div>
                  ))}
                </div>

                <div className="skeleton h-8 w-24 rounded-full mb-6"></div>

                <div className="skeleton h-5 w-32 mb-3"></div>

                <div className="space-y-2 mb-6">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-3/4"></div>
                </div>

                <div className="skeleton h-5 w-28 mb-3"></div>

                <div className="flex flex-wrap gap-2">
                  <div className="skeleton h-8 w-20 rounded-full"></div>
                  <div className="skeleton h-8 w-24 rounded-full"></div>
                  <div className="skeleton h-8 w-16 rounded-full"></div>
                  <div className="skeleton h-8 w-28 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

        <RecipeFilters
          cuisine={cuisine}
          difficulty={difficulty}
          time={time}
          onCuisineChange={setCuisine}
          onDifficultyChange={setDifficulty}
          onTimeChange={setTime}
        />

        <div className="mb-6">
          <p className="text-gray-500">
            Showing {filteredRecipes.length} recipe
            {filteredRecipes.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-900">
                    {recipe.name}
                  </h2>

                  <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                    {recipe.prepTime} min
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm text-gray-500">Difficulty:</span>

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

                <div className="mt-3">
                  <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                    {recipe.cuisine}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Instructions
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {recipe.instructions}
                </p>
              </div>

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

        {filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No recipes match the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}