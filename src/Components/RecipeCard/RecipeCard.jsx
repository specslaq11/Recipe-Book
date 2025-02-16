import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './RecipeCard.css';

export default function RecipeCard({ recipe, isFavorite, onFavoriteToggle, onSelect }) {
  return (
    <Card className="recipe-card" onClick={() => onSelect(recipe)}>
      <CardMedia
        component="img"
        height="200"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent>
        <div className="recipe-header">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle(recipe);
            }}
            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          >
            {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
          </IconButton>
          <Typography variant="h6" component="h3" className="recipe-title">
            {recipe.title}
          </Typography>
        </div>
        <div className="recipe-meta">
          <Typography variant="body2" color="text.secondary" className="recipe-category">
            {recipe.category}
          </Typography>
          {recipe.area && (
            <Typography variant="body2" color="text.secondary" className="recipe-area">
              {recipe.area}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 