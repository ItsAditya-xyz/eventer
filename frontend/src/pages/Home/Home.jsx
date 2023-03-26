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

  const [latestAds, setLatestAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const initLatestAds = async () => {
    try {
      //make post request to https://node.deso.org/api/v0/get-posts-for-public-key
      const respone = await fetch(
        "https://node.deso.org/api/v0/get-posts-for-public-key",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PublicKeyBase58Check:
              "BC1YLgagz3eTfnU1UjWtjDcdnqEcsz9yB3MsGpAnxb1LcN2AptMeTLq",
            Username: "eventer",
            ReaderPublicKeyBase58Check:
              "BC1YLhaygmf4oWajCs8f9Styd2TJKqTXVrkAW4cMyFUoYK7NqawDUSt",
            LastPostHashHex: "",
            NumToFetch: 100,
            MediaRequired: false,
          }),
        }
      );
      const data = await respone.json();
      setLatestAds(data.Posts);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setHasloggedIn(true);
    }
    if (latestAds.length === 0) {
      initLatestAds();
    }
  }, []);

  return (
    <div className='leading-relaxed tracking-wide flex flex-col'>
      <Toaster />
      <div>
        <Navbar />
        {hasLoggedIn && <CreateAd />}

        {!hasLoggedIn && (
          <div className='flex flex-col justify-center items-center mt-20'>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-center text-xl mt-5'>
                Create your Vendor Advertisement by signing up for Eventer!
              </p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Link to='/start-login'>
                <button className='bg-gradient-to-r from-green-700 to-purple-500 hover:from-green-800 hover:to-purple-600 rounded-full py-3 px-6 my-2 text-lg text-white '>
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}

        {loading && (
          <div className='flex justify-center items-center mt-20'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
          </div>
        )}
        {!loading && (
          <div className='mt-20'>
            <div className='flex justify-center my-5'>
              <h2 className='text-3xl '> Latest Ads</h2>
            </div>
            <div className='container mx-auto flex flex-wrap justify-center'>
              {latestAds.map((ad) => (
                <div className='shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/3 p-4'>
                  <img
                    src={ad.ImageURLs[0]}
                    className='rounded-tl-lg rounded-tr-lg'
                  />
                  <div className='p-5 flex flex-col space-y-1'>
                    <div className='flex items-center space-x-1'>
                      <img
                        src={`https://images.deso.org/${ad.PostExtraData.profilePhoto}`}
                        className='rounded-full h-10 w-10'
                      />
                      <h3 className='font-semibold'>
                        {ad.PostExtraData.username}
                      </h3>
                    </div>
                    <div className='w-full'>
                      <h4 className=' bg-green-100 text-green-600 px-2 py-1 rounded-md'>
                        #{ad.PostExtraData.tags}
                      </h4>
                    </div>
                    <p className='font-bold underline'>
                      {ad.Body.substring(
                        ad.Body.indexOf("shortDescription:") + 17,
                        ad.Body.indexOf("longDescription:") - 1
                      )}
                    </p>
                    <p>
                      {ad.Body.substring(
                        ad.Body.indexOf("longDescription:") + 16
                      )}
                    </p>
                    <div className="mx-auto">
                      <button className=' bg-gradient-to-r from-black to-gray-700 rounded-full py-3 px-8 my-2 text-sm text-white hover:bg-pink-600 hover:from-amber-900 hover:to-amber-200 flex flex-row justify-center'>
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
