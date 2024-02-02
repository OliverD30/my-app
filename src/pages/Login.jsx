import { Paper, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login({ handleLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State variable for loading status
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login request starts
  
    const configuration = {
      method: "post",
      url: "https://auth-backend-theta.vercel.app/login",
      data: {
        username,
        password,
      },
    };
  
    axios(configuration)
      .then((result) => {
        // Save token and username as cookies
        cookies.set("TOKEN", result.data.token, { path: "/" });
        cookies.set("USERNAME", username, { path: "/" });
  
        handleLogin(result.data.token); // Update the state with the token
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed", error.response.data.message); // Log the error message from the backend
        // Update the state with the error message
        setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when login request finishes
      });
  };
  const handleRegister = () => {
    // Navigate to the register page
    navigate("/register");
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
 <div style={{ marginBottom: '16px', justifyContent: 'space-between', display: 'flex'}}> {/* Container for login button */}
    <Button variant="outline" color="grape" fullWidth style={{ pointerEvents: "none" }}>
      Logga in
    </Button>
    <Button variant="outline" color="gray" onClick={handleRegister} fullWidth>
      Registrera
    </Button>
  </div>
        <h2>Logga in</h2>
        <form onSubmit={handleSubmit}>
          {/* username */}
          <TextInput
            label="Användarnamn"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ditt användarnamn"
            required
          />

          {/* password */}
          <PasswordInput
            label="Lösenord"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ditt lösenord"
            required
          />
{errorMessage && <div style={{marginTop: '10px'}}>{errorMessage}</div>}
          {/* submit button */}
          <Button variant="primary" type="submit" disabled={loading} style={{marginTop: '20px'}}>
            {loading ? "Loggar in..." : "Logga in"} {/* Change button text based on loading state */}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
