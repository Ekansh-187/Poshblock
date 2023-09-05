import React, { useState, useEffect, useReducer, useContext } from "react";
import WelcomeBanner from "../../components/WelcomeBanner";
import Header from "../../partials/Header";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";
import { contractReducer, INITIAL_STATE } from "./contractReducer.js";
import upload from "../../utils/upload.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-tailwindcss-select";
import getCurrentUser from "../../utils/getCurrentUser";
import DropIn from "braintree-web-drop-in-react";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";

const CreateNew = ({ option, setSelected }) => {
  /**Handle Payments */
  const { id } = useParams();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState(false);
  const [errUpload, setErrUpload] = useState(true);
  const [errId, setErrId] = useState(true);
  const [state, dispatch] = useReducer(contractReducer, INITIAL_STATE);
  const curr = getCurrentUser();
  const [name, setName] = useState(undefined);
  const [val, setVal] = useState(null);
  const [list, setList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  // const list = [];

  const mutation = useMutation({
    mutationFn: (contract) => {
      console.log(contract);
      return newRequest.post("/contracts", contract);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["myGigs"]);
    // },
  });

  const getToken = async () => {
    try {
      const { data } = await newRequest.get("/contracts/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [id]);

  const called = async () => {
    console.log(state);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const { type, nonce } = await instance.requestPaymentMethod();
      const { data } = await newRequest.post(`/contracts/payment/${id}`, {
        type,
        nonce,
        state,
      });
      setLoading(false);
      setSelected("status");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["searchUser"],
    queryFn: async () =>
      await newRequest.get(`/users/getAll?email=${name}`).then((res) => {
        var l = [];
        res.data?.forEach((d) => {
          if (curr._id !== d._id) l.push({ value: d._id, label: d.username });
        });
        setList(l);
        return res.data;
      }),
  });

  useEffect(() => {
    const checkLogin = () => {
      if (!curr) navigate("/login");
      // else refetch();
    };
    checkLogin();
  }, [name]);

  const handleSelect = (value) => {
    setVal(value);

    if (value == null) {
      setErrId(true);
    } else setErrId(false);
  };

  useEffect(() => {
    setErr(errId || errUpload);
  }, [errId, errUpload]);

  useEffect(() => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: "receiverId", value: val?.value },
    });
  }, [val]);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!err) {
      setLoading(true);
      const doc = await upload(file);
      // console.log(docLink);
      await newRequest.post("/contracts", { ...state, docLink: doc });
      // called();
      // mutation.mutate(state);
      setLoading(false);
      toast.success("Contract created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } else {
      toast.error("Please fill out all the fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      {/*  Site header */}
      <Header />
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
          <div className="relative flex flex-col flex-1 sm:pb-5 pb-0 overflow-x-hidden bg-transparent">
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto ">
              {" "}
              <main>
                <WelcomeBanner />
                <div className="relative bg-gray-100 flex items-center justify-center bg-transparent h-screen ">
                  <div className="container max-w-screen-lg mx-auto">
                    <form onSubmit={handleSubmit}>
                      <div className="absolute border border-blue-300 right-0 top-0  backdrop-blur-sm rounded-lg w-full shadow-lg p-4 px-4 md:p-8 mb-6 ">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                          <div className="text-gray-600">
                            <p className="font-medium text-lg">
                              Contract Details
                            </p>
                            <p>Please fill out all the fields.</p>
                          </div>

                          <div className="lg:col-span-2 border border-blue-300 shadow rounded-md p-4 backdrop-blur-lg">
                            {!submitted ? (
                              loading ? (
                                <Loading />
                              ) : (
                                <>
                                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-6">
                                    <div className="md:col-span-6 col-span-2">
                                      <label htmlFor="full_name">Title</label>
                                      <input
                                        required
                                        type="text"
                                        name="title"
                                        id="title"
                                        onChange={handleChange}
                                        className="h-10 border-solid border-4 mt-1  rounded-xl px-4 w-full bg-gray-50 "
                                      />
                                    </div>

                                    <div className="md:col-span-6 col-span-2">
                                      <Select
                                        required
                                        isClearable={true}
                                        isSearchable={true}
                                        onSearchInputChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        value={val}
                                        onChange={handleSelect}
                                        options={list}
                                        classNames={{
                                          menuButton: ({ isDisabled }) =>
                                            `flex h-10 border-solid border-[#6b7280] border-4  rounded-xl shadow-sm w-full bg-gray-50  transition-all duration-300 focus:outline-none ${
                                              isDisabled
                                                ? "bg-gray-200"
                                                : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                                            }`,
                                          menu: "absolute z-10 h-48 overflow-y-auto w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                          listItem: ({ isSelected }) =>
                                            `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                              isSelected
                                                ? `text-white bg-blue-500`
                                                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                            }`,
                                        }}
                                      />
                                    </div>

                                    <div className="md:col-span-3 ">
                                      <label htmlFor="startDate">
                                        Start Date
                                      </label>
                                      <input
                                        required
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        onChange={handleChange}
                                        className="h-10 border-solid border-4 rounded-xl px-4 w-full bg-gray-50 "
                                        placeholder=""
                                      />
                                    </div>

                                    <div className="md:col-span-3">
                                      <label htmlFor="endDate">End Date</label>
                                      <input
                                        required
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        onChange={handleChange}
                                        className="h-10 border-solid border-4 rounded-xl px-4 w-full bg-gray-50 "
                                        placeholder=""
                                      />
                                    </div>

                                    <div className="md:col-span-6 col-span-2">
                                      <label htmlFor="full_name">
                                        Description
                                      </label>
                                      <textarea
                                        name="desc"
                                        rows="5"
                                        id="desc"
                                        required
                                        onChange={handleChange}
                                        className="border-solid border-4 resize-none mt-1 rounded-xl px-4 w-full bg-gray-50"
                                        placeholder="Description..."
                                      />
                                    </div>
                                    <div className="md:col-span-6 col-span-2">
                                      <div className="flex items-center justify-center w-full">
                                        <label
                                          htmlFor="docLink"
                                          className="flex flex-col items-center justify-center w-full h-55 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                                        >
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                              className="w-8 h-8 mb-4 text-gray-500"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 20 16"
                                            >
                                              <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                              />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                              <span className="font-semibold">
                                                Click to upload
                                              </span>{" "}
                                              or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                              SVG, PNG, JPG or GIF (MAX.
                                              800x400px)
                                            </p>
                                          </div>
                                          <span className="font-semibold text-red-600">
                                            {errUpload &&
                                              "*Please upload the contract document*"}
                                          </span>

                                          <input
                                            id="docLink"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                              setErrUpload(false);
                                              setErr(errId || errUpload);
                                              setFile(e.target.files[0]);
                                            }}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                    {/* <button
                      className="md:col-span-3 col-span-2 bg-green-200"
                      onClick={handleUpload}
                    >
                      {uploading ? "Uploading" : "Upload"}
                    </button> */}
                                    <div className="md:col-span-6 w-full col-span-2 text-right">
                                      <div className="inline-flex align-center w-full">
                                        <button
                                          type="submit"
                                          onClick={handleSubmit}
                                          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            ) : undefined}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CreateNew;
