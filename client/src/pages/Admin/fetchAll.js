import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
export default func = useQuery({
  queryKey: ["getContract"],
  queryFn: async () =>
    await newRequest.get(`/contracts/all`).then((res) => {
      return res.data;
    }),
});
