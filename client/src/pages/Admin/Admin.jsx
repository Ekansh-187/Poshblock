import React, { useContext, useEffect, useState } from "react";
import Header from "../../partials/Header";
import Footer from "../../components/Footer";
import WelcomeBanner from "../../components/WelcomeBanner";
import { AgreementContext } from "../../context/AgreementProvider";
import Pending from "./Pending";
import All from "./All";
const Admin = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const { currentAccount, connectWallet, createAgreement } =
    useContext(AgreementContext);

  const renderTable = () => {
    switch (openTab) {
      case 2:
        return <All />;
      case 1:
        return <Pending />;
      default:
        return <>Please select an option</>;
    }
  };
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <header className="fixed top-0 left-0 w-full bg-white dark:bg-[#182235]  border-b border-slate-200 dark:border-slate-700 z-30">
            <div className="px-6 md:pl-0">
              <div className="flex items-center justify-between h-16 -mb-px">
                <div className="font-bold text-2xl flex items-center space-x-3 px-6 ">
                  ADMIN PAGE
                </div>

                <div className="flex items-center space-x-3">
                  <div>
                    {!currentAccount ? (
                      <button
                        onClick={() => connectWallet()}
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-400 hover:bg-red-700 focus:shadow-outline focus:outling-none background"
                        title="Connect your Metamask wallet"
                      >
                        Connect Wallet
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-400 hover:bg-green-700 focus:shadow-outline focus:outling-none background"
                        title="Connect your Metamask wallet"
                      >
                        Connected
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 sm:px-6 lg:px-8 py-8 mt-20 w-full max-w-9xl mx-auto">
            {" "}
            <main>
              <div className="relative container mx-auto flex flex-col min-h-screen">
                <div className="overflow-x-auto shadow-md mt-8 mb-8 sm:rounded-lg">
                  <div className="inline-block min-w-full align-middle dark:bg-gray-800">
                    <div className="p-4 mb-6">
                      <div className="flex md:justify-between items-center align-center">
                        <div>
                          <label htmlFor="table-search" className="sr-only">
                            Search
                          </label>
                        </div>
                      </div>

                      <div className="relative mt-1 flex flex-row justify-between">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search Username"
                        />
                        <div className="font-bold text-2xl flex items-center space-x-3 px-6 ">
                          <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                            role="tablist"
                          >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                              <a
                                className={
                                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                  (openTab === 1
                                    ? "text-white bg-slate-600"
                                    : "text-slate-600 bg-white")
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                              >
                                Pending
                              </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                              <a
                                className={
                                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                  (openTab === 2
                                    ? "text-white bg-slate-600"
                                    : "text-slate-600 bg-white")
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                              >
                                All
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden">{renderTable()}</div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
