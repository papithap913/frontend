import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const AddEditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState(""); // Aligning with backend 'title' field
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch listing data for editing
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      axiosInstance
        .get(`/api/listings/${id}`)
        .then((response) => {
          const listing = response.data;
          setTitle(listing.title || ""); // Map 'title' to the input
          setLocation(listing.location || "");
          setPrice(listing.price || "");
          setDescription(listing.description || "");
        })
        .catch((error) => {
          console.error("Error fetching the listing:", error);
          setErrorMessage("Failed to fetch the listing. Please try again.");
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!title.trim() || !location.trim() || !price || !description.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    const listingData = {
      title, // Use 'title' to align with backend
      location,
      price,
      description,
    };

    const apiCall = isEditMode
      ? axiosInstance.put(`/api/listings/${id}`, listingData)
      : axiosInstance.post("/api/listings", listingData);

    apiCall
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        setErrorMessage(
          error.response?.data?.error || "Something went wrong. Please try again."
        );
      });
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? "Edit Listing" : "Add Listing"}</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Property Name</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditListing;
