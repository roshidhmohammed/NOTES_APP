import { setShowFilterContainer } from "../utils/slices/configSlice";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

const Filter = ({ filter, setFilter }) => {
  const dispatch = useDispatch();

  return (
    <div className=" absolute top-0 right-0 left-0 bottom-0 text-white  z-50 bg-gray-500/10 mx-auto my-auto flex items-center justify-center">
      <div className=" bg-[#232325] p-3 rounded-lg w-3/4 min-h-[85vh] overflow-y-scroll mt-4 pb-10">
        <div className=" flex justify-end mr-5">
          <IoClose
            className=" text-3xl hover:cursor-pointer"
            onClick={() => dispatch(setShowFilterContainer())}
          />
        </div>

        <div className=" w-full flex justify-center gap-5 items-center">
          <label className=" text-lg ">Filter the notes by you as:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-md border bg-gray-800 text-white"
          >
            <option value="creator"> a creator</option>
            <option value="colloborator">a colloborator</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
