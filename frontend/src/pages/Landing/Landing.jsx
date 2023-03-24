
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Landing(props) {
  const [isLoggin, setIsLoggin] = useState(false);
  const [hasLoggedIn, setHasloggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    navigate("start-login");
  };

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token) {
      setHasloggedIn(true);
    }
  }, []);

  return (
    <div className='gradient leading-relaxed tracking-wide flex flex-col'>
      <Toaster />
      <nav id='header' className='w-full z-30 top-0  py-1 lg:py-6'>
        <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6'>
          <div className='flex items-center'>
            <Link
              to='/'
              className='no-underline flex hover:no-underline font-bold text-2xl lg:text-4xl'
              href='#'>
           
              <span className='mx-2 my-2 text-white'>Eventer</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
