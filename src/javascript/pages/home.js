import { getProducts } from '../api';
import { addToCart } from '../components/cart';
import { showNotification } from '../components/notification'

const ELE_LIST_PRODUCT = document.querySelector(`#listProductHome`)
const ELE_LIST_PRODUCT_NEW = document.querySelector('#productNew')
const ELE_LIST_PRODUCT_SALE = document.querySelector('.selling-product')
const ELE_HOT_PRODUCT = document.querySelector('#hot-product')
const ELE_LI_SIDE_BAR = document.querySelectorAll('#side-bar__container-homepage > ul > li')

export const renderStar = (star) => {
  let _result = '';
  let i = 1;
  while (i <= 5) {
    if (i <= star) {
      _result += `<i class="fas fa-star"></i>`
    } else {
      _result += `<i class="far fa-star"></i>`
    }
    i++;
  }
  return _result;
}

const renderProduct = (products) => {
  let result = '';
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
    </div>
    `
  });
  ELE_LIST_PRODUCT.innerHTML = result
}

const renderProductNew = (products) => {
  let result = '';
  products.forEach(product => {
    result += `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
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
    </div>
    `
  });
  ELE_LIST_PRODUCT_NEW.innerHTML = result
}

const renderProductSale = products => {
  let result = '';
  products.forEach(product => {
    result += `<div class="card-grid">
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
    `
  });
  ELE_LIST_PRODUCT_SALE.innerHTML = result
}

const renderHotProduct = products => {
  let result = '';
  products.forEach(product => {
    result += `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <div class="card-list">
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
      </div>
    </div>`
  })
  ELE_HOT_PRODUCT.innerHTML = result
}

export const addEventClickBuy = elements => {
  elements.forEach(element => {
    element.addEventListener('click', (e) => handleClickBuy(e))
  });
}

export const handleClickBuy = (event) => {
  const id = Number(event.target.getAttribute('data-id'))
  addToCart(id)
}

const addEventClickSideBar = elements => {
  elements.forEach(element => {
    element.addEventListener('click', (e) => {
      const categories = e.target.getAttribute('data-categories')
      window.location.href = `${process.env.DEV_ENV}product.html?categories=${categories}`
    })
  })
}

const homePage = async () => {
  if (window.location.pathname !== '/') return;
  const payload = {
    _limit: 6
  }
  let products = []
  try {
    products = await getProducts(payload)
    renderProduct(products)
    renderProductNew(products.slice(0, 3))
    renderProductSale(products.slice(0, 5))
    renderHotProduct(products.slice(0, 4))

    const allBtnBuy = document.querySelectorAll('a[data-id]')
    addEventClickBuy(allBtnBuy)
    addEventClickSideBar(ELE_LI_SIDE_BAR)
  } catch (error) {
    showNotification(error)
  }
}

export default homePage;