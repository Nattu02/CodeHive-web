import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
