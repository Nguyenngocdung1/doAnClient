import React from "react";
import { Outlet } from "react-router-dom";


const LayoutWebsite: React.FC = () => {
  return (
    <div>
      Layout Website
      <Outlet />
    </div>
  );
};
export default LayoutWebsite;
