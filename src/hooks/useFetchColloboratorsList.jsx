import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import { addColloboratorLists } from "../utils/slices/noteSlice";
import { toast } from "react-toastify";

const useFetchColloboratorsList = (id) => {
  const dispatch = useDispatch();

  const fetchColloboratorLists = async () => {
    await axiosInstance
      .get(`note/colloborators/${id}`, { withCredentials: true })
      .then((res) => {
        dispatch(addColloboratorLists(res.data.colloborators));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchColloboratorLists();
  }, []);
};

export default useFetchColloboratorsList;
