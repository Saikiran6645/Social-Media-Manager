import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slicer/authSlicer";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="left" style={{ display: "flex" }}>
        <span>Socializee</span>
        <HomeOutlinedIcon />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <WbSunnyOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src="" alt="" />
          <span>Username</span>
          <button onClick={handleClick}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
