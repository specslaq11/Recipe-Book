import { CircularProgress, Box, Typography } from '@mui/material';
import { useRef, useEffect } from 'react';
import './LoadMore.css';

export default function LoadMore({ onLoadMore, loading }) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { 
        root: null, // Use viewport as root
        rootMargin: '100px', // Start loading 100px before reaching the end
        threshold: 0.1 // Trigger when even 10% of the target is visible
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onLoadMore, loading]);

  return (
    <Box 
      ref={observerTarget} 
      className="load-more" 
      sx={{ 
        textAlign: 'center', 
        py: 3,
        minHeight: '100px', // Give it some height to be visible
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography color="text.secondary">Scroll for more recipes...</Typography>
      )}
    </Box>
  );
} 