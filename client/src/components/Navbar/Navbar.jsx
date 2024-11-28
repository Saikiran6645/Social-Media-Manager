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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slicer/authSlicer";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/loginApi";

const Navbar = () => {
  const username = useSelector((state) => state.auth.user.username);
  const id = useSelector((state) => state.auth.user.id);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userApi", id],
    queryFn: () => userApi(id),
  });

  console.log(data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="left" style={{ display: "flex" }}>
        <span>Socializee</span>
        <Link to={`/home`}>
          <HomeOutlinedIcon />
        </Link>
        {/* <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <WbSunnyOutlinedIcon /> */}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right">
        <Link to={`/profile/${id}`}>
          <PersonOutlinedIcon />
        </Link>

        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          {/* <img src={data.profilePic} alt="" /> */}
          <span>{username}</span>
          <button onClick={handleClick}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
