import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
// import Comments from "../comments/Comments";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/loginApi";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userApi", post.userId],
    queryFn: () => userApi(post.userId),
  });

  // Refetch when post.userId changes
  useEffect(() => {
    if (post.userId) {
      refetch();
    }
  }, [post.userId, refetch]);

  // TEMPORARY
  const liked = false;

  // Loading and Error Handling
  if (isLoading) return <div>Loading post data...</div>;
  if (isError) return <div>Error loading user data.</div>;

  // Safeguard against undefined data
  const user = data || {};
  const profilePic = user.profilePic || "/default-profile-pic.jpg"; // Default profile picture
  const createdAt = new Date(post.createdAt);
  const now = new Date(); // Current date and time
  const diffInMs = now - createdAt;
  const sec = Math.floor(diffInMs / 1000);
  const min = Math.floor(sec / 60);
  const hrs = Math.floor(min / 60);
  const days = Math.floor(hrs / 24);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePic} alt="User Profile" />
            <div className="details">
              <Link
                to={`/profile/${user.userId || post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username || "Anonymous"}</span>
              </Link>
              <span className="date">
                {sec < 60
                  ? `${sec} seconds ago`
                  : min < 60
                  ? `${min} minutes ago`
                  : hrs < 24
                  ? `${hrs} hours ago`
                  : days < 7
                  ? `${days} days ago`
                  : createdAt.toDateString()}{" "}
              </span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={post.img} alt="Post Content" />}
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
