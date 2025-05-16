import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate } from 'react-router-dom'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './index.css'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Verify from './Pages/Verify.jsx'
import App from './App.jsx'
import { UserProvider } from './context/Usercontext.jsx'

const router=createBrowserRouter([{

  path:'/',
  element:<Navigate to="/login" replace/>
},
  {

  path:'/home',
  element:<Home/> 
},
{
  path:'/login',element:(<Login/>)
},
{
  path:'/verify',element:<Verify/>

}])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    <App />
   </UserProvider>
  </StrictMode>,
)
