
import Userprofile from "../components/profile/userprofile";
import Usermain from "../components/profile/usermain";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import { ProfileContext } from "../hooks/profilecontext";
const fetcher = (url) => axios.get(url).then((res) => res.data);
const Profile = () => {
  const { id } = useParams();
  console.log("id is 2:", id);
  const { data, error, isLoading } = useSWR("/api/users/" + id, fetcher);
  if (isLoading) return <div>isloading</div>;
  if(!data) return <div>No User Found With This Id</div>;
  if (error) return <p>Error Error user</p>;

  console.log("profile data profile:", data);
  const da = data;
  return (
    <main className="md:flex h-[90%] md:h-auto  pb-4  gap-4 gap-y-4 m-4">
      {""}
      <ProfileContext.Provider value={da}>
        <Userprofile />
        <Usermain />
      </ProfileContext.Provider>
    </main>
  );
};

export default Profile;
