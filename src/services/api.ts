import axios from 'axios';
import { config } from '../config/env';
import type { BlogPost } from '../types/blog.types';

const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface FetchBlogPostsParams {
  start?: number;
  limit?: number;
}

export const fetchBlogPosts = async (params?: FetchBlogPostsParams): Promise<BlogPost[]> => {
  try {
    const response = await apiClient.get<BlogPost[]>('', {
      params: {
        _start: params?.start || 0,
        _limit: params?.limit || 9,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

export const fetchBlogPostsCount = async (): Promise<number> => {
  try {
    const response = await apiClient.get<BlogPost[]>('');
    return response.data.length;
  } catch (error) {
    console.error('Error fetching blog posts count:', error);
    throw error;
  }
};

