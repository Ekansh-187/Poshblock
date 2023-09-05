import React, { useEffect } from "react";
import WelcomeBanner from "../../components/WelcomeBanner";
import DashboardCard from "../../components/ContractCard";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "../../utils/getCurrentUser";
import Header from "../../partials/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const ViewAll = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () =>
      await newRequest.get(`/contracts/all`).then((res) => {
        return res.data;
      }),
  });
  useEffect(() => {
    if (!currentUser) navigate("/login");
    else refetch();
  });
  return (
    <>
      <div className="relative">
        <div className="fixed top-0 left-0">
          <svg
            id="visual"
            viewBox="0 0 960 540"
            width="full"
            height="1000px"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
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
        <div className="absolute w-full text-[#182235] h-auto top-0 left-0 pt-[5rem] items-center">
          <div className="flex overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/*  Site header */}
              <Header />
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {" "}
                <main>
                  <WelcomeBanner />
                  <div className=" h-screen">
                    <div className="grid grid-cols-12 gap-6">
                      {data?.map((contract, i) => (
                        <DashboardCard
                          key={contract._id}
                          index={i}
                          contract={contract}
                        />
                      ))}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
//   return (
//     <>
// <div className="flex overflow-hidden">
//   <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//     {/*  Site header */}
//     <Header />
//     <div className="px-4 sm:px-6 lg:px-8 py-8 mt-20 w-full max-w-9xl mx-auto">
//       {" "}
//       <main>
//         <WelcomeBanner />
//         <div className=" h-screen">
//           <div className="grid grid-cols-12 gap-6">
//             {data?.map((contract, i) => (
//               <DashboardCard
//                 key={contract._id}
//                 index={i}
//                 contract={contract}
//               />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   </div>
// </div>
//       <Footer />
//     </>
//   );
// };

export default ViewAll;
