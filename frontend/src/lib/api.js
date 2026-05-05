import { http } from './http.js'
import { mockOrders, mockProducts, mockRetailers } from './mockData.js'

const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS || 'true').toLowerCase() === 'true'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export const api = {
  auth: {
    async signIn({ email, password }) {
      if (USE_MOCKS) {
        await sleep(250)
        if (!email || !password) throw new Error('Email and password are required')
        return { token: 'mock-token', user: { email, role: 'ADMIN' } }
      }
      const { data } = await http.post('/auth/login', { email, password })
      return data
    },
    async registerRetailer({ fullName, businessName, gstNumber }) {
      if (USE_MOCKS) {
        await sleep(350)
        if (!fullName || !businessName || !gstNumber) throw new Error('All fields are required')
        return { status: 'PENDING', etaHours: '24–48' }
      }
      const { data } = await http.post('/retailers/apply', { fullName, businessName, gstNumber })
      return data
    },
  },

  products: {
    async list() {
      if (USE_MOCKS) {
        await sleep(200)
        return mockProducts
      }
      const { data } = await http.get('/products')
      return data
    },
    async create(payload) {
      if (USE_MOCKS) {
        await sleep(250)
        return { ...payload, id: payload?.sku || `SKU-${Date.now()}` }
      }
      const { data } = await http.post('/products', payload)
      return data
    },
  },

  retailers: {
    async list() {
      if (USE_MOCKS) {
        await sleep(200)
        return mockRetailers
      }
      const { data } = await http.get('/retailers')
      return data
    },
    async approve(id) {
      if (USE_MOCKS) {
        await sleep(250)
        return { id, status: 'APPROVED' }
      }
      const { data } = await http.post(`/retailers/${id}/approve`)
      return data
    },
    async reject(id) {
      if (USE_MOCKS) {
        await sleep(250)
        return { id, status: 'REJECTED' }
      }
      const { data } = await http.post(`/retailers/${id}/reject`)
      return data
    },
    async setCreditLimit(id, creditLimit) {
      if (USE_MOCKS) {
        await sleep(250)
        return { id, creditLimit }
      }
      const { data } = await http.put(`/retailers/${id}/credit-limit`, { creditLimit })
      return data
    },
  },

  orders: {
    async list() {
      if (USE_MOCKS) {
        await sleep(200)
        return mockOrders
      }
      const { data } = await http.get('/orders')
      return data
    },
    async placeOrder(payload) {
      if (USE_MOCKS) {
        await sleep(400)
        return { invoiceId: `INV-${Math.floor(100000 + Math.random() * 900000)}`, ...payload }
      }
      const { data } = await http.post('/orders', payload)
      return data
    },
  },
}

