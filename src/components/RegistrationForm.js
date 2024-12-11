import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; // Make sure axios is installed

const RegistrationForm = () => {
  const [error, setError] = useState(""); // State to hold error messages

  const initialValues = { name: "", email: "", password: "", confirmPassword: "" };
  
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("https://backend-lpju.onrender.com/api/auth/register", values); // Make sure the URL is correct
      console.log(response.data); // Handle success, e.g., redirect to login page
      alert("Registration successful! Please login.");
    } catch (error) {
      setError("Registration failed! Please try again."); // Show error message on failure
      console.error("There was an error during registration:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <Field type="text" id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field type="email" id="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <Field type="password" id="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
