import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
export default func = useQuery({
  queryKey: ["searchUser"],
  queryFn: async () =>
    await newRequest.get(`/users/getAll?email=${name}`).then((res) => {
      var l = [];
      res.data?.forEach((d) => {
        if (curr._id !== d._id) l.push({ value: d._id, label: d.username });
      });
      setList(l);
      return res.data;
    }),
});
