import { Pagination as MuiPagination, Paper } from '@mui/material';
import './Pagination.css';

export default function Pagination({ currentPage, totalPages, onPageChange, disabled }) {
  return (
    <Paper elevation={0} className="pagination-container">
      <MuiPagination 
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        disabled={disabled}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
      />
    </Paper>
  );
} 