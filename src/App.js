import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import AddEditListing from "./components/AddEditListing";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-listing" element={<AddEditListing />} />
        <Route path="/edit-listing/:id" element={<AddEditListing />} />
      </Routes>
    </Router>
  );
};

export default App;
