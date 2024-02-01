import { Paper } from "@mantine/core";
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
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        handleLogin(result.data.token); // Update the state with the token
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login failed", error);
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
    <Button variant="outline" disabled color="grape" style={{ marginRight: '8px' }} fullWidth>
      Login
    </Button>
    <Button variant="outline" color="grape" onClick={handleRegister} fullWidth>
      Register
    </Button>
  </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* username */}
          <TextInput
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />

          {/* password */}
          <TextInput
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          {/* submit button */}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"} {/* Change button text based on loading state */}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
