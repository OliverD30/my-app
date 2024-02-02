import React, { useState } from "react";
import { Paper, TextInput, Button, Text, PasswordInput } from "@mantine/core";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({
      ...form,
      values: {
        ...form.values,
        [field]: value,
      },
      isValid: form.values.username !== "" && value.length > 5,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.isValid) {
      setIsLoading(true);
      axios
        .post("https://auth-backend-theta.vercel.app/register", {
          username: form.values.username,
          password: form.values.password,
        })
        .then(() => {
          setRegisterStatus("success");
          handleLogin();
        })
        .catch((error) => {
          if (error.response) {
            setRegisterStatus(error.response.data.message);
          } else {
            setRegisterStatus("Error occurred during registration.");
          }
          // Clear the password field
          setForm({
            ...form,
            values: {
              ...form.values,
              password: "",
            },
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setRegisterStatus("Lösenordet måste vara minst 6 tecken långt.");
      // Clear the password field
      setForm({
        ...form,
        values: {
          ...form.values,
          password: "",
        },
      });
    }
  };

  const handleLogin = () => {
    navigate("/login");
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
          <Button variant="outline" color="gray" onClick={handleLogin} fullWidth>
            Logga in
          </Button>
          <Button variant="outline" color="grape" fullWidth style={{ pointerEvents: "none" }}>
            Registrera
          </Button>
        </div>
        <h2>Registrera dig</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Användarnamn"
            value={form.values.username}
            onChange={(event) => handleChange("username", event.target.value)}
            required
            placeholder="Välj ett användarnamn"
          />
          <PasswordInput
            label="Lösenord"
            type="password"
            value={form.values.password}
            onChange={(event) => handleChange("password", event.target.value)}
            required
            placeholder="Välj ett lösenord"
          />{registerStatus && (
            <Text color="red" size="sm" style={{ marginTop: "20px" }}>
              {registerStatus}
            </Text>
          )}
          <Button type="submit" loading={isLoading} style={{ marginTop: "20px" }}>
            {isLoading ? "Registrerar..." : "Registrera dig"}
          </Button>
          
        </form>
      </Paper>
    </div>
  );
};

export default Register;
