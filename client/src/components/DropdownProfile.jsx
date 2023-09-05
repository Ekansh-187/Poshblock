import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../utils/Transition";
import newRequest from "../utils/newRequest";
import UserAvatar from "../images/user-avatar-32.png";

function DropdownProfile({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate();

  const { id } = useParams();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleLogout = async (e) => {
    setDropdownOpen(!dropdownOpen);
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="relative inline-flex">
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
        >
          <img
            className="w-8 h-8 rounded-full"
            src={
              currentUser?.img ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png?20201213175635"
            }
            width="32"
            height="32"
            alt="User"
          />
          {currentUser && (
            <div className="flex items-center truncate">
              <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                {currentUser?.username}
              </span>
              <svg
                className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                viewBox="0 0 12 12"
              >
                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
              </svg>
            </div>
          )}
        </button>
        {currentUser && (
          <Transition
            className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
              align === "right" ? "right-0" : "left-0"
            }`}
            show={dropdownOpen}
            enter="transition ease-out duration-200 transform"
            enterStart="opacity-0 -translate-y-2"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
          >
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
            >
              <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
                <div className="font-medium text-slate-800 dark:text-slate-100">
                  {currentUser?.username}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {!currentUser?.isFirm ? "Individual Account" : "Firm"}
                </div>
              </div>
              <ul>
                <li>
                  <Link
                    to={"/pricing"}
                    className="font-medium text-sm space-x-1 text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3 cursor-pointer"
                  >
                    <span class>Upgrade Plan</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="gray"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <div
                    className="font-medium text-sm space-x-1 text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <span class>Sign Out</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="gray"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </Transition>
        )}
      </div>
    </>
  );
}

export default DropdownProfile;
