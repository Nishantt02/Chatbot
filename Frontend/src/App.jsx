import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Verify from './Pages/Verify.jsx'
import { Userdata } from "./context/Usercontext.jsx";
import { LoadingBig } from "./Components/Loading.jsx";
import './index.css';


const App = () => {
  const { user, isAuth, loading } = Userdata();
  return (
    <>
      {loading ? (
        <LoadingBig />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/home" element={ <Home /> } />

          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;