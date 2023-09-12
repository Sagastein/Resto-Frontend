import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);
var nana;
export const id = () => {
  const { data, error } = useSWR("/api/ca", fetcher);

  if (error) return (nana = `server error`);

  return (nana = data);
};
