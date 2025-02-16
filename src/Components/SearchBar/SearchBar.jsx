import { TextField, InputAdornment, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  return (
    <Paper elevation={0} className="search-container">
      <TextField
        className="search-input"
        fullWidth
        placeholder="Search for recipes..."
        onChange={(e) => onSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="medium"
      />
    </Paper>
  );
} 