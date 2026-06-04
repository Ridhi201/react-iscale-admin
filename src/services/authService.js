import axios from 'axios'
import { BASE_URL as API_BASE } from '../config/api'

const BASE_URL = `${API_BASE}/myadmin/auth`

// REGISTER API
export const registerAdmin = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      admin_name: data.admin_name,
      email: data.email,
      password: data.password,
      phone: Number(data.phone),
      role: 1,
    })

    console.log("REGISTER RESPONSE")
    console.log(response.data)

    if (!response.data.status) {
      throw new Error(response.data.message || 'Registration failed')
    }

    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Registration failed'
    )
  }
}

// LOGIN API
export const loginAdmin = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: data.email,
      password: data.password,
    })

    console.log("LOGIN RESPONSE")
    console.log(response.data)

    if (!response.data.status) {
      throw new Error(response.data.message || 'Login failed')
    }

    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Login failed'
    )
  }
}