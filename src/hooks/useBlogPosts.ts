import { useState, useEffect } from 'react';
import type { BlogPost, SortOrder } from '../types/blog.types';
import { SORT_ORDER } from '../types/blog.types';
import { fetchBlogPosts, fetchBlogPostsCount } from '../services/api';

interface BlogPostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

const POSTS_PER_PAGE = 9;

const getInitialParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    page: parseInt(params.get('page') || '1', 10),
    search: params.get('search') || '',
    sort: (params.get('sort') || SORT_ORDER.NEWEST_FIRST) as SortOrder,
  };
};

const updateURLParams = (page: number, search: string, sort: SortOrder) => {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', page.toString());
  if (search) params.set('search', search);
  if (sort !== SORT_ORDER.NEWEST_FIRST) params.set('sort', sort);
  
  const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
  window.history.replaceState({}, '', newURL);
};

export const useBlogPosts = (): BlogPostsResult => {
  const initialParams = getInitialParams();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialParams.page);
  const [searchQuery, setSearchQuery] = useState<string>(initialParams.search);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialParams.sort);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const count = await fetchBlogPostsCount(searchQuery);
        setTotalCount(count);
      } catch (err) {
        console.error('Error loading count:', err);
      }
    };

    loadCount();
  }, [searchQuery]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const data = await fetchBlogPosts({ 
          start, 
          limit: POSTS_PER_PAGE,
          ...(searchQuery && { searchQuery }),
          sort: sortOrder,
        });
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage, searchQuery, sortOrder]);

  // Sync URL params whenever state changes
  useEffect(() => {
    updateURLParams(currentPage, searchQuery, sortOrder);
  }, [currentPage, searchQuery, sortOrder]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return {
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
  };
};

