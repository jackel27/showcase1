<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Products</h1>

    <!-- Display products -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">${{ product.price }}</p>
            <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add product button -->
    <button type="button" class="btn btn-primary" @click="openModal">Add Product</button>

    <!-- Add product modal -->
    <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- modal body -->
          <div class="modal-body">
            <h5>Add a new product</h5>
            <form @submit.prevent="addProduct">
              <div class="form-group">
                <label for="newProductName">Name:</label>
                <input id="newProductName" v-model="newProductName" class="form-control">
              </div>
              <div class="form-group">
                <label for="newProductPrice">Price:</label>
                <input id="newProductPrice" v-model="newProductPrice" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary">Add product</button>
            </form>
          </div>
          <!-- modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from '@/DataService.js'
import { Modal } from 'bootstrap'

export default {
  data () {
    return {
      products: null,
      newProductName: '',
      newProductPrice: '',
      modal: null // null only for storing modal instance
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    openModal () {
      const modalElement = document.getElementById('addProductModal')
      this.modal = new Modal(modalElement)
      this.modal.show()
    },
    async getProducts () {
      const response = await DataService.getProducts()
      this.products = response.data
    },
    async addProduct () {
      const newProduct = {
        name: this.newProductName,
        price: this.newProductPrice
      }
      await DataService.createProduct(newProduct)
      this.getProducts()
      this.newProductName = ''
      this.newProductPrice = ''
      this.modal.hide()
    },
    async deleteProduct (id) {
      await DataService.deleteProduct(id)
      this.getProducts()
    }
  }
}
</script>
