import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import UserForm from "./userForm";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { showToast } from "../../../Utils/showToast";
import { token } from "../../../Hooks/UserHooks.js";
import { APP_CONFIG } from "../../../config.js";
import "./usersPage.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeicons/primeicons.css"; // PrimeIcons (if used for icons)


const UsersPage = () => {
  const baseUrl = `${APP_CONFIG.backendUrl}api`;
  const [data, setData] = useState([]); // Initialize as an array
  const [search, setSearch] = useState(""); // Manage search as a string
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);

  // Handle input data
  const handleInputChange = (e) => {
    setSearch(e.target.value); // Directly set the search value
  };

  const handleClose = () => {
    setShow(false);
  };

  // Fetch users with search or refresh changes
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/all`, {
          params: { search }, // Pass search directly as a string
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data); // Ensure response data is correctly set
      } catch (error) {
        console.error("Error fetching users:", error.message);
        showToast("Failed to fetch users. Please try again later.", "error");
      }
    };

    getUsers();
  }, [search, refresh]);

  // Delete a user
  const deleteUser = async (rowData) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete/${rowData._id}`, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        showToast(response.data, "success");
        setRefresh(); // Trigger refresh
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      showToast("Failed to delete user. Please try again later.", "error");
    }
  };

  const actionTemplate = (rowData) => (
    <div>
      <button onClick={() => deleteUser(rowData)} className="btn btn-primary">
        Delete
      </button>
    </div>
  );

  return (
    <>
      <div className="users-page-parent">
        <div className="users-page-container">
          <h1 className="users-page-title">Users</h1>
          <div className="users-page-header-container">
            <input
              type="text"
              name="search"
              placeholder="Search by name"
              onChange={handleInputChange}
            />
           
          </div>
          <div>
            <DataTable
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 15]}
              style={{ height: "600px" }}
              value={data} // Ensure value is an array
              emptyMessage="No users found"
            >
              <Column
                headerStyle={{ backgroundColor: "#80adbb", color: "white" }}
                style={{ width: "25%" }}
                field="_id"
                header="ID"
              ></Column>
              <Column
                style={{ width: "25%" }}
                field="name"
                header="Name"
              ></Column>
              <Column
                headerStyle={{ backgroundColor: "#80adbb", color: "white" }}
                style={{ width: "25%" }}
                field="email"
                header="Email"
              ></Column>
              <Column
                style={{ width: "25%" }}
                header="Actions"
                body={actionTemplate}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
