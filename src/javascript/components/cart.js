import { showNotification } from './notification';
import { Notification } from '../configs'
import { getProductById } from '../api';

const ELE_NOTIFICATION_CART = document.querySelector('.cart > .cart__notification')

export const addToCart = async (id) => {
  try {
    let cart = localStorage.getItem('cart')
    const product = await getProductById(id)
    console.log(product, ELE_NOTIFICATION_CART);
    showNotification(Notification.ADD_TO_CART_SUCCESS)
  } catch (error) {
    showNotification(error)
  }
}