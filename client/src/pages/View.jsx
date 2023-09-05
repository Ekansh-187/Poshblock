import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
const View = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getSingle"],
    queryFn: async () =>
      await newRequest.get(`/contracts/${location.state}`).then((res) => {
        return res.data;
      }),
  });
  refetch();
  console.log(data);

  return <div>{location.state}</div>;
};

export default View;
