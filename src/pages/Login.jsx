import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSignIn, useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  useEffect(() => {
    if (isAuthenticated() && auth().role === "user") {
      return navigate("/admin", { replace: true });
    }
    if (isAuthenticated() && auth().role === "superadmin") {
      return navigate("/superadmin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = useSignIn();
  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      url: "api/users/login",
      headers: { "Content-Type": "application/json" },
      data: { email: email, password: password },
    };
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if (
          signIn({
            token: response.data.token,
            tokenType: "Bearer",
            expiresIn: 3600,
            authState: {
              uuid: response.data.uuid,
              id: response.data.token,
              fullName: response.data.fullName,
              role: response.data.user.role,
            },
          })
        )
          if (response.data.user.role === "user") {
            setLoading(false);
            return navigate("/admin", { replace: true });
          }
        if (response.data.user.role === "superadmin") {
          setLoading(false);
          return navigate("/superadmin", { replace: true });
        }
      })
      .catch(function (error) {
        setLoading(false);
        return alert(error.response.data.error);
      });
  };
  return (
    <main className="flex bg-primary h-screen md:grid-cols-2">
      <aside className="border w-full">
        <img
          className="h-full object-cover w-full"
          loading="lazy"
          src="https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg"
          alt=""
        />
      </aside>
      <aside className="border w-11/12 2xl:w-10/12 border-blue-500 flex justify-center items-center">
        <form
          autoComplete="off"
          className="border md:w-8/12 w-11/12 2xl:w-6/12 mx-auto shadow space-y-3 bg-white p-4 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-x-4 items-center">
            <FaUserShield className="text-3xl" />
            <h1 className="text-4xl">Login Form</h1>
          </div>
          <div className="grid">
            <label className="capitalize" htmlFor="username">
              username
            </label>
            <input
              className="p-2 outline-none border rounded-md  bg-slate-100"
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              placeholder="ish"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="grid">
            <label className="capitalize" htmlFor="password">
              password
            </label>
            <input
              className="p-2 outline-none border rounded-md  bg-slate-100"
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid">
            <button className="border hover:bg-blue-600 py-2 rounded-md text-black">
              {loading ? "loading ..." : "Submit"}
            </button>
          </div>
          <div className="grid justify-end">
            <p className="">
              Forgot password{" "}
              <a className="text-main" href="#">
                Link
              </a>
            </p>
          </div>
        </form>
      </aside>
    </main>
  );
}

export default Login;
