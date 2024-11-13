import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../services/loginApi";
function Register() {
  const navigate = useNavigate();
  const [details, setdetails] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const mutation = useMutation({
    mutationFn: registerApi,
    mutationKey: ["register"],
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
    e.preventDefault();
    mutation
      .mutateAsync(details)
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={details.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={details.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={details.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={details.name}
              onChange={handleChange}
            />

            <div>
              <label>PROFILE PICTURE</label>
              <input type="file" placeholder="Profile Picture" />
            </div>
            <div>
              <label>COVER PICTURE</label>
              <input type="file" placeholder="Cover Picture" />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="left">
          <h1>SocioMeds</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
            sint voluptates iste fugiat? Quidem aperiam exercitationem maxime
            sit numquam consequuntur aliquid eum fugiat voluptatibus esse,
            corrupti, incidunt repudiandae delectus earum.
          </p>
          <span>Dont you have an Account</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
