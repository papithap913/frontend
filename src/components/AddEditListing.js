import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirecting after form submission

const AddEditListing = ({ match }) => {
  const history = useNavigate();

  // Form state
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Check if it's an edit mode (based on URL params)
  useEffect(() => {
    if (match.params.id) {
      setIsEditMode(true);
      // Fetch the listing data if we are in edit mode
      axios
        .get(`/api/listings/${match.params.id}`)
        .then((response) => {
          const listing = response.data;
          setPropertyName(listing.propertyName);
          setLocation(listing.location);
          setPrice(listing.price);
          setDescription(listing.description);
        })
        .catch((error) => {
          console.error("There was an error fetching the listing:", error);
        });
    }
  }, [match.params.id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const listingData = {
      propertyName,
      location,
      price,
      description,
    };

    const apiCall = isEditMode
      ? axios.put(`/api/listings/${match.params.id}`, listingData)
      : axios.post("/api/listings", listingData);

    apiCall
      .then((response) => {
        // After successful submission, redirect to listings page (or success page)
        history.push("/listings"); // Assuming "/listings" is the page showing all listings
      })
      .catch((error) => {
        console.error("There was an error submitting the form:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? "Edit Listing" : "Add Listing"}</h2>
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
        <button type="button" className="btn btn-secondary" onClick={() => history.push("/listings")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditListing;
