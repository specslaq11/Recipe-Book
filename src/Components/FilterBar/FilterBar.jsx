import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import './FilterBar.css';

export default function FilterBar({ categories = [], selectedCategory = 'All', onFilterChange, loading }) {
  return (
    <FormControl variant="outlined" className="filter-bar" size="small">
      <InputLabel id="category-filter-label">Category</InputLabel>
      <Select
        labelId="category-filter-label"
        id="category-filter"
        value={selectedCategory}
        label="Category"
        onChange={(e) => onFilterChange(e.target.value)}
        disabled={loading}
      >
        {(categories.length > 0 ? categories : ['All']).map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
} 