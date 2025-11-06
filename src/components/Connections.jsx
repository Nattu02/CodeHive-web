import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useEffect } from "react";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    // if (connections != null) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);
  //   console.log(connections);

  if (connections === null) return;

  if (connections.length === 0)
    return (
      <div className="w-1/2 bg-base-300 h-20 m-auto my-[5%] flex justify-center items-center rounded-xl">
        <h1 className="font-bold sm:text-xl md:text-2xl text-md">
          No connections available...
        </h1>
      </div>
    );
  return (
    <>
      {connections.map((connection) => {
        const { _id, firstName, lastName, profile, role, about } = connection;

        return (
          <div
            key={_id}
            className="flex w-1/3 justify-around bg-base-300 my-5 h-25 items-center mx-auto rounded-xl"
          >
            <img src={profile} className="w-20 h-20 rounded-full"></img>
            <div>
              <h1>{firstName + " " + lastName}</h1>
              <h3>{role}</h3>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Connections;
