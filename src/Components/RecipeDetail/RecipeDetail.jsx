import { Dialog, DialogTitle, DialogContent, IconButton, Typography, List, ListItem, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './RecipeDetail.css';

export default function RecipeDetail({ recipe, onClose, isFavorite, onFavoriteToggle }) {
  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="recipe-detail-dialog"
    >
      <DialogTitle>
        <div className="dialog-header">
          <Typography variant="h5">{recipe.title}</Typography>
          <div className="dialog-actions">
            <IconButton onClick={() => onFavoriteToggle(recipe)}>
              {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
            </IconButton>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="recipe-detail-content">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          
          <section className="recipe-info">
            <Typography variant="h6">Ingredients</Typography>
            <List>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </List>
          </section>

          <section className="recipe-instructions">
            <Typography variant="h6">Instructions</Typography>
            <Typography variant="body1">{recipe.instructions}</Typography>
          </section>

          {recipe.video && (
            <section className="recipe-video">
              <Typography variant="h6">Video Tutorial</Typography>
              <div className="video-container">
                <iframe
                  src={recipe.video.replace('watch?v=', 'embed/')}
                  title="Recipe Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 