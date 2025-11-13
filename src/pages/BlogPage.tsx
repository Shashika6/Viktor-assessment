import { Container, Typography, Box } from '@mui/material';
import { BlogGrid } from '../components/BlogGrid';
import { Pagination } from '../components/Pagination';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { styles } from './BlogPage.styles';

export const BlogPage = () => {
  const { posts, loading, error, currentPage, totalPages, setCurrentPage } = useBlogPosts();

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="lg">
        <Box sx={styles.headerBox}>
          <Typography variant="h3" component="h1" gutterBottom>
            Viktor Blog
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Insights and updates
          </Typography>
        </Box>

        <BlogGrid posts={posts} loading={loading} error={error} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
    </Box>
  );
};

