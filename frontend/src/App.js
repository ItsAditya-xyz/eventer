import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Callback from "./pages/Callback/Callback";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import StartLogin from "./pages/StartLogin/StartLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/start-login' element={<StartLogin />} />
        {/* <Route path='/ads/:postHashHex' element={<Post />} /> */}
        {/* <Route path='/works/:postHashHex' element={<Post />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
