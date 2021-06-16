import { getProductById } from "../api"
import { addMoreToCart } from "../components/cart"
import { showNotification } from "../components/notification"
import { Notification } from "../configs"
import { renderStar } from "./home"

const ELE_WRAPPER_DETAIL = document.querySelector('.main-infor')

const showListImg = listImg => {
  let result = ''
  for (const img of listImg) {
    result += `<img src=${img} alt="details">`
  }
  return result
}

const renderDetailProduct = product => {
  let result = `<div class="row"> 
    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 detail__images">
      <div class="w-full"><img class="main-img" src=${product.img} alt=${product.description}></div>
      <div class="group-img mt-4">${showListImg(product.listImg)}</div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 detail__content">
      <h3 class="fw-6 mt-0 mb-2">${product.name}</h3>
      <div class="rating">
        ${renderStar(product.rating)}
        <i class="color-black">(${product.review} Đánh giá) |   </i><a href="/">Gửi bình luận của bạn</a>
      </div>
      <span class="price fw-6 color-red mt-2">GIÁ: ${product.price.toLocaleString()} Đ</span>
      <hr class="mt-3 mb-3">
      <h5 class="fw-7">Thông tin sản phẩm:</h5>
      <p class="description">${product.description}.</p>
      <hr class="mt-3 mb-3">
      <div class="option-product"> 
        <div class="size"> 
          <label class="fw-7" for="size">Size:</label>
          <select id="size" name="size">
            <option value="X">--Chọn size--  </option>
            <option value="Y">Bự </option>
          </select>
        </div>
        <div class="color-option ml-8"> 
          <label class="fw-7" for="size">Màu sắc:</label>
          <select id="size" name="size">
            <option value="X">--Chọn màu--  </option>
            <option value="Y">Tím tê tái</option>
          </select>
        </div>
      </div>
      <hr class="mt-5 mb-5">
      <div class="choose-quantity"> 
        <input type="number" name="quantity" />
        <a class="click-buy">MUA NGAY</a>
      </div>
      <div class="network mt-8">
        <button class="fb"> 
          <i class="mr-2 fab fa-facebook-square"></i>Like
        </button>
        <div class="counter-number ml-2 pl-4 pr-4">0</div>
        <button class="tweet ml-2"> <i class="fab fa-twitter"></i>Tweet</button>
        <button class="google ml-2"> <i class="fab fa-google-plus-g"></i></button>
        <div class="counter-number ml-2 pl-4 pr-4">0</div>
      </div>
    </div>
  </div>`
  ELE_WRAPPER_DETAIL.innerHTML = result
  document.querySelector('.click-buy').addEventListener('click', handleBuyProduct)
}

const handleBuyProduct = async () => {
  const id = window.location.search.split('=')[1]
  const quantity = await Number(document.querySelector('input[name="quantity"]').value)
  if (id && quantity >= 1) {
    addMoreToCart(id, quantity)
    document.querySelector('input[name="quantity"]').value = ''
  } else showNotification(Notification.QUANTITY_FAIL)
}

const productDetail = async () => {
  if (window.location.pathname !== '/product-detail.html') return
  try {
    ELE_WRAPPER_DETAIL.innerHTML = `<div id="loader"></div>`
    const param = window.location.search.split('=')[1]
    if (param) {
      const product = await getProductById(param)
      renderDetailProduct(product)
    } else throw new Error('Không tìm thấy sản phẩm')
  } catch (error) {
    showNotification(error)
  }
}

export default productDetail