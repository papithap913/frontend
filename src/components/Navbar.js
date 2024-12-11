import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const history = useNavigate(); // To navigate after logout
  const token = localStorage.getItem("token"); // Check if the user is authenticated

  const handleLogout = () => {
    // Clear the token and redirect to the login page
    localStorage.removeItem("token");
    history.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Agent Portal</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-listing">Add Listing</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token ? (
              // If the user is logged in, show Logout link
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              // If the user is not logged in, show Login link
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link> 
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
