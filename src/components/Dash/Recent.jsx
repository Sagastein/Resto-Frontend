import axios from "axios";
import useSWR from "swr";
import { Card, Title } from "@tremor/react";
import { BiTime } from "react-icons/bi";
const fetcher = (url) => axios.get(url).then((res) => res.data);
const RecentData = [
  {
    id: "95a0eb14-dbdf-42f5-82bb-506f6b5307c2",
    userid: 2,
    username: "gasana deny",
    amount: 500,
    transactionType: "debit +",
    accountBalance: 1000,
    timeAgo: "a day ago",
  },
];
function Recent() {
  const { data, error, isLoading } = useSWR("/api/transaction/recent", fetcher);
  if (isLoading) return <div>is laoding</div>;
  if (error) return <div>errror to the server</div>;

  return (
    <Card className="grid p-4 space-y-4">
      <Title className="underline whitespace-nowrap underline-offset-8">
        Recent Transactions <BiTime className="inline" />
      </Title>
      {data && data.length ? (
        data.map((item) => (
          <section
            key={item.id}
            className="bg-gray-100 p-2 py-2 leading-7  hover:shadow-lg hover:scale-95 cursor-pointer  rounded-md shadow"
          >
            <div className="flex flex-wrap justify-between">
              <h1 className="capitalize font-medium">{item.username}</h1>
              <span className="text-xs font-thin">{item.timeAgo}</span>
            </div>
            <div className="flex flex-wrap justify-between">
              <span className="text-xs font-mono font-medium">
              Bal:{item.accountBalance}<code>Rwf</code>
              </span>
              <span className="text-xs font-light capitalize text-gray-500">
                {item.transactionType} {item.amount} Rwf
              </span>
            </div>
          </section>
        ))
      ) : (
        <div className="capitalize text-center border py-8 rounded-md bg-green-700/30 text-green-500">
          no recent data 📄
        </div>
      )}
    </Card>
  );
}

export default Recent;
