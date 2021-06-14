import axios from 'axios'
import { APILink } from '../configs'

export const getProducts = async (payload) => {
  const { data } = await axios.get(APILink.API_PRODUCTS, {
    params: { ...payload }
  })
  return data
}

export const getProductById = async (id) => {
  const { data } = await axios.get(`${APILink.API_PRODUCTS}/${id}`)
  return data
}

export const createBill = async (payload) => {
  const { data } = await axios.post(`${APILink.API_BILL_PAYMENT}`, payload)
  return data
}