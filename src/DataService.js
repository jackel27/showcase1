// DataService.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // API server
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json'
  }
})

export default {
  getProducts () {
    return apiClient.get('/products')
  },
  createProduct (newProduct) {
    return apiClient.post('/products', newProduct)
  },
  updateProduct (id, updatedProduct) {
    return apiClient.put(`/products/${id}`, updatedProduct)
  },
  deleteProduct (id) {
    return apiClient.delete(`/products/${id}`)
  }
}
