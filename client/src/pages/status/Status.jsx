import React, { useEffect, useState } from "react";
import WelcomeBanner from "../../components/WelcomeBanner";
import Footer from "../../components/Footer";
import Header from "../../partials/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AgreementContext } from "../../context/AgreementProvider";
import Pay from "../Pay";

const Status = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();
  const [cid, setCid] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("p");
  const [uploading, setUploading] = useState(false);
  const [pay, setPay] = useState(false);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () =>
      await newRequest.get(`/contracts/all`).then((res) => {
        return res.data;
      }),
  });

  const mutation1 = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/contracts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAll"]);
    },
  });

  const mutation2 = useMutation({
    mutationFn: (id) => {
      console.log(id, " ", status);
      return newRequest.put(`/contracts/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAll"]);
    },
  });

  useEffect(() => {
    if (!currentUser) navigate("/login");
    else refetch();
  });

  function convert(date) {
    const d = new Date(date);
    return d.toDateString();
  }

  const handleDelete = (id) => {
    mutation1.mutate(id);
  };

  const handleAccept = (id) => {
    mutation2.mutate(id);
  };

  const handleReject = (id) => {
    mutation2.mutate(id);
    // console.log(id);
  };

  const handleUpload = async () => {
    let date = new Date().toLocaleDateString("en-IN");

    if (currentUser.sub === "per") {
      setPay(true);
    } else {
      setUploading(true);
      try {
        const { data } = await newRequest.post("/contracts/upload", {
          cid,
          date,
        });
        setUploading(false);
      } catch (error) {
        console.log(error);
      }
    }

    // navigate("/pay");
  };

  return (
    <>
      <div className="relative">
        <div className="fixed top-0 left-0">
          <svg
            id="visual"
            viewBox="0 0 960 540"
            width="full"
            height="1000"
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
              <div className="px-4 sm:px-6 lg:px-8 py-8 mt-20 w-full max-w-9xl mx-auto">
                {" "}
                <main>
                  <WelcomeBanner />
                  <div className="relative container mx-auto flex flex-col min-h-screen">
                    <div className="overflow-x-auto shadow-md mt-8 mb-8 sm:rounded-lg">
                      <div className="inline-block min-w-full align-middle dark:bg-gray-800">
                        <div className="p-4 mb-6">
                          <div className="flex md:justify-between items-center">
                            <div>
                              <label htmlFor="table-search" className="sr-only">
                                Search
                              </label>
                            </div>
                            {/* <div>
                          {!currentAccount ? (
                            <button
                              onClick={() => connectWallet()}
                              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-400 hover:bg-red-700 focus:shadow-outline focus:outling-none background"
                              title="Connect your Metamask wallet"
                            >
                              Connect Wallet
                            </button>
                          ) : undefined}
                        </div> */}
                          </div>

                          <div className="relative mt-1">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="table-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                              placeholder="Search htmlFor items"
                            />
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <table className="min-w-full table-fixed dark:divide-gray-700 divide-y divide-green-400 ">
                            <thead className="bg-gray-100">
                              <tr>
                                <th scope="col"></th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                                >
                                  Title
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                                >
                                  Requested by
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                                >
                                  Start Date
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-xs justify-center font-medium tracking-wider text-left text-gray-700 uppercase"
                                >
                                  End Date
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                                >
                                  View
                                </th>
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                                >
                                  Upload Status
                                </th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                              {data?.map((c) => (
                                <tr
                                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                  key={c._id}
                                >
                                  <td className="p-4 w-4">
                                    <div className="flex items-center">
                                      <input
                                        id="checkbox-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      />
                                      <label
                                        htmlFor="checkbox-search-1"
                                        className="sr-only"
                                      >
                                        checkbox
                                      </label>
                                    </div>
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900 justify-center whitespace-nowrap dark:text-white">
                                    {c.title}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium text-gray-500 justify-center whitespace-nowrap dark:text-white">
                                    {c.creatorId === currentUser._id
                                      ? "You"
                                      : c.creatorId}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium text-gray-900 justify-center whitespace-nowrap dark:text-white">
                                    {convert(c.startDate)}
                                  </td>
                                  <td className="py-4 px-6 text-sm font-medium justify-center text-gray-900 whitespace-nowrap dark:text-white">
                                    {convert(c.endDate)}
                                  </td>
                                  <td className="py-4 px-6 text-sm justify-center font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                    <Link to="/view" state={c._id}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="rgb(30,144,255)"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                    </Link>
                                  </td>
                                  <td className="py-4 px-6 text-sm justify-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {c.status === "a" && !c.uploaded ? (
                                      <button
                                        onClick={() => {
                                          setCid(c._id);
                                          handleUpload();
                                        }}
                                      >
                                        Upload
                                      </button>
                                    ) : (
                                      <div className="font-medium text-gray-500 dark:text-white cursor-not-allowed">
                                        {uploading
                                          ? "Uploading..."
                                          : "Uploaded"}
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-4 px-6 flex justify-center space-x-4 text-sm font-medium text-right whitespace-nowrap">
                                    {currentUser._id === c.creatorId ? (
                                      <div className="flex justify-between space-x-8">
                                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                                          <span
                                            aria-hidden
                                            className={`absolute inset-0 opacity-50 rounded-full ${
                                              c.status === "a"
                                                ? "bg-green-200 text-green-900"
                                                : c.status === "p"
                                                ? "bg-red-200 text-red-900"
                                                : "bg-red-600 text-red-900"
                                            }`}
                                          ></span>
                                          <span className="relative dark:text-white">
                                            {c.status === "p"
                                              ? "Pending"
                                              : c.status === "a"
                                              ? "Accepted"
                                              : "Rejected"}
                                          </span>
                                        </span>
                                        <span
                                          className={
                                            c.status === "p"
                                              ? "cursor-pointer"
                                              : undefined
                                          }
                                          onClick={() => {
                                            if (c.status === "p")
                                              handleDelete(c._id);
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke={`${
                                              c.status !== "p"
                                                ? "rgb(230,230,230)"
                                                : "red"
                                            }`}
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                      4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                    ) : c.status === "p" ? (
                                      <div className="space-x-8">
                                        <span
                                          className="text-green-500 font-bold hover:underline dark:text-blue-500 cursor-pointer"
                                          onClick={() => {
                                            setStatus("a");
                                            handleAccept(c._id);
                                          }}
                                        >
                                          Accept
                                        </span>
                                        <span
                                          className="text-red-600 font-bold hover:underline dark:text-blue-500 cursor-pointer"
                                          onClick={() => {
                                            setStatus("r");
                                            handleReject(c._id);
                                          }}
                                        >
                                          Reject
                                        </span>
                                      </div>
                                    ) : c.status === "a" ? (
                                      <div className="space-x-8">
                                        <span className="text-green-700 font-bold dark:text-blue-500">
                                          Accepted by you
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="space-x-8">
                                        <span className="text-red-600 font-bold dark:text-blue-500">
                                          Rejected by you
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          {pay && <Pay pay={pay} setPay={setPay} cid={cid} />}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Status;
