import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      {bannerOpen && (
        <div className="fixed top-10 right-10 w-auto md:bottom-8 md:right-12 md:w-auto z-50 sm:bottom-8  ">
          <div className="bg-slate-800 border border-transparent dark:border-slate-700 text-slate-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-slate-500 inline-flex">
              <a
                className="font-medium text-red-400"
                target="_blank"
                rel="noreferrer"
              >
                You are not authenticated
              </a>{" "}
            </div>
            <button
              className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-gray-700"
              onClick={() => {
                setBannerOpen(false);
              }}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4 shrink-0 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
