import { useRef } from 'react';
import { useButton } from 'react-aria';
import './RecipeForm.css';

export default function RecipeForm() {
  const buttonRef = useRef();
  const { buttonProps } = useButton({
    onPress: () => {
      // Handle form submission
    }
  }, buttonRef);

  return (
    <div className="recipe-form">
      <h2>Add New Recipe</h2>
      {/* We'll add form fields here later */}
      <button {...buttonProps} ref={buttonRef}>
        Add Recipe
      </button>
    </div>
  );
} 