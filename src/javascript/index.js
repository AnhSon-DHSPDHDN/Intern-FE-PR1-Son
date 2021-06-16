import checkout from './pages/checkout'
import homePage from './pages/home'
import productPage from './pages/product'
import productDetail from './pages/productDetail'
import shoppingCart from './pages/shoppingCart'

async function main() {
  homePage()
  productPage()
  shoppingCart()
  checkout()
  productDetail()
}

main()
