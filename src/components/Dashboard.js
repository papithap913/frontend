import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/api/listings")
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      axiosInstance
        .delete(`/api/listings/${id}`)
        .then(() => {
          setListings(listings.filter((listing) => listing._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting listing:", error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2>Agent Dashboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Property Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.length > 0 ? (
            listings.map((listing, index) => (
              <tr key={listing._id}>
                <td>{index + 1}</td>
                <td>{listing.propertyName}</td>
                <td>{listing.location}</td>
                <td>${listing.price}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(listing._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No listings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
