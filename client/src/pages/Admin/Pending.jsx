import React, { useEffect, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { AgreementContext } from "../../context/AgreementProvider";

const Pending = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const { createAgreement } = useContext(AgreementContext);
  const title = "sample contract";
  const creatorId = "123";
  const receiverId = "456";
  const docLink = "docLink";
  const span = "span";
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () =>
      await newRequest.get(`/admin`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    refetch();
  });

  const handleTransact = async () => {
    setLoading(true);
    await createAgreement({
      title,
      creatorId,
      receiverId,
      docLink,
      span,
    });
    console.log(status);
    await newRequest.put("/admin", { id });
    setLoading(false);
  };
  return (
    <>
      <table className="min-w-full table-fixed dark:divide-gray-700 divide-y divide-green-400 ">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-search-all"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-search-all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              ID
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              Request Date
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
            >
              Deploy
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {data?.map((c) => (
            <tr
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              key={c.request}
            >
              <td className="p-4 w-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {c.request}
              </td>

              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {c.date}
              </td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <button
                  onClick={() => {
                    console.log(c.request);
                    setId(c.request);
                    handleTransact();
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    "Deploying"
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Pending;
