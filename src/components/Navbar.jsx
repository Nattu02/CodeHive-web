import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", null, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm h-20">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          🧑‍💻CodeHive
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <p className="font-bold">Hi {user.firstName}!</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-5"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.profile} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
