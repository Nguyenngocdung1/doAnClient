import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";


const LayoutWebsite: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
export default LayoutWebsite;
