import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BACKEND_URL } from "../../constants/constant";
import { useNavigate } from "react-router-dom";
export default function Callback() {
  const nav = useNavigate();
  const [isRouting, setIsRouting] = useState(false);
  async function routeToCorrectPage(jwt) {
    const res = await fetch(`${BACKEND_URL}self-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await res.json();
    if (data.user) {
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      return nav("/");
    } else {
      return nav("/sign-up");
    }
  }
  useEffect(() => {
    const jwtVal = localStorage.getItem("JWT");
    if (jwtVal == null) {
      const query = new URLSearchParams(window.location.search);
      const token = query.get("jwt");
      console.log(token);
      if (token) {
        localStorage.setItem("JWT", token);
        if (!isRouting) {
          setIsRouting(true);
          console.log("routing");
          routeToCorrectPage(token);
        }
      }
    } else {
      if (!isRouting) {
        setIsRouting(true);
        console.log("routing");
        routeToCorrectPage(jwtVal);
      }
    }
  }, []);

  return (
    <div>
      <Toaster />
      <div className='flex justify-center mx-auto mt-3'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
      </div>
    </div>
  );
}
