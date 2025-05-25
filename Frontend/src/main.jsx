
// index.jsx or main.jsx
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/Usercontext.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
  </StrictMode>
);