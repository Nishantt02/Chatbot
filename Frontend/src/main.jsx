
// index.jsx or main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import './index.css'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Verify from './Pages/Verify.jsx'
import { UserProvider } from './context/Usercontext.jsx'

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/verify',
    element: <Verify />
  }
]);

// Render the root app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
)