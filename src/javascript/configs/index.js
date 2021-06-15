export const APILink = {
  API_PRODUCTS: `${process.env.BASE_BE}product`,
  API_BILL_PAYMENT: `${process.env.BASE_BE}billPayment`
}

export const Notification = {
  ADD_TO_CART_SUCCESS: "Thêm vào giỏ hàng thành công",
  REMOVE_CART_SUCCESS: "Đã xóa sản phẩm trong giỏ hàng",
  CART_IS_NULL: 'Không có hàng trong giỏ  !!!!!',
  VALIDATE_FAIL: 'Vui lòng nhập đúng thông tin !',
  QUANTITY_FAIL: 'Sai thông tin số lượng !'
}

export const Validate = {
  require: {
    phone: "Phone is required!",
    fullName: "Fullname is required!",
    email: "Email is required!",
    address: "Address is required!"
  },
  invalid: {
    phone: "Phone is invalid",
    email: "Email is invalid"
  }
}