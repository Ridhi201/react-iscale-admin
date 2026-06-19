import { ThemeProvider } from './store/ThemeContext'
import { AuthProvider } from './store/AuthContext'
import AppRoutes from './routes/AppRoutes'
import CustomPopup from './components/common/CustomPopup'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
        <CustomPopup />
      </AuthProvider>
    </ThemeProvider>
  )
}

