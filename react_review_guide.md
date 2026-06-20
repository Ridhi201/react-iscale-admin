# React Codebase Improvement Guide (Review & Implementation)

This guide provides step-by-step examples and code snippets to implement the 4 recommendations from the review. **No changes have been made to your project source files.** You can use these examples to update your codebase whenever you are ready.

---

## 1. Implement React Lazy Loading (for AppRoutes.jsx)

Currently, importing over 100 components at the top of `src/routes/AppRoutes.jsx` causes Vite to bundle everything together. Implementing Lazy Loading will split your pages into smaller chunks and load them only when the user visits that route.

### 📝 Example:

Instead of importing everything at once:
```javascript
// OLD WAY: Direct imports (loads everything at startup)
import Dashboard from '../pages/dashboard/Dashboard'
import AllCourses from '../pages/courses/AllCourses'
import Login from '../pages/auth/Login'
```

Change it to use `React.lazy()` and wrap your routes in a `<Suspense>` component:
```javascript
// NEW WAY: Lazy imports
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'

// Lazy loaded page components
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'))
const AllCourses = React.lazy(() => import('../pages/courses/AllCourses'))
const Login = React.lazy(() => import('../pages/auth/Login'))

export default function AppRoutes() {
  return (
    // Suspense shows a loading fallback (like a spinner or skeleton) while the page loads
    <Suspense fallback={<div className="flex h-screen items-center justify-center dark:bg-[#0b0914] text-slate-500">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<AllCourses />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
```

---

## 2. Use the Configured Custom Axios Client

You already have a custom Axios instance configured in `src/services/axios.js` that automatically attaches the authentication token. You should use it instead of importing raw `axios` and manually passing headers.

### 📝 Example:

**Old Code (Duplicate token extraction):**
```javascript
import axios from 'axios'
import { BASE_URL } from '../../config/api'

// Inside useEffect or handler:
const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}` }
const res = await axios.get(`${BASE_URL}/myadmin/dashboard/cards`, { headers })
```

**New Code (Clean & DRY using custom client):**
```javascript
// Import the custom configured client
import api from '../../services/axios' 

// Inside useEffect or handler:
// Note: baseURL and token headers are handled automatically by the client!
const res = await api.get('/myadmin/dashboard/cards')
```

---

## 3. Update Custom Buttons (Prop Spreading & Native Replacement)

To make your custom `Button` component fully flexible, you should enable **Prop Spreading** (`...props`) so that standard attributes like `disabled`, `type`, `title`, or `form` work natively.

### 📝 Updated `Button.jsx` Component:

```jsx
import React from 'react';

export default function Button({ 
  children, 
  type = "button", 
  variant = "primary", 
  className = "",
  fullWidth = false,
  icon = null,
  ...props // 👈 Collects all other button props (disabled, onClick, title, etc.)
}) {
  const baseStyles = "flex items-center justify-center gap-2 px-6 h-11 text-sm font-medium rounded-xl transition-all duration-300 active:scale-[0.97]";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 relative overflow-hidden btn-ripple",
    secondary: "bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 border border-slate-200 dark:border-[#1f1b2e] shadow-sm hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden btn-ripple",
    danger: "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_4px_14px_0_rgb(244,63,94,0.39)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.23)] hover:-translate-y-0.5 relative overflow-hidden btn-ripple",
    outline: "border border-slate-200 dark:border-[#1f1b2e] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-50 dark:bg-[#1f1b2e]/50 hover:shadow-sm relative overflow-hidden btn-ripple bg-transparent"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props} // 👈 Spreads standard attributes onto the button element
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
```

### 📝 Replacing Native Buttons:

Instead of writing custom Tailwind utility classes on raw HTML `<button>` elements:
```html
<!-- Old Native Button (in pages) -->
<button 
  disabled={loading} 
  onClick={handleSubmit}
  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white disabled:opacity-60 hover:bg-blue-500 shadow-lg"
>
  {loading ? 'Sending...' : 'Send reset link'}
</button>
```

Use the reusable `Button` component:
```jsx
// New Reusable Button
import Button from '../../components/common/Button'

<Button 
  fullWidth 
  variant="primary" 
  onClick={handleSubmit} 
  disabled={loading}
>
  {loading ? 'Sending...' : 'Send reset link'}
</Button>
```

---

## 4. Use the `@` Import Alias

Your `vite.config.js` is already configured with `alias: { '@': '/src' }`. You should use this to make your import paths clean and prevent long relative paths (e.g. `../../../../`).

### 📝 Example:

Instead of calculating directory depth:
```javascript
// OLD WAY: Long relative imports
import Button from '../../components/common/Button'
import { useAuth } from '../../store/AuthContext'
import api from '../../services/axios'
```

Use the `@` symbol to start directly from the `src` folder:
```javascript
// NEW WAY: Clean Alias imports
import Button from '@/components/common/Button'
import { useAuth } from '@/store/AuthContext'
import api from '@/services/axios'
```
