import axios from "axios";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Fetch user failed:", err);
      }
    }
  };

  useEffect(() => {
    fetchUser();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  ) : (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
