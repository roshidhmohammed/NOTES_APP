import { useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import {
  addNoteContent,
  addNoteTitle,
  updateIsEditable,
} from "../utils/slices/noteSlice";
import { toast } from "react-toastify";

const useFetchNoteDetails = (id) => {
  const dispatch = useDispatch();

  const fetchNoteDetails = async () => {
    await axiosInstance
      .get(`note/details/${id}`, { withCredentials: true })
      .then((res) => {
        dispatch(addNoteTitle(res.data.noteTitle));
        dispatch(addNoteContent(res.data.noteContent));
        dispatch(updateIsEditable(res.data.editable));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchNoteDetails();
  }, []);

  return;
};

export default useFetchNoteDetails;
