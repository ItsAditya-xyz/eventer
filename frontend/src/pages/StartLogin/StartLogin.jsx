import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants/constant";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function StartLogin() {
  const [isLoggin, setIsLoggin] = useState(false);
  useEffect(() => {
    if (isLoggin) return;

    localStorage.removeItem("JWT");
    localStorage.removeItem("user");
    setIsLoggin(true);
    Axios.get(`${BACKEND_URL}auth/google`, {
      headers: {
        "Access-Control-Allow-Origin": "* ",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
      .then((res) => {
        window.location.assign(res.data.auth_url);
      })
      .catch((err) => {
        toast.error("Error logging in");
        setIsLoggin(false);
      });
    console.log(BACKEND_URL);
  }, []);
  return (
    <div>
      <Toaster />
      <p>Starting Login...</p>
    </div>
  );
}
