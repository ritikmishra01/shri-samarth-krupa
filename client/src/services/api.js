import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ─── Axios Instance ──────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// ─── Request Interceptor ─────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ssk-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response Interceptor ────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ssk-token')
      localStorage.removeItem('ssk-user')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

// ─────────────────────────────────────────
//  API Service
// ─────────────────────────────────────────
export const apiService = {
  // ── Auth ──────────────────────────────
  auth: {
    login:  (data) => api.post('/auth/login', data),
    logout: ()     => api.post('/auth/logout'),
    getMe:  ()     => api.get('/auth/me'),
  },

  // ── Appointments ──────────────────────
  appointments: {
    getAll:       (params) => api.get('/appointments', { params }),
    getById:      (id)     => api.get(`/appointments/${id}`),
    create:       (data)   => api.post('/appointments', data),
    update:       (id, d)  => api.put(`/appointments/${id}`, d),
    delete:       (id)     => api.delete(`/appointments/${id}`),
    updateStatus: (id, s)  => api.patch(`/appointments/${id}/status`, { status: s }),
  },

  // ── Tests ─────────────────────────────
  tests: {
    getAll:  (params) => api.get('/tests', { params }),
    getById: (id)     => api.get(`/tests/${id}`),
    create:  (data)   => api.post('/tests', data),
    update:  (id, d)  => api.put(`/tests/${id}`, d),
    delete:  (id)     => api.delete(`/tests/${id}`),
  },

  // ── Packages ──────────────────────────
  packages: {
    getAll:  (params) => api.get('/packages', { params }),
    create:  (data)   => api.post('/packages', data),
    update:  (id, d)  => api.put(`/packages/${id}`, d),
    delete:  (id)     => api.delete(`/packages/${id}`),
  },

  // ── Gallery ───────────────────────────
  gallery: {
    getAll:  (params) => api.get('/gallery', { params }),
    upload:  (data)   => api.post('/gallery', data, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                          }),
    delete:  (id)     => api.delete(`/gallery/${id}`),
  },

  // ── Testimonials ──────────────────────
  testimonials: {
    getAll:       (params) => api.get('/testimonials', { params }),
    create:       (data)   => api.post('/testimonials', data),
    updateStatus: (id, s)  => api.patch(`/testimonials/${id}/status`, { status: s }),
    delete:       (id)     => api.delete(`/testimonials/${id}`),
  },

  // ── FAQs ──────────────────────────────
  faqs: {
    getAll:  (params) => api.get('/faqs', { params }),
    create:  (data)   => api.post('/faqs', data),
    update:  (id, d)  => api.put(`/faqs/${id}`, d),
    delete:  (id)     => api.delete(`/faqs/${id}`),
  },

  // ── Offers ────────────────────────────
  offers: {
    getAll:  (params) => api.get('/offers', { params }),
    create:  (data)   => api.post('/offers', data),
    update:  (id, d)  => api.put(`/offers/${id}`, d),
    delete:  (id)     => api.delete(`/offers/${id}`),
  },

  // ── Contact ───────────────────────────
  contact: {
    send:     (data) => api.post('/contact', data),
    getAll:   (p)    => api.get('/contact', { params: p }),
    markRead: (id)   => api.patch(`/contact/${id}/read`),
    delete:   (id)   => api.delete(`/contact/${id}`),
  },

  // ── Settings ──────────────────────────
  settings: {
    getAll:    ()     => api.get('/settings'),
    updateMany: (d)   => api.put('/settings', d),
  },
}

export default api
