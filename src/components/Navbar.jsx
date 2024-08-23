import React from "react";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="profile-section flex align-center">
          <p>
            {" "}
            <CgProfile size={40} />
          </p>
          &nbsp;
          <span>Hello, User</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
