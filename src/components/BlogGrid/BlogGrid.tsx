import { Box, CircularProgress, Typography } from '@mui/material';
import { BlogCard } from '../BlogCard';
import type { BlogPost } from '../../types/blog.types';
import { styles } from './styles';

interface BlogGridProps {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
}

export const BlogGrid = ({ posts, loading, error }: BlogGridProps) => {
  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography color="error">Error loading posts: {error.message}</Typography>
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box sx={styles.emptyContainer}>
        <Typography>No posts found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.grid}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </Box>
  );
};

