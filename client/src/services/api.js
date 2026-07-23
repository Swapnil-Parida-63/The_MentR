import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mentr_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mentr_token');
      localStorage.removeItem('mentr_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const teachersAPI = {
  getAll: (params) => api.get('/teachers', { params }),
  getById: (id) => api.get(`/teachers/${id}`),
  search: (params) => api.get('/teachers/search', { params }),
  getBySlug: (slug) => api.get(`/teachers/slug/${slug}`),
  create: (data) => api.post('/teachers', data),
  apply: (data) => api.post('/teachers/apply', data),
  update: (id, data) => api.patch(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};


export const blogsAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getById: (id) => api.get(`/blogs/${id}`),
  getBySlug: (slug) => api.get(`/blogs/slug/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.patch(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
};

export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  create: (data) => api.post('/gallery', data),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  create: (data) => api.post('/testimonials', data),
};

export const contactAPI = {
  submit: (data) => api.post('/forms/contact', data),
};

export const parentAPI = {
  submit: (data) => api.post('/parent-requirements', data),
  register: (data) => api.post('/parent-registrations', data),
};

export const pricingAPI = {
  submit: (data) => api.post('/pricing-leads', data),
};

export const seoAPI = {
  getLandingPage: (params) => api.get('/seo/landing-page', { params }),
  getSitemapData: () => api.get('/seo/sitemap-data'),
};

export const faqAPI = {
  getAll: (params) => api.get('/faqs', { params }),
};

export const aiAPI = {
  chat: (data) => api.post('/ai/chat', data),
  startBooking: (data) => api.post('/ai/booking/start', data),
  continueBooking: (data) => api.post('/ai/booking/continue', data),
  submitFeedback: (data) => api.post('/ai/feedback', data),
  escalate: (data) => api.post('/ai/escalate', data),
  getHealth: () => api.get('/ai/health'),
};

export default api;
