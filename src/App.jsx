import { useEffect, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { OverlayProvider } from '@react-aria/overlays'
import Navigation from './components/Navigation/Navigation'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import { useDebounce } from './hooks/useDebounce'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Pagination from './components/Pagination/Pagination'
import { useRecipeApi } from './hooks/useRecipeApi'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", -apple-system, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
});

function App() {
  const { 
    loading, 
    error, 
    fetchRecipesByCategory, 
    fetchFilters,
    searchRecipes,
    ITEMS_PER_PAGE,
    setLoading,
    setError
  } = useRecipeApi();

  const [recipes, setRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  })
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');
  const [areas, setAreas] = useState(['All']);
  const [offset, setOffset] = useState(0);
  const [allRecipes, setAllRecipes] = useState([]);
  const [currentLetter, setCurrentLetter] = useState('a');
  const [totalRecipes, setTotalRecipes] = useState(0);
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Load filters on mount
  useEffect(() => {
    fetchFilters()
      .then(({ categories, areas }) => {
        setCategories(categories);
        setAreas(areas);
      })
      .catch(console.error);
  }, []);

  // Load initial recipes
  useEffect(() => {
    loadRecipes();
  }, [selectedCategory, selectedArea, debouncedSearch]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      let results = [];
      
      if (debouncedSearch) {
        results = await searchRecipes(debouncedSearch);
      } else {
        results = await fetchRecipesByCategory(selectedCategory);
      }

      // Apply area filter
      if (selectedArea !== 'All') {
        results = results.filter(recipe => recipe.area === selectedArea);
      }

      setAllRecipes(results);
      setTotalPages(Math.ceil(results.length / ITEMS_PER_PAGE));
      updateCurrentPage(1, results);
    } catch (err) {
      console.error('Failed to load recipes:', err);
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentPage = (pageNum, recipes = allRecipes) => {
    const startIndex = (pageNum - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setRecipes(recipes.slice(startIndex, endIndex));
    setPage(pageNum);
  };

  const handlePageChange = (newPage) => {
    updateCurrentPage(newPage);
  };

  const toggleFavorite = useCallback((recipe) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === recipe.id);
      const newFavorites = isFavorite
        ? prev.filter(fav => fav.id !== recipe.id)
        : [...prev, recipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <OverlayProvider>
          <div className="recipe-app">
            <Navigation />
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    recipes={recipes}
                    loading={loading}
                    error={error}
                    favorites={favorites}
                    onSearch={setSearchQuery}
                    onFilterChange={setSelectedCategory}
                    onAreaChange={setSelectedArea}
                    onFavoriteToggle={toggleFavorite}
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    selectedCategory={selectedCategory}
                    selectedArea={selectedArea}
                    categories={categories}
                    areas={areas}
                  />
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <FavoritesPage 
                    favorites={favorites}
                    onFavoriteToggle={toggleFavorite}
                  />
                } 
              />
            </Routes>
          </div>
        </OverlayProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
