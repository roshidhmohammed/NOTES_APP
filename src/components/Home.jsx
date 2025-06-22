import { FaSearch } from "react-icons/fa";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import useFetchAllNotes from "../hooks/useFetchAllNotes";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setShowFilterContainer } from "../utils/slices/configSlice";
import Filter from "./Filter";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [update, setUpdate] = useState(false);
  useFetchAllNotes(search, filter, update);
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.note.allNotes);
  const showFilter = useSelector((state) => state.config.showFilterContainer);

  const handleNewNote = async () => {
    await axiosInstance
      .post("/note/create", {}, { withCredentials: true })
      .then((res) => {
        navigate(`/note/${res?.data?.noteId}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleDelete = async (id) => {
    await axiosInstance
      .delete(`/note/delete/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setUpdate(!update);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" text-white mt-1 w-full ml-5 px-10 h-[89vh] pb-5 pt-10 overflow-y-scroll">
      <div className=" flex justify-between items-center flex-wrap sm:gap-0 gap-5">
        <div className=" relative">
          <FaSearch className=" absolute left-4 top-1/3 text-lg text-gray-600" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" border py-3 rounded-lg border-gray-700 md:w-[500px] w-[200px] pl-10"
            placeholder="Search your notes"
          />
        </div>
        <div>
          <button
            onClick={() => dispatch(setShowFilterContainer())}
            className=" border  p-2 px-5 border-gray-600 rounded-lg hover:cursor-pointer hover:bg-red-700 hover:ease-in-out"
          >
            Filter
          </button>
        </div>
      </div>

      {showFilter && <Filter filter={filter} setFilter={setFilter} />}

      <div className=" my-10">
        <button
          onClick={() => handleNewNote()}
          className="  p-2 px-5  rounded-lg hover:cursor-pointer bg-orange-500 hover:bg-orange-700 hover:ease-in-out"
        >
          Create New Notes
        </button>
      </div>

      <div className=" grid  gap-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
        {allNotes?.map((note) => (
          <Notes key={note?._id} note={note} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
