export type Recipe = {
    _id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    prepTime: number;
    cookTime: number;
    difficulty: number;
    cuisine: string;
}