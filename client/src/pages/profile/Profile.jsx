import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userApi } from "../../services/loginApi";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";
// import Update from "../../components/update/Update";
// import { useState } from "react";

const Profile = () => {
  const userId = useParams().id;
  console.log(userId);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userApi", userId],
    queryFn: () => userApi(userId),
  });
  console.log(data);
  refetch();
  return (
    <div className="profile" style={{ height: "100vh" }}>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data.coverPic} alt="" className="cover" />
            <img src={data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    {/* <span>{data.city}</span> */}
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    {/* <span>{data.website}</span> */}
                  </div>
                </div>
                {isLoading ? (
                  "loading"
                ) : userId === data._id ? (
                  <button>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {/* {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"} */}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            {/* <Posts userId={userId} /> */}
          </div>
        </>
      )}
      {/* {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />} */}
    </div>
  );
};

export default Profile;
