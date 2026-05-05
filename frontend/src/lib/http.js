import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim()
  ? import.meta.env.VITE_API_BASE_URL.trim()
  : ''

export const http = axios.create({
  baseURL: baseURL || '/api',
  withCredentials: true,
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'Request failed'
    return Promise.reject(new Error(message))
  },
)

