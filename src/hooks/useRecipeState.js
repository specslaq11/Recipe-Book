import { useState, useEffect } from 'react';

export function useRecipeState() {
  // Load saved state from localStorage
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('recipeState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          recipes: [],
          allMeals: [],
          page: 1,
          offset: 0,
          currentLetter: 'a',
          selectedCategory: 'All',
          selectedArea: 'All',
          searchHistory: [],
          lastSearch: ''
        };
      }
    }
    return {
      recipes: [],
      allMeals: [],
      page: 1,
      offset: 0,
      currentLetter: 'a',
      selectedCategory: 'All',
      selectedArea: 'All',
      searchHistory: [],
      lastSearch: ''
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recipeState', JSON.stringify(state));
  }, [state]);

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const addToSearchHistory = (query) => {
    if (!query.trim()) return;
    
    setState(prev => ({
      ...prev,
      searchHistory: [
        query,
        ...prev.searchHistory.filter(q => q !== query).slice(0, 9)
      ],
      lastSearch: query
    }));
  };

  const clearSearchHistory = () => {
    setState(prev => ({
      ...prev,
      searchHistory: [],
      lastSearch: ''
    }));
  };

  const resetState = () => {
    setState({
      recipes: [],
      allMeals: [],
      page: 1,
      offset: 0,
      currentLetter: 'a',
      selectedCategory: 'All',
      selectedArea: 'All',
      searchHistory: [],
      lastSearch: ''
    });
  };

  return {
    ...state,
    updateState,
    addToSearchHistory,
    clearSearchHistory,
    resetState
  };
} 