import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Home from "./Home";
import RightBar from "../../components/RightBar/RightBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="dark-theme">
      {/* <Navbar /> */}
      <div style={{ display: "flex" }}>
        <Leftbar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
}

export default Layout;
