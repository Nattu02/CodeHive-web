import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const pendingRequests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/pending", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.pendingRequests));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (status, reqId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + reqId,
        null,
        { withCredentials: true }
      );
      dispatch(removeRequest(reqId));
    } catch (err) {
      console.log(err);
    }
  };

  if (pendingRequests === null) return;

  if (pendingRequests.length === 0)
    return (
      <div className="w-1/2 bg-base-300 h-20 m-auto my-[5%] flex justify-center items-center rounded-xl">
        <h1 className="font-bold sm:text-xl md:text-2xl text-md">
          No pending requests...
        </h1>
      </div>
    );

  return (
    <div>
      {pendingRequests.map((request) => {
        const { _id } = request;
        const { firstName, lastName, gender, age, profile } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex w-1/3 justify-around bg-base-300 my-5 h-25 items-center mx-auto rounded-xl"
          >
            <img src={profile} className="w-20 h-20 rounded-full"></img>
            <div>
              <h1>{firstName + " " + lastName}</h1>
              <p>{age + ", " + gender}</p>
            </div>
            <div>
              <button
                className="btn btn-active btn-primary mx-2"
                onClick={() => {
                  handleRequest("accepted", _id);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-active btn-error mx-2"
                onClick={() => {
                  handleRequest("rejected", _id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
