import { removeProductInCart } from "../components/cart";
import { showNotification } from "../components/notification";
import { Notification } from "../configs";

const ELE_CART_TAB_BODY = document.querySelector('table.table-hover > tbody');
const ELE_TOTAL_MONNEY = document.querySelector('span[data-totalmonney]')
const ELE_VAT = document.querySelector('span[data-vat]')
const ELE_MONNEY_PAYMENT = document.querySelector('span[data-totalpayment]')
const ELE_BTN_PAYMENT = document.querySelector('.btn-pay')

const handleDeleteCart = e => {
  const idDelete = e.target.getAttribute('data-deleteId')
  removeProductInCart(idDelete)
  const cart = JSON.parse(localStorage.getItem('cart'))
  renderCartTable(cart)
  renderTotalTable(cart)
}

const handleChangeQuantity = (e) => {
  const { value } = e.target
  if (Number(value) < 1) {
    showNotification(Notification.QUANTITY_FAIL)
    e.target.value = 1
  }
}

const renderCartTable = (cart) => {
  let _result = ""
  cart.forEach((cartItem, index) => {
    _result += `<tr>
      <td>
        <span class="fw-6">${index + 1}</span>
      </td>
      <td class="cart__img">
        <img src=${cartItem.img} alt=${cartItem.name}/>
      </td>
      <td>
        <span class="fw-6">${cartItem.name}</span>
      </td>
      <td>
        <span class="fw-6">${cartItem.price.toLocaleString()} Đ</span>
      </td>
      <td>
        <input type="number" value=${cartItem.quantity} />
      </td>
      <td>
        <span class="fw-6">${(cartItem.price * cartItem.quantity).toLocaleString()} Đ</span>
      </td>
      <td>
        <button class="btn-del" data-deleteId=${cartItem.id}>
          <i class="fas fa-trash-alt" data-deleteId=${cartItem.id}></i>
        </button>
      </td>
    </tr>`
  })
  ELE_CART_TAB_BODY.innerHTML = _result
  document.querySelectorAll('input[type="number"]')?.forEach(input => {
    input.addEventListener('change', handleChangeQuantity)
  })
  const allBtnDel = document.querySelectorAll('button[data-deleteId]')
  allBtnDel.forEach(btn => btn.addEventListener('click', handleDeleteCart))
}

export const renderTotalTable = (cart) => {
  const totalMoney = cart.reduce((total, cart) => {
    return total + cart.price * cart.quantity
  }, 0)
  const vat = totalMoney / 10;
  const totalPayment = totalMoney + vat
  ELE_TOTAL_MONNEY.textContent = totalMoney.toLocaleString()
  ELE_VAT.textContent = vat.toLocaleString()
  ELE_MONNEY_PAYMENT.textContent = totalPayment.toLocaleString()
}

const handleRedirectPayment = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    window.location.href = `${process.env.DEV_ENV}checkout.html`
  } else showNotification(Notification.CART_IS_NULL)
}

const shoppingCart = () => {
  if (window.location.pathname !== "/shopping-cart.html") return
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  renderCartTable(cart)
  renderTotalTable(cart)
  ELE_BTN_PAYMENT.addEventListener('click', handleRedirectPayment)
}

export default shoppingCart;