import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAuthUserDetails } from "../utils/slices/authSlice";
import { axiosInstance } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const useUserAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    await axiosInstance
      .get("user/auth", { withCredentials: true })
      .then((res) => {
        dispatch(addAuthUserDetails(res?.data?.user));
      })
      .catch(() => {
        dispatch(addAuthUserDetails(null));
        navigate("/");
        // setUser(null);
      });
    // .finally(()=>{
    //     setLoading(null)
    // })
  };
};

export default useUserAuth;
