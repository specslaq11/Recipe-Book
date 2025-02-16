import './RecipeList.css';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeList({ recipes, favorites, onFavoriteToggle, onRecipeSelect }) {
  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes found</p>
      ) : (
        recipes.map(recipe => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe}
            isFavorite={favorites.some(fav => fav.id === recipe.id)}
            onFavoriteToggle={onFavoriteToggle}
            onSelect={onRecipeSelect}
          />
        ))
      )}
    </div>
  );
} 