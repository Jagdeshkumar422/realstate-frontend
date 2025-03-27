import React, { useState } from "react";
import "./Login.css";
import Logo from "../../Assets/images/OnlyLogo.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { login, token } from "../../Hooks/UserHooks";
import { showToast } from "../../Utils/showToast";
import { APP_CONFIG } from "../../config";
import { Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [user, setuser] = useState({ email: "", password: "" });

  function handleChange(evt) {
    const value = evt.target.value;
    setuser({
      ...user,
      [evt.target.name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (user.email.length < 6 || user.password.length < 4) {
        showToast("Password and email must be more than 6 digits", "error");
      } else {
        await axios
          .post(
            `${APP_CONFIG.backendUrl}api/login`,
            { email: user.email, password: user.password },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            if (res.status === 200) {
              // Assuming the response contains the token and user role
              const { token, role } = res.data;
              // login(token); // Store token
              localStorage.setItem("token", token);
              localStorage.setItem("role", role);
              // Redirect based on the user role
              console.log(role)
              if (role === "admin") {
                navigate("/admin-dashboard");
              } else if (role === "seller") {
                navigate("/seller-dashboard");
              } else if (role === "buyer") {
                navigate("/");
              }
            } else {
              showToast("Invalid credentials!", "error");
            }
          });
      }
    } catch (error) {
      showToast(error.response.data.message || "Login failed", "error");
    }
  }

  return (
    <>
      <div className="loginParent">
        <form onSubmit={handleSubmit} className="loginForm">
          <img className="loginImg" src={Logo} alt="Aim logo" />

          <div className="inputWrapper">
            <label className="loginLabel">Email</label>
            <input
              onChange={handleChange}
              name="email"
              placeholder="example@domain.com"
              type={"email"}
              className="loginInput"
            />
          </div>

          <div className="inputWrapper">
            <label className="loginLabel">Password</label>
            <input
              onChange={handleChange}
              placeholder="secretkey123"
              name="password"
              type={"password"}
              className="loginInput"
            />
          </div>

          <button type="submit" className="loginButton">
            Login
          </button>

          <p className="signupbtn">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
