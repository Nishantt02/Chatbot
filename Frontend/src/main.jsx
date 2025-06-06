
// index.jsx or main.jsx
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/Usercontext.jsx'
import { ChatProvider } from './context/Chatcontext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>  
    </UserProvider>
  </StrictMode>
);