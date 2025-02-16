import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import './AreaFilter.css';

export default function AreaFilter({ areas = [], selectedArea = 'All', onAreaChange, loading }) {
  return (
    <FormControl variant="outlined" className="area-filter" size="small">
      <InputLabel id="area-filter-label">Cuisine</InputLabel>
      <Select
        labelId="area-filter-label"
        id="area-filter"
        value={selectedArea}
        label="Cuisine"
        onChange={(e) => onAreaChange(e.target.value)}
        disabled={loading}
      >
        {(areas.length > 0 ? areas : ['All']).map((area) => (
          <MenuItem key={area} value={area}>
            {area}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
} 