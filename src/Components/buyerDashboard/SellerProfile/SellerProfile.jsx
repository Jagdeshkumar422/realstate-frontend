import React, { useEffect, useState } from "react";
import "./sellerProfile.css";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode
import { APP_CONFIG } from "../../../config";

const SellerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User is not authenticated");

        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.userId;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(`${APP_CONFIG.backendUrl}api/profile/${userId}`, config);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${APP_CONFIG.backendUrl}api/profile/${userId}`,
        { name: newName },
        config
      );

      setUser(data); // Update the user state with the new name
      setIsEditing(false);
      setNewName("");
    } catch (err) {
      console.error("Error updating name:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile">
      <h1>Profile</h1>
      {user && (
        <div>
          <p>
            <strong>Name:</strong> {user.name}{" "}
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      {isEditing && (
        <div className="popup">
          <div className="popup-content">
            <h2>Update Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
            />
            <button className="save-btn" onClick={handleUpdateName}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
