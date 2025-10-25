import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const { _id, firstName, lastName, age, gender, profile } = user;

  const handleRequest = async (choice, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + choice + "/" + id,
        {},
        { withCredentials: true }
      );
      const updatedFeed = feed.slice(1);
      dispatch(addFeed(updatedFeed));
    } catch (err) {
      console.log(err);
    }
  };
  if (!user) return;
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm my-4">
        <figure className="px-10 pt-10">
          <img src={profile} alt="user image" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age + ", " + gender}</p>
          <div className="card-actions">
            <button
              className="btn btn-primary mx-1"
              onClick={() => {
                handleRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary mx-1"
              onClick={() => {
                handleRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
