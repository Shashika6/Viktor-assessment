import { useState, useEffect } from 'react';
import type { BlogPost } from '../types/blog.types';
import { fetchBlogPosts, fetchBlogPostsCount } from '../services/api';

interface UseBlogPostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const POSTS_PER_PAGE = 9;

export const useBlogPosts = (): UseBlogPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const count = await fetchBlogPostsCount();
        setTotalCount(count);
      } catch (err) {
        console.error('Error loading count:', err);
      }
    };

    loadCount();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const data = await fetchBlogPosts({ start, limit: POSTS_PER_PAGE });
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};

