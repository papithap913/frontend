import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const history = useNavigate();

  // Fetch listings from the backend
  useEffect(() => {
    axios
      .get("/api/listings") // Assuming this is your API endpoint to fetch listings
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the listings:", error);
      });
  }, []);

  // Handle the delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      axios
        .delete(`/api/listings/${id}`)
        .then((response) => {
          // After deleting, refresh the listings list
          setListings(listings.filter((listing) => listing._id !== id));
        })
        .catch((error) => {
          console.error("There was an error deleting the listing:", error);
        });
    }
  };

  // Handle the edit action
  const handleEdit = (id) => {
    history.push(`/edit-listing/${id}`); // Assuming the route for edit is '/edit-listing/:id'
  };

  return (
    <div className="container mt-5">
      <h2>Agent Dashboard</h2>
      <p>Welcome to the Agent Portal! Manage your listings below:</p>
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
                  </button>{" "}
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
