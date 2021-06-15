import { createBill } from "../api"
import { showNotification } from "../components/notification"
import { Notification, Validate } from "../configs"
import { renderTotalTable } from "./shoppingCart"

const ELE_CUSTOMER_FORM = document.querySelector('.customer-form')
const ELE_INPUT_USERNAME = document.querySelector('#username')
const ELE_INPUT_EMAIL = document.querySelector('#email')
const ELE_INPUT_ADDRESS = document.querySelector('#address')
const ELE_INPUT_PHONE = document.querySelector('#phone')
const ELE_VALIDATE_USERNAME = document.querySelector('#validate-username')
const ELE_VALIDATE_EMAIL = document.querySelector('#validate-email')
const ELE_VALIDATE_ADDRESS = document.querySelector('#validate-address')
const ELE_VALIDATE_PHONE = document.querySelector('#validate-phone')

const validatePhoneNumber = () => {
  const validate = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  if (ELE_INPUT_PHONE.value.match(validate)) {
    ELE_VALIDATE_PHONE.textContent = ''
    return true
  }
  ELE_VALIDATE_PHONE.textContent = Validate.invalid.phone
  return false
}

const validateEmail = () => {
  const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (ELE_INPUT_EMAIL.value.match(validate)) {
    ELE_VALIDATE_EMAIL.textContent = ''
    return true
  }
  ELE_VALIDATE_EMAIL.textContent = Validate.invalid.email
  return false
}

const validateForm = () => {
  const formValue = {
    username: ELE_INPUT_USERNAME.value,
    email: ELE_INPUT_EMAIL.value,
    address: ELE_INPUT_ADDRESS.value,
    phone: ELE_INPUT_PHONE.value
  }
  if (!formValue.username || !formValue.email || !formValue.address || !formValue.phone) {
    if (!formValue.username) {
      ELE_VALIDATE_USERNAME.textContent = Validate.require.fullName
    } else ELE_VALIDATE_USERNAME.textContent = ''
    if (!formValue.email) {
      ELE_VALIDATE_EMAIL.textContent = Validate.require.email
    } else ELE_VALIDATE_EMAIL.textContent = ''
    if (!formValue.address) {
      ELE_VALIDATE_ADDRESS.textContent = Validate.require.address
    } else ELE_VALIDATE_ADDRESS.textContent = ''
    if (!formValue.phone) {
      ELE_VALIDATE_PHONE.textContent = Validate.require.phone
    } else ELE_VALIDATE_PHONE.textContent = ''
    return false
  }
  ELE_VALIDATE_USERNAME.textContent = ''
  ELE_VALIDATE_EMAIL.textContent = ''
  ELE_VALIDATE_ADDRESS.textContent = ''
  ELE_VALIDATE_PHONE.textContent = ''
  if (!validatePhoneNumber() || !validateEmail()) {
    return false
  }
  return true
}

const handleSubmit = async (e) => {
  e.preventDefault()
  if (validateForm()) {
    try {
      const cart = JSON.parse(localStorage.getItem('cart'))
      const totalMoney = cart.reduce((total, cart) => {
        return total + cart.price * cart.quantity
      }, 0)
      const vat = totalMoney / 10;
      const totalPayment = totalMoney + vat
      const payload = {
        fullName: ELE_INPUT_USERNAME.value,
        email: ELE_INPUT_EMAIL.value,
        address: ELE_INPUT_ADDRESS.value,
        phone: ELE_INPUT_PHONE.value,
        cart: cart,
        totalPayment: totalPayment
      }
      const bill = await createBill(payload)
      if (bill) {
        localStorage.removeItem('cart')
        window.location.href = `${process.env.DEV_ENV}complete-purchase.html`;
        return
      } else throw new Error('Network fail')
    } catch (error) {
      showNotification(error)
      return
    }
  }
  showNotification(Notification.VALIDATE_FAIL)
}

const checkout = () => {
  if (window.location.pathname !== '/checkout.html') return
  const cart = JSON.parse(localStorage.getItem('cart'))
  renderTotalTable(cart)
  ELE_INPUT_PHONE.addEventListener('change', validatePhoneNumber)
  ELE_INPUT_EMAIL.addEventListener('change', validateEmail)
  ELE_CUSTOMER_FORM.addEventListener('submit', handleSubmit)
}

export default checkout