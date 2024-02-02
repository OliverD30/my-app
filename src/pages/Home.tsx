import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Home = () => {
  const navigate = useNavigate();

  // State variables
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve the username from cookies
    const savedUsername = cookies.get("USERNAME");
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      // Handle case where username cookie doesn't exist
      // Redirect user to login page or handle accordingly
      navigate("/login"); // Example: Redirect to the login page
    }
  }, []);
  return (
    <div>
      <h1>Hem </h1>
      <p>Välkommen, {username}! Det här är min sida som är under konstruktion, kolla vad som finns i menyn </p>
    </div>
  );
};

export default Home;
