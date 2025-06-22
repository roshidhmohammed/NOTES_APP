import { ToastContainer } from "react-toastify";

const Alert = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} theme="dark" />
    </div>
  );
};

export default Alert;
