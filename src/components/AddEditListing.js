import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Use your axios instance
import { useNavigate, useParams } from "react-router-dom";

const AddEditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the route parameter 'id'

  // Form state
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Check if it's edit mode and fetch data if needed
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      // Fetch the listing data for editing
      axiosInstance
        .get(`/api/listings/${id}`)
        .then((response) => {
          const listing = response.data;
          setPropertyName(listing.propertyName);
          setLocation(listing.location);
          setPrice(listing.price);
          setDescription(listing.description);
        })
        .catch((error) => {
          setErrorMessage("Error fetching listing details. Please try again.");
          console.error("There was an error fetching the listing:", error);
        });
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const listingData = {
      propertyName,
      location,
      price,
      description,
    };

    try {
      if (isEditMode) {
        await axiosInstance.put(`/api/listings/${id}`, listingData);
      } else {
        await axiosInstance.post("/api/listings", listingData);
      }
      navigate("/listings"); // Redirect to the listings page on success
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error submitting the form. Please try again."
      );
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? "Edit Listing" : "Add Listing"}</h2>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="propertyName" className="form-label">
            Property Name
          </label>
          <input
            type="text"
            id="propertyName"
            className="form-control"
            placeholder="Enter property name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>{" "}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/listings")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditListing;
