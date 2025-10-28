import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();

  const getFeed = async () => {
    if (!user) return navigate("/login");
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading feed...</p>
      </div>
    );
  if (feed.length === 0) {
    return (
      <div className="w-1/2 bg-base-300 h-20 m-auto my-[5%] flex justify-center items-center rounded-xl">
        <h1 className="font-bold sm:text-xl md:text-2xl text-md">
          No new users...
        </h1>
      </div>
    );
  }
  return (
    feed && (
      <div className="flex items-center flex-col">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
