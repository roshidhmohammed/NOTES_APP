import Header from "./common/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div className=" flex justify-start md:gap-10">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
