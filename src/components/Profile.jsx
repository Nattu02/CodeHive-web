import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

 


  const { firstName, lastName, gender, role, skills, about } = user;

  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [userGender, setUserGender] = useState(gender);
  // const [userAge, setUserAge] = useState(age);
  const [userRole, setUserRole] = useState(role);
  const [userSkills, setUserSkills] = useState(skills);
  const [userAbout, setUserAbout] = useState(about);
  const [toast, setToast] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdate = async () => {
    if (!isEdit) return setIsEdit((value) => !value);
    try {
      const updatedUser = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName: fname,
          lastName: lname,
          gender: userGender,
          role: userRole,
          about: userAbout,
          skills: userSkills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(updatedUser?.data?.data));
      setToast(true);
      setIsEdit((value) => !value);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      {toast && (
        <div className="alert alert-success w-[20%] absolute left-[40%]">
          <span className="text-white font-bold text-center">
            Profile updated successfully.
          </span>
        </div>
      )}

      <div className="bg-gray-900">
        <h1 className="font-bold text-lg lg:text-2xl p-4 lg:p-5">Profile</h1>
      </div>
      <div className="grid grid-cols-12 gap-7 mx-[8%] h-[100%] my-[2%]">
        <div className="col-span-12 md:col-span-4  flex flex-col items-center justify-center border-2 rounded-2xl shadow-2xl shadow-neutral-900 border-zinc-500">
          <figure className="h-[150px] w-[150px] m-3">
            <img
              src={
                "https://dpemoji.com/wp-content/uploads/2023/12/vijay-photos27.jpg"
              }
              alt="user image"
              className="rounded-xl"
            />
          </figure>
          <h2 className="text-2xl font-bold pt-2">{fname + " " + lname}</h2>
          <h4 className="text-xl font-semibold m-2">{userRole}</h4>
        </div>
        <div className="col-span-12 md:col-span-8 p-4 border-2 rounded-2xl shadow-2xl shadow-neutral-900 border-zinc-500">
          <p className="font-bold text-lg lg:text-2xl border-b-3 border-white pb-1 w-fit">
            Basic Info
          </p>
          <div className="grid grid-cols-2 gap-6 mx-3 my-5">
            <div className="col-span-2 lg:col-span-1">
              <p className="text-sm text-gray-500 font-bold">First name</p>
              {isEdit && (
                <input
                  type="text"
                  className="input mt-3"
                  placeholder="First name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              )}
              {!isEdit && (
                <span className="block text-xl font-semibold text-white mt-3">
                  {fname}
                </span>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="text-sm text-gray-500 font-bold">Last name</p>
              {isEdit && (
                <input
                  type="text"
                  className="input mt-3"
                  placeholder="Last name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              )}
              {!isEdit && (
                <span className="block text-xl font-semibold text-white mt-3">
                  {lname}
                </span>
              )}
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="text-sm text-gray-500 font-bold">Gender</p>
              {isEdit ? (
                <select
                  value={userGender}
                  onChange={(e) => setUserGender(e.target.value)}
                  className="select mt-3"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span className="block text-xl font-semibold text-white mt-3">
                  {userGender || "Not specified"}
                </span>
              )}
            </div>

            <div className="col-span-2 lg:col-span-1">
              <p className="text-sm text-gray-500 font-bold">Role</p>
              {isEdit && (
                <input
                  type="text"
                  className="input mt-3"
                  placeholder="Role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                />
              )}
              {!isEdit && (
                <span className="block text-xl font-semibold text-white mt-3">
                  {userRole}
                </span>
              )}
            </div>
          </div>

          <p className="font-bold text-lg lg:text-2xl border-b-3 border-white pb-1 w-fit">
            Skills & About
          </p>
          <div className="grid grid-cols-2 gap-6 m-3 my-5">
            <div className="col-span-2">
              <p className="text-sm text-gray-500 font-bold">Skills</p>
              {isEdit && (
                <input
                  type="text"
                  className="input m-3 w-[90%]"
                  placeholder="Skills (comma separated)"
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                />
              )}
              {!isEdit && (
                <span className="block text-xl font-semibold text-white mt-3">
                  {userSkills.join(", ")}
                </span>
              )}
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500 font-bold">About</p>
              {isEdit && (
                <input
                  type="text"
                  className="input m-3 w-[90%]"
                  placeholder="Description"
                  value={userAbout}
                  onChange={(e) => setUserAbout(e.target.value)}
                />
              )}
              {!isEdit && (
                <span className="block text-xl font-semibold text-white mt-3">
                  {userAbout}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="px-5 py-2 w-fit font-bold bg-blue-600 rounded-4xl fixed right-10 bottom-5 cursor-pointer"
        onClick={() => handleUpdate()}
      >
        {isEdit ? "Save changes" : "Edit Profile"}
      </button>
    </div>
  );
};
export default Profile;
