import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AgreementProvider } from "./context/AgreementProvider.jsx";
import "./css/style.css";
import { ToastContainer } from "react-toastify";
import "./charts/ChartjsConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// Import pages
import Login from "./pages/login/Login.jsx";
import RegisterUser from "./pages/register/RegisterUser";
import Home from "./pages/home/Home";
import Team from "./pages/Team";

import Status from "./pages/status/Status";
import View from "./pages/View";
import Uploaded from "./pages/contracts/Uploaded.jsx";
import CreateNew from "./pages/contracts/CreateNew.jsx";
import ViewAll from "./pages/contracts/ViewAll.jsx";
import Pay from "./pages/Pay.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Pricing from "./pages/Pricing.jsx";
function App() {
  const location = useLocation();
  const queryClient = new QueryClient();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup1" element={<RegisterUser />} />
          <Route path="/team" element={<Team />} />
          <Route path="/status" element={<Status />} />
          <Route path="/view" element={<View />} />
          <Route path="/createNew" element={<CreateNew />} />
          <Route path="/viewAll" element={<ViewAll />} />
          <Route path="/pay" element={<Pay />} />
          <Route
            path="/admin"
            element={
              <AgreementProvider>
                <Admin />
              </AgreementProvider>
            }
          />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/uploaded" element={<Uploaded />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
