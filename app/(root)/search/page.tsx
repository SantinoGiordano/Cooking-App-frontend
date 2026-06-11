"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/lib/types/types";
import { backend_route } from "@/lib/routes/page";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const toggleIngredients = (index: number) => {
    setExpandedRecipe(expandedRecipe === index ? null : index);
  };

  const searchRecipes = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setRecipes([]);
      setExpandedRecipe(null);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${backend_route}/api/recipes/search?q=${encodeURIComponent(
          searchTerm
        )}`
      );

      const data = await response.json();
      setRecipes(data.data || []);
      setExpandedRecipe(null);
    } catch (error) {
      console.error(error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(inputValue);

      if (inputValue.trim()) {
        searchRecipes(inputValue);
      } else {
        setRecipes([]);
        setExpandedRecipe(null);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
          Search Recipes
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input input-bordered w-full text-base sm:text-lg"
        />

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <>
            {query ? (
              <div className="mt-10 sm:mt-16 text-center">
                <p className="text-gray-500 text-base sm:text-lg">
                  No recipes found.
                </p>
              </div>
            ) : (
              <div className="mt-10 sm:mt-16 text-center">
                <div className="text-5xl sm:text-6xl mb-3">🍽️</div>
                <p className="text-gray-500 text-base sm:text-lg">
                  Start typing to search recipes
                </p>
              </div>
            )}
          </>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="card bg-white shadow-md border w-full"
              >
                <div className="card-body p-4 sm:p-6">
                  <div className="skeleton h-7 w-3/4 mb-4"></div>

                  <div className="skeleton h-4 w-1/2 mb-4"></div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="skeleton h-5 w-5 rounded-full"
                      />
                    ))}
                  </div>

                  <div className="skeleton h-4 w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="card bg-white shadow-md border hover:shadow-xl transition-all duration-300 w-full"
              >
                <div className="card-body p-4 sm:p-6">
                  <h2 className="card-title text-lg sm:text-xl">
                    {recipe.name}
                  </h2>

                  <p className="text-sm sm:text-base">
                    Prep Time: {recipe.prepTime} mins
                  </p>

                  <div className="flex text-base sm:text-lg">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < recipe.difficulty
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500">
                    {recipe.cuisine}
                  </p>

                  {/* Expandable Ingredients */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedRecipe === index
                        ? "max-h-96 mt-4 border-t pt-4"
                        : "max-h-0"
                    }`}
                  >
                    <h3 className="font-semibold mb-3">Ingredients</h3>

                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.map(
                        (ingredient, ingredientIndex) => (
                          <span
                            key={ingredientIndex}
                            className="badge badge-outline badge-lg"
                          >
                            {ingredient}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => toggleIngredients(index)}
                      className="btn btn-sm btn-outline"
                    >
                      {expandedRecipe === index
                        ? "Hide Ingredients"
                        : "View Ingredients"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}