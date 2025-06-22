import { useState } from "react";
import { FaLock } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../utils/slices/configSlice";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Loader from "./common/Loader";
import useUserAuth from "../hooks/useUserAuth";

const Login = () => {
  useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.config.isLoading);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(setLoading());
    await axiosInstance
      .post("/user/login", { data }, { withCredentials: true })
      .then((res) => {
        dispatch(setLoading());
        reset();
        navigate("/home");
        toast.success(res.data.message);
      })
      .catch((error) => {
        dispatch(setLoading());
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" justify-center flex flex-col font-sans items-center w-full h-screen text-white">
      {isLoading && <Loader />}
      <div className=" bg-[#0e0e0f] p-5 rounded-lg  shadow-lg  lg:w-1/3 md:2/4 py-12">
        <div className=" text-center  font-bold text-2xl mb-10">
          <h1 className=" ">Welcome Note App</h1>
          <h1 className="mt-2">Login</h1>
        </div>
        <form
          className=" flex flex-col gap-3 mx-10 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" flex flex-col gap-1  my-1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your name"
              className="border border-gray-500 p-2 rounded-lg"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className=" text-red-700 font-bold">{errors.email.message}</p>
            )}
          </div>
          <div className=" flex flex-col gap-1 my-1 relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="border border-gray-500 p-2 rounded-lg "
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                  message: "Please enter strong password",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {!showPassword ? (
              <FaLock
                className=" absolute right-2 top-10 text-gray-400 hover:cursor-pointer text-xl"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaUnlock
                className=" absolute right-2 top-10 text-gray-400 hover:cursor-pointer text-xl"
                onClick={() => setShowPassword(false)}
              />
            )}
            {errors.password && (
              <h1 className=" text-red-700 font-bold" role="alert">
                {errors.password.message}
              </h1>
            )}
          </div>
          <div className="flex justify-center my-3">
            <button className=" bg-red-700 p-2 px-5 w-full tracking-wider rounded-lg hover:cursor-pointer hover:bg-red-800">
              Submit
            </button>
          </div>
        </form>
        <div className=" text-gray-50 flex justify-end mr-10 mt-5">
          <h1>
            New user?{" "}
            <Link to="/register" className=" underline">
              Register
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
