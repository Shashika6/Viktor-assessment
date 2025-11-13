import axios from 'axios';
import { config } from '../config/env';
import type { BlogPost, SortOrder } from '../types/blog.types';

const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface FetchBlogPostsParams {
  start?: number;
  limit?: number;
  searchQuery?: string;
  sort?: SortOrder;
}

export const fetchBlogPosts = async (params?: FetchBlogPostsParams): Promise<BlogPost[]> => {
  try {
    const queryParams: Record<string, string | number> = {
      _start: params?.start || 0,
      _limit: params?.limit || 9,
    };

    if (params?.searchQuery) {
      queryParams.title_contains = params.searchQuery;
    }

    if (params?.sort) {
      queryParams._sort = params.sort;
    }

    const response = await apiClient.get<BlogPost[]>('', {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

export const fetchBlogPostsCount = async (searchQuery?: string): Promise<number> => {
  try {
    const params = searchQuery ? { title_contains: searchQuery } : {};
    const response = await apiClient.get<number>('/count', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts count:', error);
    throw error;
  }
};

