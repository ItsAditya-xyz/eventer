import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../Landing/Footer";
import CreateAd from "./CreateAd";
export default function Home() {
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
    <div className='leading-relaxed tracking-wide flex flex-col'>
      <Toaster />
      <div>
        <Navbar />

            <CreateAd/>
        <div id='localPlaces' className='mt-20'>
          <div id='Food' className='mt-20'>
            <div className='flex justify-center my-5'>
              <h2 className='text-3xl '> Fooding</h2>
            </div>
          </div>

          <div className='container mx-auto flex flex-wrap justify-center'>
            <div className='shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/3 p-4'>
              <img
                src='https://image.wedmegood.com/resized/800X/uploads/member/468694/1672997780_IMG_20211117_WA0066.jpg'
                className='rounded-tl-lg rounded-tr-lg'
              />
              <div className='p-5'>
                <h3>Zaika Catering</h3>
                <p>Best Catering in the City!</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div className='shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/3 p-4'>
              <img
                src='https://image.wedmegood.com/resized/800X/uploads/member/1367532/1647696054_IMG_20220306_WA0018.jpg'
                className='rounded-tl-lg rounded-tr-lg'
              />
              <div className='p-5'>
                <h3>KKC</h3>
                <p>Expirence True Culinary Finnesse</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div className='shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/3 p-4'>
              <a href='#'>
                <img
                  src='https://image.wedmegood.com/resized/800X/uploads/member/822111/1646374102_IMG20220205201854.jpg'
                  className='rounded-tl-lg rounded-tr-lg'
                />
              </a>
              <div className='p-5'>
                <h3>Kumar's Cook & Cateren</h3>
                <p>Food that makes your mouth wet!</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
          </div>

          <div id='Swags' className='mt-20'>
            <div id='Food' className='mt-20'>
              <div className='flex justify-center my-5'>
                <h2 className='text-3xl '> Swags & Stickers</h2>
              </div>
            </div>
          </div>

          <div className='container mx-auto flex flex-wrap justify-center '>
            <div className='shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/3 p-4'>
              <img
                src='https://www.bestprintingnyc.com/wp-content/uploads/2020/09/sticker-printing-shop-new-york-01.png'
                className='rounded-tl-lg rounded-tr-lg'
              />
              <div className='p-5'>
                <h3>SHags Stickers </h3>
                <p>get your cool Stickers Today!</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div className='shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/3 p-4'>
              <img
                src='https://i.pinimg.com/736x/ea/4e/4d/ea4e4dea0cace7af3346d82cb66c5ab5--custom-clothing-nyc.jpg'
                className='rounded-tl-lg rounded-tr-lg'
              />

              <div className='p-5'>
                <h3>GIFTeD</h3>
                <p>we diliver gifts and ptinted electronic accessories</p>
                <button className='w-full bg-gradient-to-r from-black to-gray-700 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 mr-1'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
