import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6

const LoginForm = () => {
  const navigate = useNavigate(); // React Router v6 for navigation
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short").required("Required"),
  });

  const onSubmit = (values) => {
    // Making the API call to authenticate the user
    axios
      .post("https://backend-lpju.onrender.com/api/auth/login", values) // Adjust your API endpoint as needed
      .then((response) => {
        // Assuming the backend returns a token or user info
        localStorage.setItem("token", response.data.token); // Store token in localStorage or cookie
        navigate("/dashboard"); // Redirect to the dashboard after login
      })
      .catch((error) => {
        // Handle errors (wrong credentials, server error, etc.)
        alert("Invalid credentials, please try again.");
        console.error("Login error:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="form-control"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
