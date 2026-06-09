"use client";

import { useState } from "react";

export default function AddRecipePage() {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  const [ingredientInput, setIngredientInput] = useState("");
  const [instructionInput, setInstructionInput] = useState("");

  const addIngredient = () => {
    if (!ingredientInput.trim()) return;
    setIngredients([...ingredients, ingredientInput]);
    setIngredientInput("");
  };

  const addInstruction = () => {
    if (!instructionInput.trim()) return;
    setInstructions([...instructions, instructionInput]);
    setInstructionInput("");
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const payload = {
      name,
      cuisine,
      prepTime,
      difficulty,
      ingredients,
      instructions,
    };

    try {
      const res = await fetch("http://localhost:8080/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">Add Recipe</h1>

        {/* BASIC FIELDS */}
        <input
          className="input input-bordered w-full"
          placeholder="Recipe name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />

        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Prep time (mins)"
          value={prepTime}
          onChange={(e) => setPrepTime(Number(e.target.value))}
        />

        <select
          className="select select-bordered w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
        >
          <option value={1}>1 - Easy</option>
          <option value={2}>2</option>
          <option value={3}>3 - Medium</option>
          <option value={4}>4</option>
          <option value={5}>5 - Hard</option>
        </select>

        {/* INGREDIENTS */}
        <div>
          <h2 className="font-semibold mb-2">Ingredients</h2>

          <div className="flex gap-2">
            <input
              className="input input-bordered w-full"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="Add ingredient"
            />
            <button className="btn btn-primary" onClick={addIngredient}>
              Add
            </button>
          </div>

          <ul className="mt-2 space-y-1">
            {ingredients.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item}</span>
                <button
                  className="text-red-500"
                  onClick={() => removeIngredient(i)}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* INSTRUCTIONS */}
        <div>
          <h2 className="font-semibold mb-2">Instructions</h2>

          <div className="flex gap-2">
            <input
              className="input input-bordered w-full"
              value={instructionInput}
              onChange={(e) => setInstructionInput(e.target.value)}
              placeholder="Add step"
            />
            <button className="btn btn-primary" onClick={addInstruction}>
              Add
            </button>
          </div>

          <ol className="mt-2 space-y-1 list-decimal ml-5">
            {instructions.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item}</span>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => removeInstruction(i)}
                >
                  remove
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* SUBMIT */}
        <button onClick={handleSubmit} className="btn btn-success w-full">
          Create Recipe
        </button>
      </div>
    </div>
  );
}