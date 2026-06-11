"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-7xl mb-6">🍳</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Recipe Finder
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover delicious recipes by name or ingredient
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/search" 
              className="btn btn-primary"
            >
              Search Recipes
            </Link>
            <Link 
              href="/search?type=ingredient" 
              className="btn btn-outline"
            >
              Search by Ingredient
            </Link>
          </div>
        </div>

        {/* Simple Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-4">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-gray-600">Search by recipe name</p>
          </div>
          
          <div className="p-4">
            <div className="text-3xl mb-2">🥬</div>
            <p className="text-gray-600">Search by ingredient</p>
          </div>
          
          <div className="p-4">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-gray-600">Filter by difficulty & time</p>
          </div>
        </div>
      </div>
    </div>
  );
}