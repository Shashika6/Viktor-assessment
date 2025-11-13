import { describe, it, expect, vi, beforeEach } from 'vitest';
import mockBlogData from './__mocks__/mockBlogData.json';
import { SORT_ORDER } from '../types/blog.types';
import { fetchBlogPosts, fetchBlogPostsCount } from './api';

const mockGet = vi.hoisted(() => vi.fn());

vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: mockGet,
    }),
  },
}));

describe('Blog API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchBlogPosts', () => {
    it('should fetch blog posts successfully', async () => {
      mockGet.mockResolvedValue({ data: mockBlogData });

      const result = await fetchBlogPosts({ start: 0, limit: 9 });

      expect(result).toEqual(mockBlogData);
      expect(mockGet).toHaveBeenCalledWith('', {
        params: {
          _start: 0,
          _limit: 9,
        },
      });
    });

    it('should include search query in params when provided', async () => {
      mockGet.mockResolvedValue({ data: mockBlogData });

      await fetchBlogPosts({ start: 0, limit: 9, searchQuery: 'machine learning' });

      expect(mockGet).toHaveBeenCalledWith('', {
        params: {
          _start: 0,
          _limit: 9,
          title_contains: 'machine learning',
        },
      });
    });

    it('should include sort order in params when provided', async () => {
      mockGet.mockResolvedValue({ data: mockBlogData });

      await fetchBlogPosts({ 
        start: 0, 
        limit: 9, 
        sort: SORT_ORDER.NEWEST_FIRST,
      });

      expect(mockGet).toHaveBeenCalledWith('', {
        params: {
          _start: 0,
          _limit: 9,
          _sort: SORT_ORDER.NEWEST_FIRST,
        },
      });
    });
  });

  describe('fetchBlogPostsCount', () => {
    it('should fetch blog posts count successfully', async () => {
      mockGet.mockResolvedValue({ data: 42 });

      const result = await fetchBlogPostsCount();

      expect(result).toBe(42);
      expect(mockGet).toHaveBeenCalledWith('/count', { params: {} });
    });

    it('should include search query when provided', async () => {
      mockGet.mockResolvedValue({ data: 10 });

      const result = await fetchBlogPostsCount('web performance');

      expect(result).toBe(10);
      expect(mockGet).toHaveBeenCalledWith('/count', {
        params: { title_contains: 'web performance' },
      });
    });
  });
});
