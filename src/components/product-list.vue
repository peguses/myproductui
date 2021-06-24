<template>
 <b-card bg-variant="light">
    <b-row>
      <b-col class="product-label" sm="12">
              Product
      </b-col>
    </b-row>
    <b-row>
       <b-col sm="4">
        <b-form-group>
          <v-select
            @input="getPriceList()"
            v-model="selectedProduct"
            :options="productSelectOptions"
            :searchable="true"
            class="b-form-control"
            outlined/>
        </b-form-group>
        </b-col>
    </b-row>
    <b-row class="mt-4">
        <b-col sm="12">
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :pagination-options="{
                enabled: true,
                 mode: 'pages'
          }"/>
        </b-col>
    </b-row>
 </b-card>
</template>

<script>
import ProductService from '../services/ProductService'
import VSelect from '@alfsnd/vue-bootstrap-select'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

export default {
  name: 'product-list',
  data () {
    return {
      productSelectOptions: [],
      productPriceList: [],
      selectedProduct: null,
      columns: [
        {
          label: 'Unit Count',
          field: 'id'
        },
        {
          label: 'Price',
          field: 'price',
          type: 'number'
        }
      ],
      rows: []
    }
  },
  components: {
    VSelect,
    VueGoodTable
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

    getPriceList () {
      ProductService.getPriceList(this.selectedProduct.value, 50).then(response => {
        this.rows = response.data
        if (response.data && response.data.length !== 0) {
          var rows = []
          response.data.forEach(element => {
            var obj = {
              id: element.unitCount,
              price: parseFloat(element.price).toFixed(2)
            }
            rows.push(obj)
          })
          this.rows = rows
        }
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

<style scoped>
  .v-select {
      outline-style: auto;
      outline-color: darkgray;
    }

  .product-label {
    text-align: initial;
    font-size: small;
    font-weight: 700;
  }
</style>
