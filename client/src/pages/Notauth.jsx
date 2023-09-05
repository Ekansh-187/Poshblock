import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notauth = () => {
  const navigate = useNavigate();
  const [cancel, setCancel] = useState(true);
  const handleSubmit = (e) => {
    navigate("/");
  };
  return (
    <div className="w-full md:w-1/3 mx-auto">
      {cancel && (
        <div className="flex flex-col p-5 rounded-lg shadow bg-white">
          <div className="flex flex-col items-center text-center">
            <div className="inline-block p-4 bg-yellow-50 rounded-full">
              <img
                className="object-fit h-25 w-25"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Stop_hand-octogon-red.svg/240px-Stop_hand-octogon-red.svg.png"
                alt="stop"
              />
            </div>
            <h2 className="mt-2 font-semibold text-gray-800">Error 403</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              You are not authenticated to visit this page
            </p>
          </div>

          <div className="flex items-center mt-3">
            <button
              onClick={() => setCancel(!cancel)}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 ml-2 bg-red-600 hover:bg-red-800 text-white text-sm font-medium rounded-md"
            >
              Go back home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notauth;
