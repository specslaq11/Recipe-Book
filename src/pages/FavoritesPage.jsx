import RecipeList from '../Components/RecipeList/RecipeList';
import RecipeDetail from '../Components/RecipeDetail/RecipeDetail';
import { useState } from 'react';

export default function FavoritesPage({ favorites, onFavoriteToggle }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      <header>
        <h1>Favorite Recipes</h1>
      </header>
      <main>
        {favorites.length === 0 ? (
          <p className="no-recipes">No favorite recipes yet</p>
        ) : (
          <>
            <RecipeList 
              recipes={favorites}
              favorites={favorites}
              onFavoriteToggle={onFavoriteToggle}
              onRecipeSelect={setSelectedRecipe}
            />
            {selectedRecipe && (
              <RecipeDetail 
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                isFavorite={true}
                onFavoriteToggle={() => onFavoriteToggle(selectedRecipe)}
              />
            )}
          </>
        )}
      </main>
    </>
  );
} 