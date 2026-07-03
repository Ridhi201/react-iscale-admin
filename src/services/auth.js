const BASE_URL = 'https://api.theiscale.com'

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/myadmin/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Login failed')
  }

  return data
}

export const registerUser = async ({
  name,
  email,
  password,
  phone,
  role = 1,
}) => {
  const response = await fetch(`${BASE_URL}/myadmin/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      admin_name: name,
      email,
      password,
      phone,
      role,
    }),
  })

  const data = await response.json()

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Registration failed')
  }

  return data
}