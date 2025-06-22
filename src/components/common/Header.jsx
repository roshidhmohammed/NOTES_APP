import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axiosInstance
      .post("/user/logout", {}, { withCredentials: true })
      .then((res) => {
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <>
      <div className="py-4 border-b border-gray-700 flex justify-between items-center px-10 text-white">
        <div>
          <h1 className=" text-xl font-bold">NOTES_APP</h1>
        </div>
        <div>
          <button
            className=" bg-red-700 p-2 px-5 hover:cursor-pointer rounded-lg"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
