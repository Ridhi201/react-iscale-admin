import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function ProtectedRoute({ children, roles } ) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (roles && roles.length > 0) {
    const userRole = user?.role || ''
    if (!roles.includes(userRole)) {
      return <Navigate to="/" replace />
    }
  }

  return children
}
