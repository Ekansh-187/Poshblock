import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../images/icon-01.svg";
import EditMenu from "./DropdownEditMenu";
import newRequest from "../utils/newRequest";
import { useMutation } from "@tanstack/react-query";
import "./c.css";

function DashboardCard({ index, contract }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [creator, setCreator] = useState("");
  const [receiver, setReceiver] = useState("");
  const [status, setStatus] = useState(false);

  function resolveAfter2Seconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  async function f1() {
    const { data } = await resolveAfter2Seconds(
      newRequest(`/users/${contract.creatorId}`)
    );
    setCreator(data);
  }

  async function f2() {
    const { data } = await resolveAfter2Seconds(
      newRequest(`/users/${contract.receiverId}`)
    );
    setReceiver(data);
  }
  useEffect(() => {
    f1();
    f2();
  }, []);

  const handleView = () => {};
  const startDate = new Date(contract.startDate).toDateString();
  const endDate = new Date(contract.endDate).toDateString();
  // console.log(endDate.toDateString());
  return (
    <div
      className={`flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border-4 dark:border-slate-700 ${
        contract.creatorId === currentUser._id
          ? "border-green-200"
          : "border-red-200"
      }`}
    >
      <div className="px-5 pt-5 ">
        <header className="flex justify-between items-start mb-2">
          <a
            tabIndex="0"
            role="link"
            aria-label="tooltip 1"
            className="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative mt-20 md:mt-0"
            onClick={(e) => {
              if (!status) {
                setStatus(true);
                document
                  .getElementById(`tooltip${index}`)
                  .classList.remove("hidden");
              } else {
                setStatus(false);
                document
                  .getElementById(`tooltip${index}`)
                  .classList.add("hidden");
              }
            }}
          >
            <div className=" cursor-pointer">
              <img src={Icon} width="25" height="25" alt="Icon 01" />
            </div>
            <div
              id={`tooltip${index}`}
              role="tooltip"
              className="z-20 -mt-20 w-64 absolute hidden transition duration-150 bg-[#f1f5f9] ease-in-out left-0 ml-8 shadow-lg p-4 rounded"
            >
              <svg
                className="absolute left-0 -ml-2 bottom-0 top-0 h-full "
                width="9px"
                height="16px"
                viewBox="0 0 9 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Tooltips-"
                    transform="translate(-874.000000, -1029.000000)"
                    fill="#FFFFFF"
                  >
                    <g
                      id="Group-3-Copy-16"
                      transform="translate(850.000000, 975.000000)"
                    >
                      <g
                        id="Group-2"
                        transform="translate(24.000000, 0.000000)"
                      >
                        <polygon
                          id="Triangle"
                          transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                          points="4.5 57.5 12.5 66.5 -3.5 66.5"
                          fill="rgb(241,245,249);"
                        ></polygon>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-sm font-bold text-gray-800 pb-1">
                This contract was added by{" "}
                {creator === currentUser.username ? "you" : creator}
              </p>
              <p className="text-xs leading-4 text-gray-600 pb-3">
                <br />
              </p>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span></span>
                </div>
                <div className="flex items-center">
                  {/* <button className="focus:outline-none  focus:text-gray-400 text-xs text-gray-600 underline mr-2 cursor-pointer">
                    Skip Tour
                  </button> */}
                  <button
                    onClick={handleView}
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-400 focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </a>
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>

        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          {contract.title}
        </h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
          {startDate} - {endDate}
        </div>
      </div>
      <div className="mt-2 mx-3">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          with:
        </div>
        <div className="flex items-start">
          <div className="text-xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            {currentUser._id === contract.creatorId ? receiver : creator}
          </div>
        </div>
      </div>

      {/* Chart built with Chart.js 3 */}
      <div className="grow px-3 mb-10 max-sm:max-h-[128px] xl:max-h-[128px] ">
        {/* Change the height attribute to adjust the chart height */}
        <h2 className="absolute fixed text-md mt-3 font-semibold text-slate-800 dark:text-slate-100 mb-1">
          Description
        </h2>
      </div>

      <div className="grow px-3 mb-10 border p-2 mx-2 max-sm:max-h-[128px] xl:max-h-[128px] overflow-hidden overflow-y-auto">
        {/* Change the height attribute to adjust the chart height */}

        <p className="">{contract.desc}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
