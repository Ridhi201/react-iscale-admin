import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  loginAdmin,
  registerAdmin,
} from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  const [isAuthenticated, setIsAuthenticated] =
    useState(!!localStorage.getItem('token'))

  useEffect(() => {
    const savedUser =
      localStorage.getItem('user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // LOGIN
  const login = async ({ email, password }) => {
    try {
      const result = await loginAdmin({
        email,
        password,
      })

      // REMOVE OLD DATA
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('adminData')

      // SAVE NEW TOKEN
      localStorage.setItem('token', result.token)

      // SAVE USER DATA
      localStorage.setItem('adminData', JSON.stringify(result))

      console.log("NEW TOKEN SAVED")
      console.log(result.token)

      localStorage.setItem(
        'user',
        JSON.stringify(result)
      )

      setToken(result.token)
      setUser(result)
      setIsAuthenticated(true)

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  // REGISTER
  const register = async (data) => {
    const result = await registerAdmin(data)

    return result
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setToken('')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>
  useContext(AuthContext)