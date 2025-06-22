import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchColloboratorsList from "../hooks/useFetchColloboratorsList";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import {
  setLoading,
  setShowCcolloboratorLists,
} from "../utils/slices/configSlice";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const ShareColloboratorLists = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useFetchColloboratorsList(id);
  const colloboratorLists = useSelector(
    (state) => state.note.colloboratorLists
  );
  const [role, setRole] = useState("viewer");

  const handleRole = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
  };

  const handleShareColloborator = async (colloboratorId) => {
    await axiosInstance
      .patch(
        `/note/add/colloborator/${id}`,
        { colloboratorId, role },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setLoading());
        dispatch(setShowCcolloboratorLists());
        toast.success(res.data.message);
      })
      .catch((error) => {
        dispatch(setLoading());
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" absolute top-0 right-0 left-0 bottom-0 text-white  z-50 bg-gray-500/10 mx-auto my-auto flex items-center justify-center">
      <div className=" bg-[#232325] p-3 rounded-lg w-3/4 min-h-[85vh] overflow-y-scroll mt-4 pb-10">
        <div className=" flex justify-end mr-5">
          <IoClose
            className=" text-3xl hover:cursor-pointer"
            onClick={() => dispatch(setShowCcolloboratorLists())}
          />
        </div>
        <h1 className=" text-center text-lg my-10">Invite Colloborators</h1>

        <div className=" flex-col flex gap-5 mt-5">
          {colloboratorLists?.map((colloborator) => (
            <div
              key={colloborator?._id}
              className=" bg-[#141415] p-3 rounded-lg shadow-md flex justify-between items-center"
            >
              <h1 className=" text-lg font-bold">{colloborator?.userName}</h1>
              <div className=" flex justify-between gap-5 items-center">
                <select
                  value={role}
                  onChange={handleRole}
                  className="p-2 rounded-md border bg-gray-800 text-white"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
                <div>
                  <button
                    onClick={() => handleShareColloborator(colloborator?._id)}
                    className=" bg-blue-700 text-white rounded-lg  p-2 px-4 hover:cursor-pointer hover:bg-blue-800"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className=" bg-[#141415] p-3 rounded-lg shadow-md">
            <h1>sample</h1>
          </div>
          <div className=" bg-[#141415] p-3 rounded-lg shadow-md">
            <h1>sample</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareColloboratorLists;
