import React from "react";
import { RiCoinsLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Bold, Metric } from "@tremor/react";
function Cards() {
  return (
    <main className="grid max-w-[1700px] border gap-y-4 md:grid-cols-2 lg:grid-cols-4">
      <section className="border-2 py-4  xl:h-[20vh] border-t-4 border-t-primary flex items-center justify-between bg-white p-4 mx-2 rounded-md">
        <div>
          <Bold className="font-medium text-2xl  font-sans">Total users</Bold>
          <div>
            <Metric className="my-2 h-12 w-12 inline font-semibold">355</Metric>
            <span className="mx-1">People</span>
          </div>
        </div>
        <FaUsers className="inline bg-primary/70 p-2 my-auto rounded-full text-6xl" />
      </section>
      <section className="border-2 border-t-4 border-t-primary flex justify-between bg-white p-4 mx-2 rounded-md">
        <div>
          <span className="font-medium font-sans">Today's Income</span>
          <p>122 K</p>
        </div>
        <RiCoinsLine className="inline text-4xl" />
      </section>
      <section className="border-2 border-t-4 border-t-pink-700 bg-white p-4 mx-2 rounded-md">
        <span className="font-medium font-sans">Total Balance</span>
        <p>122 K</p>
      </section>
      <section className="border-2 border-t-4  border-t-green-600 bg-white p-4 mx-2 rounded-md">
        <span className="font-medium font-sans">Today's Income</span>
        <p>122 K</p>
      </section>
    </main>
  );
}

export default Cards;
