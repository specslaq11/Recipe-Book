import { useState, useCallback } from 'react';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const ITEMS_PER_PAGE = 12;

export function useRecipeApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatRecipe = (meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
    video: meal.strYoutube,
    instructions: meal.strInstructions,
    ingredients: Object.keys(meal)
      .filter(key => key.startsWith('strIngredient') && meal[key])
      .map(key => {
        const measureKey = `strMeasure${key.slice(13)}`;
        return `${meal[measureKey]} ${meal[key]}`.trim();
      })
  });

  const fetchAllRecipes = async () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let allRecipes = [];

    // Fetch recipes for each letter
    for (const letter of letters) {
      try {
        const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
        const data = await response.json();
        if (data.meals) {
          const recipes = data.meals.map(formatRecipe);
          allRecipes = [...allRecipes, ...recipes];
        }
      } catch (err) {
        console.error(`Failed to fetch recipes for letter ${letter}:`, err);
      }
    }

    return allRecipes;
  };

  const fetchRecipesByCategory = useCallback(async (category) => {
    setLoading(true);
    try {
      if (category === 'All') {
        return await fetchAllRecipes();
      }

      const url = `${BASE_URL}/filter.php?c=${category}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.meals) return [];

      // Get full recipe details
      const recipes = await Promise.all(
        data.meals.map(meal => 
          fetch(`${BASE_URL}/lookup.php?i=${meal.idMeal}`)
            .then(res => res.json())
            .then(data => formatRecipe(data.meals[0]))
        )
      );

      return recipes;
    } catch (err) {
      setError('Failed to fetch recipes');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFilters = useCallback(async () => {
    try {
      setLoading(true);
      const [categoriesRes, areasRes] = await Promise.all([
        fetch(`${BASE_URL}/categories.php`),
        fetch(`${BASE_URL}/list.php?a=list`)
      ]);

      const [categoriesData, areasData] = await Promise.all([
        categoriesRes.json(),
        areasRes.json()
      ]);

      const categories = ['All', ...categoriesData.categories.map(cat => cat.strCategory)];
      const areas = ['All', ...areasData.meals.map(area => area.strArea)];

      return { categories, areas };
    } catch (err) {
      setError('Failed to load filters');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchRecipes = useCallback(async (query) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/search.php?s=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.meals) return [];
      
      return data.meals.map(formatRecipe);
    } catch (err) {
      setError('Failed to search recipes');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    setLoading,
    setError,
    fetchRecipesByCategory,
    fetchFilters,
    searchRecipes,
    ITEMS_PER_PAGE
  };
} 