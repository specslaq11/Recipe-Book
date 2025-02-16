/**
 * @typedef {Object} Recipe
 * @property {string} id - Unique identifier for the recipe
 * @property {string} title - Recipe title
 * @property {string[]} ingredients - List of ingredients
 * @property {string} instructions - Cooking instructions
 * @property {string} category - Recipe category
 * @property {number} prepTime - Preparation time in minutes
 * @property {number} cookTime - Cooking time in minutes
 * @property {number} servings - Number of servings
 * @property {string} [image] - Optional URL for recipe image
 */

/**
 * @type {Recipe[]}
 */
export const sampleRecipes = [];

/**
 * Creates a new recipe object
 * @param {Partial<Recipe>} recipeData
 * @returns {Recipe}
 */
export function createRecipe(recipeData) {
  return {
    id: crypto.randomUUID(),
    title: '',
    ingredients: [],
    instructions: '',
    category: '',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    ...recipeData
  };
} 