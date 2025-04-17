import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import "./Register.css";
import Logo from "../../Assets/images/OnlyLogo.png";
import { showToast } from "../../Utils/showToast";
import { APP_CONFIG } from "../../config";

const Register = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Added role to state
  });

  function handleChange(evt) {
    const { name, value } = evt.target; // Capture name and value of the input field
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Dynamically update the field based on its name
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    // Validate form fields
    if (!user.name || !user.email || !user.password || !user.confirmPassword || !user.role) {
      showToast("All fields are required!");
      return;
    }

    if (user.password !== user.confirmPassword) {
      showToast("Passwords do not match!");
      return;
    }

    try {
      // Make the API request to register the user
      const response = await axios.post(`${APP_CONFIG.backendUrl}api/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        role: user.role,
      });

      showToast(response.data.message || "Registration successful!");
      navigate("/login")
      
      // Reset the form after successful registration
      setUser({ name: "", email: "", password: "", confirmPassword: "", role: "" });
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="loginParent">
      <form onSubmit={handleSubmit} className="loginForm">
        <img className="loginImg" src={Logo} alt="Aim logo" />

        <div className="inputWrapper">
          <label className="loginLabel">Name</label>
          <input
            onChange={handleChange}
            name="name"
            value={user.name}
            placeholder="John Doe"
            type="text"
            className="loginInput"
          />
        </div>

        <div className="inputWrapper">
          <label className="loginLabel">Email</label>
          <input
            onChange={handleChange}
            name="email"
            value={user.email}
            placeholder="example@domain.com"
            type="email"
            className="loginInput"
          />
        </div>

        <div className="inputWrapper">
          <label className="loginLabel">Role</label>
          <select
            onChange={handleChange}
            name="role"
            // value={user.role}
            className="loginInput"
          >
            <option value="">Select...</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div className="inputWrapper">
          <label className="loginLabel">Password</label>
          <input
            onChange={handleChange}
            placeholder="secretkey123"
            name="password"
            value={user.password}
            type="password"
            className="loginInput"
          />
        </div>

        <div className="inputWrapper">
          <label className="loginLabel">Confirm Password</label>
          <input
            onChange={handleChange}
            placeholder="secretkey123"
            name="confirmPassword"
            value={user.confirmPassword}
            type="password"
            className="loginInput"
          />
        </div>

        <button type="submit" className="loginButton">
          Register
        </button>
        <p className="signupbtn">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
