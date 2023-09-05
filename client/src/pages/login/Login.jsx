import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import Banner from "../../partials/Banner";
import Header from "../../partials/Header";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loc = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate(`/`);
    } catch (err) {
      setError(err);
      setError(err.response.data);
    }
  };
  useEffect(() => {
    const check = () => {
      if (currentUser) navigate("/");
    };
    check();
  });
  return (
    <>
      <Header />
      {loc.state === "link" && <Banner />}
      <div className="relative">
        <div className="fixed top-0 left-0">
          <svg
            id="visual"
            viewBox="0 0 960 540"
            width="full"
            height="1000"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <rect x="0" y="0" width="960" height="540" fill="#F5F5DC"></rect>
            <defs>
              <linearGradient
                id="grad1_0"
                x1="43.8%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="14.444444444444446%"
                  stop-color="#001220"
                  stop-opacity="1"
                ></stop>
                <stop
                  offset="85.55555555555554%"
                  stop-color="#001220"
                  stop-opacity="1"
                ></stop>
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="grad2_0" x1="0%" y1="0%" x2="56.3%" y2="100%">
                <stop
                  offset="14.444444444444446%"
                  stopColor="#001220"
                  stopOpacity="1"
                ></stop>
                <stop
                  offset="85.55555555555554%"
                  stopColor="#001220"
                  stopOpacity="1"
                ></stop>
              </linearGradient>
            </defs>
            <g transform="translate(960, 0)">
              <path
                d="M0 270C-31.6 258.6 -63.1 247.2 -98 236.5C-132.8 225.8 -171 215.7 -190.9 190.9C-210.8 166.1 -212.5 126.5 -222.7 92.2C-232.8 57.9 -251.4 29 -270 0L0 0Z"
                fill="#ADD8E6"
              ></path>
            </g>
            <g transform="translate(0, 540)">
              <path
                d="M0 -270C36 -267 72 -264.1 103.3 -249.4C134.6 -234.8 161.3 -208.6 181 -181C200.8 -153.4 213.6 -124.5 227.3 -94.1C241 -63.7 255.5 -31.9 270 0L0 0Z"
                fill="#ADD8E6"
              ></path>
            </g>
          </svg>
        </div>

        <section className="absolute w-full text-[#182235] h-auto top-0 left-0 pt-[5rem] items-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Username
                    </label>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-red-600 text-xs">{error && `*${error}`}</p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/signup1"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </>
  );
};

export default Login;
