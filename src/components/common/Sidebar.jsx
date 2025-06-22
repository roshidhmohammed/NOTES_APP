import { CgNotes } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const locatePath = useLocation();
  const currentPathName = locatePath.pathname;

  return (
    <div className=" md:w-60">
      <div className=" text-white">
        <ul className="py-10  flex  flex-col gap-5 text-gray-300">
          <Link to="/home">
            <li
              className={` py-2 text-lg hover:cursor-pointer px-5 rounded-r-lg  flex  items-center gap-2 hover:bg-gray-400/20 ${
                currentPathName === "/home" ? "bg-gray-400/10" : ""
              }`}
            >
              <CgNotes size={22} />{" "}
              <span className=" md:block hidden">Notes</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
