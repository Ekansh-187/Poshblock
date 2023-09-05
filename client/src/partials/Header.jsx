import React, { useState } from "react";
import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import { Link, useLocation } from "react-router-dom";
import { Squeeze as Hamburger } from "hamburger-react";
function Header({ setSelected, setData }) {
  const location = useLocation();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let Links = [
    { name: "View Uploads", link: "/uploaded" },
    { name: "Create New", link: "/createNew" },
    { name: "Check Status", link: "/status" },
    { name: "View All", link: "/viewAll" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-none z-30 backdrop-blur-sm shadow">
      <div className="px-6 md:pl-0">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center ">
            <ul
              className={`md:flex md:items-center md:pb-0 pb-4 absolute light:bg-white md:static left-0 w-full md:w-auto md:pl-0 pl-5 transition-all duration-200 ${
                open
                  ? "top-20 opacity-100  backdrop-blur-xl dark:text-white overflow-hidden overflow-y-auto"
                  : "top-[-490px] md:opacity-100 opacity-0 "
              }`}
            >
              <li className="flex justify-between">
                <Link
                  to={"/"}
                  className=" md:block md:ml-5 md:my-0 my-7 cursor-pointer font-bold"
                >
                  Home
                </Link>
              </li>
              {currentUser ? (
                Links.map((l, i) => (
                  <li className={`flex justify-between font-bold `} key={i}>
                    <Link
                      to={l.link}
                      className="md:pr-3 md:block md:ml-8 md:my-0 my-7 cursor-pointer"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex justify-between">
                    <Link
                      to={"/login"}
                      className="md:pr-6 font-bold md:block md:ml-8 md:my-0 my-7 cursor-pointer"
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Hamburger button */}
            <div className="text-3xl absolute md:hidden">
              <Hamburger toggled={open} toggle={setOpen} duration={0.1} />
            </div>
          </div>
          {/* Header: Right side */}
          {currentUser && (
            <div className="flex items-center space-x-3">
              <div>
                <button
                  className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full ml-3 ${
                    searchModalOpen && "bg-slate-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchModalOpen(true);
                  }}
                  aria-controls="search-modal"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current text-slate-500 dark:text-slate-400"
                      d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                    />
                    <path
                      className="fill-current text-slate-400 dark:text-slate-500"
                      d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                    />
                  </svg>
                </button>
                <SearchModal
                  id="search-modal"
                  searchId="search"
                  modalOpen={searchModalOpen}
                  setModalOpen={setSearchModalOpen}
                />
              </div>
              <Notifications align="right" />
              <Help align="right" />

              {/*  Divider */}
              <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
              <UserMenu align="right" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
