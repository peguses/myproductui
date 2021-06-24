import http from '../http-common'

class ProductService {
  getAll () {
    return http.get(`/products`)
  }

  getPriceList (id, limit) {
    return http.get(`/products/${id}/list/${limit}`)
  }

  getPrice (id, type, count) {
    return http.get(`/products/${id}/price?type=${type}&count=${count}`)
  }
}

export default new ProductService()
