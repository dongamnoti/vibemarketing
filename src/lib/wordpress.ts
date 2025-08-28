// WordPress Headless CMS API 集成

// 定义 WordPress API 响应类型
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  _links: any;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: any;
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: any;
  };
  source_url: string;
  _links: any;
}

// WordPress API 配置
const WORDPRESS_API_URL = import.meta.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

// API 请求工具函数
class WordPressAPI {
  private baseUrl: string;

  constructor(baseUrl: string = WORDPRESS_API_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('WordPress API fetch error:', error);
      throw error;
    }
  }

  // 获取文章列表
  async getPosts(params: {
    page?: number;
    per_page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
    orderby?: 'date' | 'title' | 'menu_order';
    order?: 'asc' | 'desc';
  } = {}): Promise<WordPressPost[]> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const endpoint = `/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await this.fetchAPI(endpoint);
  }

  // 获取单篇文章
  async getPost(id: number): Promise<WordPressPost> {
    return await this.fetchAPI(`/posts/${id}`);
  }

  // 根据 slug 获取文章
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const posts = await this.fetchAPI(`/posts?slug=${slug}`);
    return posts.length > 0 ? posts[0] : null;
  }

  // 获取分类列表
  async getCategories(params: {
    page?: number;
    per_page?: number;
    hide_empty?: boolean;
  } = {}): Promise<WordPressCategory[]> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const endpoint = `/categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await this.fetchAPI(endpoint);
  }

  // 获取媒体文件
  async getMedia(id: number): Promise<WordPressMedia> {
    return await this.fetchAPI(`/media/${id}`);
  }

  // 搜索文章
  async searchPosts(query: string, params: {
    page?: number;
    per_page?: number;
  } = {}): Promise<WordPressPost[]> {
    return await this.getPosts({
      search: query,
      ...params,
    });
  }
}

// 导出 API 实例
export const wordpressAPI = new WordPressAPI();

// 工具函数：格式化日期
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 工具函数：提取纯文本内容
export function extractTextContent(htmlContent: string): string {
  // 简单的 HTML 标签移除（在服务端环境中）
  return htmlContent.replace(/<[^>]*>/g, '').trim();
}

// 工具函数：生成摘要
export function generateExcerpt(content: string, maxLength: number = 150): string {
  const textContent = extractTextContent(content);
  if (textContent.length <= maxLength) {
    return textContent;
  }
  return textContent.substring(0, maxLength).trim() + '...';
}

// 工具函数：获取特色图片 URL
export async function getFeaturedImageUrl(mediaId: number): Promise<string | null> {
  if (!mediaId) return null;
  
  try {
    const media = await wordpressAPI.getMedia(mediaId);
    return media.source_url;
  } catch (error) {
    console.error('Error fetching featured image:', error);
    return null;
  }
}