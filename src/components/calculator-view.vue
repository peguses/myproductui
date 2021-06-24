<template>
  <b-card bg-variant="light" body-class="text-center" align-v="center">
    <b-card
        bg-variant="light"
        body-class="text-center"
        align-v="center"
        style="max-width: 50rem;"
        align="center">
         <b-row class="mt-2">
          <b-col class="product-label" sm="12">
              Product
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-group >
                <v-select
                    v-model="selectedProduct"
                    :options="productSelectOptions"
                    :searchable="true"
                    dense
                    outlined/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-4" >
          <b-col sm="12">
            <div class="btn-group float-left">
              <input v-model="cartonOrUnit" type="radio" class="btn-check" name="options" id="carton" autocomplete="off" value="CARTON" checked/>
              <label class="btn btn-secondary" for="carton">Carton</label>
              <input v-model="cartonOrUnit" type="radio" class="btn-check" name="options" id="unit" autocomplete="off" value="UNIT"/>
              <label class="btn btn-secondary" for="unit">Unit</label>
            </div>
          </b-col>
        </b-row>
         <b-row>
          <b-col class="count-label mt-4" sm="12" >
              Count
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
           <b-form-group>
              <b-form-input placeholder="Count" :state="validateCount" v-model="count" id="count"></b-form-input>
                <b-form-invalid-feedback  class="error-message" id="count">
                    Numeric value only
                </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
         <b-row class="my-1 mt-4">
          <b-col sm="4">
            <b-form-group>
               <div class="price-text">Price</div>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group>
               <div v-if="calculatedPrice" class="price-text">${{calculatedPrice}} </div>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group class="calculate-btn">
                <b-button @click="calculatePrice">Calculate</b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
  </b-card>
</template>

<script>
import ProductService from '../services/ProductService'
import VSelect from '@alfsnd/vue-bootstrap-select'
export default {
  name: 'calculator-view',
  data () {
    return {
      productSelectOptions: [],
      selectedProduct: null,
      cartonOrUnit: 'CARTON',
      count: 1,
      calculatedPrice: null
    }
  },
  computed: {
    validateCount () {
      if (!isNaN(this.count) && this.count) {
        return true
      }
      return false
    }
  },
  components: {
    VSelect
  },
  methods: {
    getProducts () {
      ProductService.getAll()
        .then(response => {
          this.products = response.data
          var productSelectOptions = []
          if (response.data && response.data.length !== 0) {
            response.data.forEach(element => {
              var obj = {
                value: element.productId,
                text: element.productName
              }
              productSelectOptions.push(obj)
            })
            this.productSelectOptions = productSelectOptions
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    calculatePrice () {
      ProductService.getPrice(this.selectedProduct.value, this.cartonOrUnit, this.count).then(response => {
        this.calculatedPrice = parseFloat(response.data.price).toFixed(2)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style>
  .v-select {
    outline-style: auto;
    outline-color: darkgray;
  }

  .btn-group {
    float: left;
  }

  .calculate-btn {
    float: right;
  }

  .price-text {
    font-size: x-large;
    font-weight: bold;
    float: left;
  }

  .product-label, .count-label, .error-message {
    text-align: initial;
    font-size: small;
    font-weight: 700;
  }
</style>
