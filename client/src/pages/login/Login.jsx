import React, { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../services/loginApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Slicer/authSlicer";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setdetails] = useState({
    email: "",
    password: "",
  });
  const mutation = useMutation({
    mutationFn: loginApi,
    mutationKey: ["login"],
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    e.preventDefault();

    setdetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(details);
  };
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    mutation
      .mutateAsync(details)
      .then((data) => {
        console.log(data);
        dispatch(login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/home");
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
            sint voluptates iste fugiat? Quidem aperiam exercitationem maxime
            sit numquam consequuntur aliquid eum fugiat voluptatibus esse,
            corrupti, incidunt repudiandae delectus earum.
          </p>
          <span>Dont you have an Account</span>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>

        <div className="right">
          <div>
            <h1>Login</h1>
            {mutation.isError && <p>{mutation.error.response.data.message}</p>}
            {mutation.isSuccess && <p>Successfully Logged in</p>}
            {mutation.isLoading && <p>Loading....</p>}
            <form>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={details.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={details.password}
                onChange={handleChange}
              />
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
