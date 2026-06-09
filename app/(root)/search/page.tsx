"use client";

import { useState } from "react";
import { Recipe } from "@/app/types/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    setQuery(searchTerm);

    if (!searchTerm.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/recipes/search?q=${searchTerm}`,
      );

      const data = await response.json();
      setRecipes(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="input input-bordered w-full text-base sm:text-lg"
        />

        {/* Empty / Loading State */}
        {!loading &&
          (recipes.length === 0 ? (
            query ? (
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
            )
          ) : null)}

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="card bg-white shadow-md border w-full">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-xl">{recipe.name}</h2>

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
              </div>
            </div>
          ))}
        </div>

        {/* No results footer */}
        {!loading && query && recipes.length === 0 && (
          <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base">
            No recipes found.
          </div>
        )}
      </div>
    </div>
  );
}
