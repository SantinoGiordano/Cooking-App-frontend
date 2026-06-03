'use client'

import { Recipe } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function Recipes() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetch('/api/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);
    
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Recipes page</h1>
            <p>
                {
                    recipes.map(recipe => (
                        <div key={recipe._id}>
                            <h2>{recipe.name}</h2>
                        </div>
                    ))
                }
            </p>
        </div>
    )
}