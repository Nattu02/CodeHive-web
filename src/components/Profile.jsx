import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import UserCard from "./userCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { firstName, lastName, gender, profile } = user;

  const [fName, setFname] = useState(firstName);
  const [lName, setLname] = useState(lastName);
  const [gend, setGender] = useState(gender);
  const [prof, setProfile] = useState(profile);
  const [toast, setToast] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedUser = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName: fName,
          lastName: lName,
          gender: gend,
          profile: prof,
        },
        {
          withCredentials: true,
        }
      );
      console.log(updatedUser.data.data);
      dispatch(addUser(updatedUser?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {toast && (
        <div className="alert alert-success mx-auto w-[25%]">
          <span className="text-white font-bold text-center">
            Profile updated successfully.
          </span>
        </div>
      )}
      <div className="flex justify-center">
        <div className="card bg-base-200 w-96 shadow-sm my-4 mx-[50px]">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="First name"
                value={fName}
                onChange={(e) => setFname(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Last name"
                value={lName}
                onChange={(e) => setLname(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                placeholder="Gender"
                value={gend}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Profile</legend>
              <input
                type="text"
                className="input"
                placeholder="Profile url"
                value={prof}
                onChange={(e) => setProfile(e.target.value)}
              />
            </fieldset>

            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save profile
              </button>
            </div>
          </div>
        </div>
        <UserCard user={user} />
      </div>
    </>
  );
};

export default Profile;
