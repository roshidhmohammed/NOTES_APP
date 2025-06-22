import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import { addAllNotes } from "../utils/slices/noteSlice";
import { toast } from "react-toastify";

const useFetchAllNotes = (search, filter, update) => {
  const dispatch = useDispatch();

  const fetchAllNotes = async () => {
    await axiosInstance
      .get(`note/all`, {
        params: {
          search,
          filter,
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(addAllNotes(res.data.notes));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchAllNotes();
  }, [search, filter, update]);
};

export default useFetchAllNotes;
