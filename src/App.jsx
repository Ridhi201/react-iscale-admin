import { ThemeProvider } from './store/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import CustomPopup from './components/common/CustomPopup'

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
      <CustomPopup />
    </ThemeProvider>
  )
}

