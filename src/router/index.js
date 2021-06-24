import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/product-list'
import HomeView from '@/components/home-view'
import CalculatorView from '@/components/calculator-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/products',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/calculator',
      name: 'CalculatorView',
      component: CalculatorView
    }
  ]
})
