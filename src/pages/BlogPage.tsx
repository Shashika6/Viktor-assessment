import { Container, Typography, Box, Select, MenuItem } from "@mui/material";
import { BlogGrid } from "../components/BlogGrid";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { SORT_ORDER } from "../types/blog.types";
import type { SortOrder } from "../types/blog.types";
import { styles } from "./BlogPage.styles";

export const BlogPage = () => {
  const {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
  } = useBlogPosts();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (event: { target: { value: string } }) => {
    setSortOrder(event.target.value as SortOrder);
    setCurrentPage(1);
  };

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="lg">
        <Box sx={styles.headerBox}>
          <Typography variant="h3" component="h1" gutterBottom>
            VIKTOR Blog
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Insights and updates
          </Typography>
          <Box sx={styles.searchBox}>
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              sx={styles.sortSelect}
            >
              <MenuItem value={SORT_ORDER.NEWEST_FIRST}>Newest First</MenuItem>
              <MenuItem value={SORT_ORDER.OLDEST_FIRST}>Oldest First</MenuItem>
            </Select>
          </Box>
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
