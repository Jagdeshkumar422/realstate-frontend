import React from "react";
import { Outlet } from "react-router";
import SearchBar from "../Components/SearchBar/SearchBar";
import NavBar from "../Components/Navbar/NavBar";

const CategoriesLayout = () => {
  return (
    <>
    <NavBar />
    <main className="properties_main">
      
      <Outlet />
    </main>
    </>
  );
};

export default CategoriesLayout;
