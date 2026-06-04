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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Search Recipes</h1>

        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="input input-bordered w-full text-lg"
        />

        {loading && <p className="mt-4">Searching...</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="card bg-white shadow-md border">
              <div className="card-body">
                <h2 className="card-title">{recipe.name}</h2>

                <p>Prep Time: {recipe.prepTime} mins</p>

                <div className="flex">
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

                <p className="text-sm text-gray-500">{recipe.cuisine}</p>
              </div>
            </div>
          ))}
        </div>

        {!loading && query && recipes.length === 0 && (
          <div className="mt-8 text-center">No recipes found.</div>
        )}
      </div>
    </div>
  );
}
