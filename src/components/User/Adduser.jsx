import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { id } from "../getid";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  UserId: yup.string().required(),
  fullName: yup.string().required("Your Full Name is required"),
  email: yup
    .string()
    .email("invalid Email input")
    .required("Email is required"),
  tel: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(7, "Phone number is not valid")
    .max(13, "Phone number is not valid")
    .required(),
  gender: yup.string().notRequired(),
  password: yup.string().default("")

});
function Adduser() {
  var olduuid = id();
  var newwid = olduuid;
  const [Card, setCard] = useState("");
  useEffect(() => {
    if (olduuid || newwid) {
       console.log("Adding");
      setCard(olduuid);
      setFocus("UserId")
    }
   
  }, [olduuid]);

  const navigate = useNavigate();
  const {
    register,
    resetField,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      UserId: Card,
      
    },
  });
  const onSubmit = (data, e) => {
    if (Card === "waiting ..") {
      return alert("Please wait the card is not initialized")
    }
    console.log(data);
    const options = {
      method: "POST",
      url: "/api/users",
      headers: { "Content-Type": "application/json" },
      config: { headers: { "Content-Type": "multipart/form-data" } },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        resetField("UserId");
        window.location.reload();
        e.target.reset()
        console.log(response.data.message);
        navigate("users/adduser", { replace: true });
        alert(response.data.message);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      });
  };

  //if (!isVisible) return null;
  // const haddleClose = (e) => {
  //   if (e.target.id === "modal") onClose();
  // };

  const haddleClose = (e) => {
    if (e.target.id === "modal") return navigate("/admin/users");
  };

  return (
    <main
      id="modal"
      onClick={haddleClose}
      className="fixed flex z-20  inset-0 bg-black bg-opacity-25 backdrop-blur-[1px] justify-center items-center"
    >
      <article className="bg-white z-20 border-b-2 border-primary w-10/12 md:w-7/12 rounded-md">
        <div className="bg-primary py-4 rounded-tr-md rounded-tl-md">
          <h1 className="text-center  text-white capitalize font-medium underline underline-offset-4">
            Add new user
          </h1>
        </div>
        <section className="grid p-4 space-y-2">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <label className="capitalize font-medium" htmlFor="UserId">
                User ID
              </label>
              <input
                value={Card}
                id="UserId"
                {...register("UserId", { required: true })}
                type="text"
                placeholder="734573945"
                className="border font-sans font-normal text-gray-800 p-1 w-full rounded-md"
              />
              <p className="text-xs float-right text-red-600">
                {errors.UserId?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <label className="capitalize" htmlFor="fullName">
                full Name
              </label>
              <input
                id="fullName"
                {...register("fullName", { required: true })}
                type="text"
                placeholder="ishimwe sage"
                className="border border- font-sans font-normal text-gray-800 p-1 w-full rounded-md"
              />
              <p className="text-xs float-right text-red-600">
                {errors.fullName?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <label className="capitalize" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                id="email"
                type="email"
                placeholder="ish.sage@gmail.com"
                className="border border- font-sans font-normal text-gray-800 p-1 w-full rounded-md"
              />
              <p className="text-xs float-right text-red-600">
                {errors.email?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <label className="capitalize" htmlFor="tel">
                tel
              </label>
              <input
                {...register("tel", { required: true })}
                id="tel"
                type="tel"
                placeholder="+250734573945"
                className="border border- font-sans font-normal text-gray-800 p-1 w-full rounded-md"
              />
              <p className="text-xs float-right text-red-600">
                {errors.tel?.message}
              </p>
            </div>
            <div className="grid gap-2">
              <select
                {...register("gender", { required: true })}
                id="gender"
                type="text"
                placeholder="734573945"
                className="border  font-sans font-normal text-gray-800 p-1 w-full rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <p className="text-xs float-right text-red-600">
                {errors.gender?.message}
              </p>
            </div>
            <div className="grid my-4 rounded-md justify-center border-2 group cursor-pointer hover:bg-primary border-primary">
              <button
                type="submit"
                className="py-1 px-4 font-mono capitalize group-hover:text-white text-center"
              >
                submit
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
}

export default Adduser;
