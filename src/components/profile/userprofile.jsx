import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../../hooks/profilecontext";
import useSWR from "swr";
import { Button } from "@tremor/react";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const userprofile = () => {
  const mydata = useContext(ProfileContext);
  const [status, setStatus] = useState();
  const my = mydata;
  const { id } = useParams();

  const { data, error, isLoading } = useSWR(
    "/api/accounts/profile/" + id,
    fetcher
  );
  if (isLoading) return <div>isloading</div>;
  if (error) return <div className="text-5xl"> NO User Founded</div>;
  console.log(data.length >= 1);
  function createAccount() {
    const options = {
      method: "POST",
      url: "http://localhost:4000/api/accounts",
      headers: { "Content-Type": "application/json" },
      data: { UserId: id, status: "Active" },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  }

  // if (data.length === 0 || data.length === undefined)
  //   return (
  //     <div className="flex justify-center items-center space-y-5 flex-col">
  //       <p>No account Associated to this user</p>
  //       <button
  //         onClick={createAccount}
  //         className="border py-2 px-4 rounded-md bg-green-600 font-medium text-white"
  //       >
  //         Create Account
  //       </button>
  //     </div>
  //   );

  const handlestatus = () => {
    const options = {
      method: "PATCH",
      url: `/api/accounts/toggle/${id}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setStatus(response.data.status);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  console.log(status);
  return (
    <aside className="border py-4 rounded-md bg-white p-2 md:w-4/12">
      {status == "" || status == undefined ? (
        <div className="flex justify-center items-center space-y-5 flex-col">
          <p>No account Associated to this user</p>
          <button
            onClick={createAccount}
            className="border py-2 px-4 rounded-md bg-green-600 font-medium text-white"
          >
            Create Account
          </button>
        </div>
      ) : (
        <article className="border relative">
          <Button
            onClick={handlestatus}
            className={`absolute cursor-pointer right-2 top-2 px-6 outline-2 p-2 rounded-md border capitalize ${
              status === "Active"
                ? "bg-blue-500 hover:bg-blue-800"
                : status === "Blocked"
                ? "bg-red-500 hover:bg-red-800"
                : ""
            }`}
          >
            {status || data?.userStatus}
          </Button>

          <div className="p-2 my-4  mx-auto grid justify-center">
            <img
              className="rounded-full h-36 w-36"
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="profile"
            />
          </div>
          <div className="grid mb-4 justify-center">
            <p className="capitalize font-medium">{my?.fullName}</p>
            <p className="text-center text-gray-600">{my?.role}</p>
          </div>
          <section className="grid px-6 gap-y-4 divide-y-2 border p-2">
            <div className="flex justify-between">
              <h1
                className="font-medium capitalize
                    text-lg"
              >
                Account Balance
              </h1>
              <p>{data?.balance || 0} RWF</p>
            </div>
            <div className="flex justify-between">
              <h1
                className="font-medium capitalize
                    text-lg"
              >
                Total deposit
              </h1>
              <p>{data?.total_debits || 0} RWF</p>
            </div>
            <div className="flex justify-between">
              <h1
                className="font-medium capitalize
                    text-lg"
              >
                Total withdraw
              </h1>
              <p>{data?.total_credits || 0} RWF</p>
            </div>
          </section>
        </article>
      )}
    </aside>
  );
};

export default userprofile;
