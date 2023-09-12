import React from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";
const fetcher = (url) => axios.get(url).then((res) => res.data);
const UserTransactions = () => {
  const { id } = useParams();
  console.log("id is 2:", id);
  const { data, error, isLoading } = useSWR("/api/transaction/" + id, fetcher);
  if (isLoading) return <div>isloading</div>;
  if (!data) return <div>data is undefined</div>;
  if (error) return <p>Error Transaction</p>;
  console.log("error",error);
  console.log("user Transaction", data);
  return (
    <main>
      <h1 className="capitalize text-2xl h-full text-center mb-2">
        Transactions
      </h1>
      <div className="w-11/12 lg:h-[65vh] overflow-auto   mx-auto">
        <table className="w-full  border-collapse">
          <thead className="border">
            <tr>
              <th>N0</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.UserId}</td>
                <td>{item.mode}</td>
                <td>{item.amount}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UserTransactions;
