"use client";

interface RecipeFiltersProps {
  query: string;
  cuisine: string;
  difficulty: string;
  time: string;
  onQueryChange: (value: string) => void;
  onCuisineChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

export default function RecipeFilters({
  query,
  cuisine,
  difficulty,
  time,
  onQueryChange,
  onCuisineChange,
  onDifficultyChange,
  onTimeChange,
}: RecipeFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border mb-6">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="input input-bordered w-full"
        />

        {/* Cuisine */}
        <select
          className="select select-bordered w-full"
          value={cuisine}
          onChange={(e) => onCuisineChange(e.target.value)}
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="American">American</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
        </select>

        {/* Difficulty */}
        <select
          className="select select-bordered w-full"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="1">★ Easy</option>
          <option value="2">★★ Easy-Medium</option>
          <option value="3">★★★ Medium</option>
          <option value="4">★★★★ Hard</option>
          <option value="5">★★★★★ Expert</option>
        </select>

        {/* Time */}
        <select
          className="select select-bordered w-full"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
        >
          <option value="">Any Time</option>
          <option value="short">15 mins & under</option>
          <option value="medium">20-40 mins</option>
          <option value="long">40+ mins</option>
        </select>
      </div>
    </div>
  );
}