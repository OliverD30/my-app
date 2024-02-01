import { Paper } from "@mantine/core";
import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    values: {
      username: "",
      password: "",
    },
    isValid: false,
  });
  const [registerStatus, setRegisterStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleChange = (field, value) => {
    setForm({
      ...form,
      values: {
        ...form.values,
        [field]: value,
      },
      isValid: form.values.username !== "" && form.values.password !== "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.isValid) {
      setIsLoading(true); // Set isLoading to true when form is submitting
      axios
        .post("https://auth-backend-theta.vercel.app/register", {
          username: form.values.username,
          password: form.values.password,
        })
        .then(() => {
          setRegisterStatus("success");
        })
        .catch(() => {
          setRegisterStatus("error");
        })
        .then(() => {
          setIsLoading(false); // Set isLoading to false after request is complete
        })
        .finally(() => {
          handleLogin();
        });
    }
  };

  const handleLogin = () => {
    // Navigate to the register page
    navigate("/");
  };

  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        shadow="xl"
        radius="md"
        withBorder
        p="xl"
        style={{ width: "400px", marginTop: "20px", overflow: "hidden" }}
      >
        <div
          style={{
            marginBottom: "16px",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          {" "}
          {/* Container for login button */}
          <Button
            variant="outline"
            color="grape"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
          <Button variant="outline" disabled color="grape" fullWidth>
            Register
          </Button>
        </div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            value={form.values.username}
            onChange={(event) => handleChange("username", event.target.value)}
            required
          />
          <TextInput
            label="Password"
            type="password"
            value={form.values.password}
            onChange={(event) => handleChange("password", event.target.value)}
            required
          />
          <Button type="submit" loading={isLoading}>
            {" "}
            {/* Pass isLoading state to loading prop */}
            {isLoading ? "Submitting..." : "Sign Up"}{" "}
            {/* Change button text based on isLoading state */}
          </Button>
          {registerStatus === "success" && <div>Registration successful!</div>}
          {registerStatus === "error" && (
            <div>Error occurred during registration.</div>
          )}
        </form>
      </Paper>
    </div>
  );
};

export default Register;
