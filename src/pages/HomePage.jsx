import { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterBar from '../components/FilterBar/FilterBar';
import AreaFilter from '../components/AreaFilter/AreaFilter';
import RecipeList from '../components/RecipeList/RecipeList';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import LoadMore from '../components/LoadMore/LoadMore';
import Pagination from '../components/Pagination/Pagination';

export default function HomePage({ 
  recipes, 
  loading,
  categoryLoading,
  error,
  favorites,
  onSearch,
  onFilterChange,
  onAreaChange,
  onFavoriteToggle,
  currentPage,
  totalPages,
  onPageChange,
  selectedCategory,
  selectedArea,
  categories,
  areas
}) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  return (
    <>
      <header>
        <h1>My Recipe Book</h1>
        <div className="search-filter">
          <SearchBar onSearch={onSearch} />
          <div className="filters">
            <FilterBar 
              categories={categories}
              selectedCategory={selectedCategory}
              onFilterChange={onFilterChange} 
              loading={categoryLoading}
            />
            <AreaFilter 
              areas={areas}
              selectedArea={selectedArea}
              onAreaChange={onAreaChange}
              loading={categoryLoading}
            />
          </div>
        </div>
      </header>
      <main>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <RecipeList 
              recipes={recipes}
              favorites={favorites}
              onFavoriteToggle={onFavoriteToggle}
              onRecipeSelect={setSelectedRecipe}
              loading={categoryLoading}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              disabled={loading || categoryLoading}
            />
            {selectedRecipe && (
              <RecipeDetail 
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                isFavorite={favorites.some(fav => fav.id === selectedRecipe.id)}
                onFavoriteToggle={() => onFavoriteToggle(selectedRecipe)}
              />
            )}
          </>
        )}
      </main>
    </>
  );
} 