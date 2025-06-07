import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';

class ApiClient {
  private client: AxiosInstance;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.SPORTRADAR.BASE_URL,
      timeout: API_CONFIG.REQUEST_TIMEOUT,
      params: {
        api_key: API_CONFIG.SPORTRADAR.API_KEY
      }
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  private getCacheKey(url: string, params?: any): string {
    return `${url}_${JSON.stringify(params || {})}`;
  }

  private isValidCache(timestamp: number): boolean {
    return Date.now() - timestamp < API_CONFIG.CACHE_DURATION;
  }

  private async makeRequest<T>(
    config: AxiosRequestConfig,
    useCache: boolean = true
  ): Promise<T> {
    const cacheKey = this.getCacheKey(config.url || '', config.params);
    
    // Check cache first
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (this.isValidCache(cached.timestamp)) {
        console.log(`Cache hit for: ${cacheKey}`);
        return cached.data;
      }
    }

    // Make API request with retry logic
    let lastError: any;
    for (let attempt = 1; attempt <= API_CONFIG.MAX_RETRIES; attempt++) {
      try {
        const response: AxiosResponse<T> = await this.client.request(config);
        
        // Cache the response
        if (useCache) {
          this.cache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now()
          });
        }
        
        return response.data;
      } catch (error) {
        lastError = error;
        if (attempt < API_CONFIG.MAX_RETRIES) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`Retry attempt ${attempt} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }

  async get<T>(url: string, params?: any, useCache: boolean = true): Promise<T> {
    return this.makeRequest<T>({ method: 'GET', url, params }, useCache);
  }

  clearCache(): void {
    this.cache.clear();
  }

  clearExpiredCache(): void {
    for (const [key, value] of this.cache.entries()) {
      if (!this.isValidCache(value.timestamp)) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiClient = new ApiClient();