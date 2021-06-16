import { showNotification } from './notification';
import { Notification } from '../configs'
import { getProductById } from '../api';

const ELE_NOTIFICATION_CART = document.querySelector('.cart > .cart__notification')
const ELE_CART_BLOCK = document.querySelector('.cart__block > .cart-list')
const CART = JSON.parse(localStorage.getItem('cart')) || []

const renderCartBlock = (cart) => {
  let _result = ''
  for (const cartItem of cart) {
    _result += `<div class="block-item">
      <img class="ml-4" src=${cartItem.img} alt=${cartItem.name}/>
      <div class="block-item__content">
        <p class="name color-black ml-12 mb-0">${cartItem.name} x</p>
        <span class="quantity color-red ml-8 mr-4">SL: ${cartItem.quantity}</span>
      </div>
    </div>`
  }
  ELE_CART_BLOCK.innerHTML = _result
}

ELE_NOTIFICATION_CART.textContent = CART.length
renderCartBlock(CART)

export const addMoreToCart = async (id, quantity) => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const product = await getProductById(id)
    const findProductInCart = cart.findIndex(cart => product.id === cart.id)
    if (findProductInCart !== -1) {
      cart[findProductInCart] = { ...product, quantity: cart[findProductInCart].quantity + quantity }
    } else {
      cart.push({ ...product, quantity: quantity })
    }
    ELE_NOTIFICATION_CART.textContent = cart.length
    renderCartBlock(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
    showNotification(Notification.ADD_TO_CART_SUCCESS)
  } catch (error) {
    showNotification(error)
  }
}

export const addToCart = async (id) => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const product = await getProductById(id)
    const findProductInCart = cart.findIndex(cart => product.id === cart.id)
    if (findProductInCart !== -1) {
      cart[findProductInCart] = { ...product, quantity: cart[findProductInCart].quantity + 1 }
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    ELE_NOTIFICATION_CART.textContent = cart.length
    renderCartBlock(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
    showNotification(Notification.ADD_TO_CART_SUCCESS)
  } catch (error) {
    showNotification(error)
  }
}

export const removeProductInCart = id => {
  try {
    const carts = JSON.parse(localStorage.getItem('cart')) || []
    const indexRemove = carts.findIndex(cartItem => cartItem.id === Number(id))
    carts.splice(indexRemove, 1);
    ELE_NOTIFICATION_CART.textContent = carts.length
    renderCartBlock(carts)
    localStorage.setItem('cart', JSON.stringify(carts))
    showNotification(Notification.REMOVE_CART_SUCCESS)
  } catch (error) {
    showNotification(error)
  }
}