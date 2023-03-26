import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Callback from "./pages/Callback/Callback";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import StartLogin from "./pages/StartLogin/StartLogin";
import Home from "./pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/start-login' element={<StartLogin />} />
        <Route path='/app' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
