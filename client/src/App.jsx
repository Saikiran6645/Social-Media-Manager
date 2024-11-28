import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import "./styles.scss";
import Profile from "./pages/profile/Profile";

import React from "react";
import Layout from "./pages/home/Layout";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <BrowserRouter>
      {user ? <Navbar /> : <></>}
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/createpost" element={<CreatePost />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
