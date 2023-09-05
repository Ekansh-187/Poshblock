import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const All = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getAll"],
    queryFn: async () =>
      await newRequest.get(`/admin/archive`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    refetch();
  });

  const handleTransact = async () => {};
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
              Status
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
                {c.uploaded ? "Uploaded" : "Awaiting"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default All;
