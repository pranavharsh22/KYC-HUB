import React from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineCompare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ul>
          <li onClick={() => navigate("/")}>
            <MdOutlineProductionQuantityLimits size={20} /> Product Details
          </li>
          <li onClick={() => navigate("/compare")}>
            <MdOutlineCompare size={20} /> Compare Products
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
