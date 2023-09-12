// import React, { useState,  } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { ProfileContext } from "../../hooks/profilecontext";
// const UserDeposit = () => {
//   const mydata = useContext(ProfileContext);
//   const Id = mydata.UserId;
//   const [err, seterr] = useState("");
//   const [amount, setInputamount] = useState("");
 
//   const handlesubmit = () => {
//     if (isNaN(amount)) {
      
//       seterr("Amount must be a number");
//     } else if(amount == "") {
//       alert("Please enter amount");
//     } else {
//       confirm("Are you sure you want to deposit");
//       seterr("");
//       console.info("Amount good");

//       ////////////////////////////////////////////////////
//       const options = {
//         method: "POST",
//         url: "/api/transaction",
//         headers: { "Content-Type": "application/json" },
//         data: { Id: mydata.UserId, amount: amount },
//       };

//       axios
//         .request(options)
//         .then(function (response) {
         
//           alert(
//             `Transaction Successfully new balance ${response.data.AccountBalance}`
//           );
//           setInputamount('')
//         })
    
//         .catch(function (error) {
//           console.error(error.response.data.error);
//           alert(error.response.data.error);
//         });

//     }
//   };
//   return (
//     <section className="p-4 w-8/12 mx-auto">
//       <div className="text-center capitalize text-red-600">{err}</div>
//       <h1 className="text-center underline text-2xl">Deposit</h1>
//       <div className=" grid gap-2 my-2">
//         <label className="font-medium" htmlFor="amount">
//           Amount
//         </label>
//         <input
//           value={amount}
//           className="border focus:border-primary outline-none p-2 rounded-md"
//           type="text"
//           name="amount"
//           id="amount"
//           autoComplete="off"
//           required
//           onChange={(e)=> setInputamount(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           className="ring rounded-md cursor-pointer accent-primary"
//           type="checkbox"
//           name="verify"
//           id="verify"
//           autoComplete="off"
//         />
//         <label className="" htmlFor="verify">
//           Please Verify The Amount Be Deposit
//         </label>
//       </div>
//       <div className="my-4 flex">
//         <button
//           onClick={handlesubmit}
//           className="p-2 border px-6  rounded-md font-medium mx-auto"
//           type="submit"
//         >
//           Deposit
//         </button>
//       </div>
//     </section>
//   );
// };

// export default UserDeposit;
import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ProfileContext } from "../../hooks/profilecontext";

const UserDeposit = () => {
  const mydata = useContext(ProfileContext);
  const [err, setErr] = useState("");
  const [amount, setAmount] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    if (isNaN(amount)) {
      setErr("Amount must be a number");
    } else if (amount === "") {
      setErr("Please enter an amount");
    } else if (amount == 0) {
      setErr("Amount cannot be less than 0");
    }else if (!isChecked) {
      setErr("Please verify the amount to be deposited");
    } else {
      const options = {
        method: "POST",
        url: "/api/transaction",
        headers: { "Content-Type": "application/json" },
        data: { Id: mydata.UserId, amount: amount },
      };

      axios
        .request(options)
        .then(function (response) {
          alert(
            `Transaction Successful, new balance: ${response.data.AccountBalance}`
          );
          setAmount("");
          setIsChecked(false);
          setErr("");
        })
        .catch(function (error) {
          console.error(error.response.data.error);
          setErr(error.response.data.error);
        });
    }
  };

  return (
    <section className="p-4 w-8/12 mx-auto">
      {err && <div className="text-center capitalize text-red-600">{err}</div>}
      <h1 className="text-center underline text-2xl">Deposit</h1>
      <div className="grid gap-2 my-2">
        <label className="font-medium" htmlFor="amount">
          Amount
        </label>
        <input
          value={amount}
          className="border focus:border-primary outline-none p-2 rounded-md"
          type="text"
          name="amount"
          id="amount"
          autoComplete="off"
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <input
          className="ring rounded-md cursor-pointer accent-primary"
          type="checkbox"
          name="verify"
          id="verify"
          autoComplete="off"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label className="" htmlFor="verify">
          Please Verify The Amount To Be Deposited
        </label>
      </div>
      <div className="my-4 flex">
        <button
          onClick={handleSubmit}
          className="p-2 border disabled:bg-gray-300 disabled:text-black bg-slate-800 text-white px-6 rounded-md font-medium mx-auto"
          type="submit"
          disabled={!isChecked}
        >
          Deposit
        </button>
      </div>
    </section>
  );
};

export default UserDeposit;
