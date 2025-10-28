import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setISLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(user.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm mx-auto md:my-[5%] sm:my-[20%] my-[30%]">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLogin && (
              <div>
                <label className="input my-5">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M5.5 21a7.5 7.5 0 0 1 13 0"></path>
                    </g>
                  </svg>

                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    minLength="4"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="input my-5">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M5.5 21a7.5 7.5 0 0 1 13 0"></path>
                    </g>
                  </svg>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    minLength="4"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </label>
              </div>
            )}
            <label className="input validator my-5">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="Email id"
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="input validator my-5">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="font-bold text-red-500">{error}</p>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => (isLogin ? handleLogin() : handleSignup())}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <div
            className="mx-auto mt-5 cursor-pointer hover:underline hover:font-bold"
            onClick={() => {
              setISLogin((value) => !value);
            }}
          >
            <p>{isLogin ? "New user? Sign Up" : "Already a user? Login"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
