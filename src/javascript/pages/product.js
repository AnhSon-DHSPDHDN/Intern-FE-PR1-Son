import { getProducts } from '../api'
import { showNotification } from '../components/notification'
import { addEventClickBuy, renderStar } from './home'

const ELE_NUMBER_PRODUCT_IN_PAGE = document.querySelector('#show-product')
const ELE_SORT_PRODUCT = document.querySelector('#sort-product')
const ELE_CHECK_SHOW_PRODUCT = document.querySelector('#check-show')
const ELE_CHECK_SHOW_LIST = document.querySelector('#check-show-list')
const ELE_CHECK_SHOW_GRID = document.querySelector('#check-show-grid')
const ELE_PRODUCT_LIST = document.querySelector('.product-list')
const ELE_PRODUCT_GRID = document.querySelector('.product-grid')
const ELE_LI_SIDE_BAR_CATEGORIES = document.querySelectorAll('#side-bar__container > li[data-categories]')

const renderProduct = (products) => {
  let result = ''
  if (ELE_CHECK_SHOW_PRODUCT.checked) {
    products.forEach(product => {
      result += `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div class="card-grid">
          <div class="card-grid__hover">
            <a class="bg-yellow" data-id=${product.id}>MUA NGAY</a>
            <a class="bg-black" href="/product-detail.html">XEM CHI TIẾT</a>
          </div>
          <img src=${product.img} alt=${product.description}/>
          <span class="price fw-6">${product.price.toLocaleString()} Đ</span>
          <h5 class="fw-6">${product.name}</h5>
          <div class="rating">
            ${renderStar(product.rating)}
            <i class="des">(${product.review} Đánh giá)</i>
          </div>
        </div>  
      </div>`
      ELE_PRODUCT_GRID.innerHTML = result
    })
  } else {
    products.forEach(product => {
      result += `<div class="card-list mb-8">
        <div class="card-list__img">
          <img src=${product.img} alt=${product.description}/>
        </div>
        <div class="card-list__content">
          <h5 class="fw-6">${product.name}</h5>
          <div class="rating">
            ${renderStar(product.rating)}
            <i class="des">(${product.review} Đánh giá)</i>
          </div>
          <p class="des-product">${product.description}</p>
          <span class="price fw-6">${product.price.toLocaleString()} Đ</span>
          <div class="card-list__btn">
            <a class="bg-yellow" data-id=${product.id}>MUA NGAY</a>
            <a class="bg-black" href="/product-detail.html">XEM CHI TIẾT</a>
          </div>
        </div>
      </div>`
    })
    ELE_PRODUCT_LIST.innerHTML = result
  }
  const allBtnBuy = document.querySelectorAll('a[data-id]')
  addEventClickBuy(allBtnBuy)
}

const handleClickCategories = async (products, payload, event) => {
  ELE_PRODUCT_LIST.innerHTML = `<div id="loader"></div>`
  const searchCategories = event.target.getAttribute('data-categories')
  const listValueSideBarCategories = []
  ELE_LI_SIDE_BAR_CATEGORIES.forEach(element => {
    element.classList.remove('active')
    listValueSideBarCategories.push(element.getAttribute('data-categories'))
  })
  const indexActive = listValueSideBarCategories.findIndex(value => value === searchCategories)
  products = await getProducts({ ...payload, categories: searchCategories })
  renderProduct(products)
  ELE_LI_SIDE_BAR_CATEGORIES[indexActive].classList.add('active')
}

const productPage = async () => {
  if (window.location.pathname !== '/product.html') return

  let products = []
  let productInPage = ELE_NUMBER_PRODUCT_IN_PAGE.value
  let sortBy = ELE_SORT_PRODUCT.value
  const payload = {
    _page: 1,
    _limit: productInPage,
    _sort: sortBy
  }
  try {
    ELE_PRODUCT_LIST.innerHTML = `<div id="loader"></div>`
    ELE_LI_SIDE_BAR_CATEGORIES.forEach(liElement => {
      liElement.addEventListener('click', (event) => handleClickCategories(products, payload, event))
    })
    const allProducts = await getProducts()

    const searchCategories = window.location.search?.split('=')[1];
    if (searchCategories) {
      products = await getProducts({ ...payload, categories: searchCategories })
    } else {
      products = await getProducts({ ...payload })
    }
    renderProduct(products)
    ELE_CHECK_SHOW_GRID.addEventListener('click', () => {
      ELE_CHECK_SHOW_PRODUCT.checked = true
      renderProduct(products)
    })
    ELE_CHECK_SHOW_LIST.addEventListener('click', () => {
      ELE_CHECK_SHOW_PRODUCT.checked = false
      renderProduct(products)
    })
  } catch (error) {
    showNotification(error)
  }
}

export default productPage