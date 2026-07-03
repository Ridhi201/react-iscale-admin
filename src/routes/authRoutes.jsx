import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Logout from '../pages/auth/Logout'

const authRoutes = {
  public: [
    <Route key="login" path="/login" element={<Login />} />
  ],
  protected: [
    <Route key="logout" path="/logout" element={<Logout />} />
  ]
}

export default authRoutes
