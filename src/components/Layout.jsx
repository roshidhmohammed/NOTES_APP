import Header from "./common/header";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";

const Layout = () => {
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

export default Layout;
