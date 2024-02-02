import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Helmet } from "react-helmet"; // Import Helmet
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import RouterSwitcher from "./components/RouterSwitcher";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [auth, setAuth] = useState({ token: false });
  const [loading, setLoading] = useState(true);

  const closeHeader = () => {
    toggle();
  };

  const handleLogin = (token: any) => {
    setAuth({ token: token });
  };

  useEffect(() => {
    // Simulate fetching authentication status
    setTimeout(() => {
      setLoading(false); // Set loading to false after authentication check
    }, 1000); // Simulated delay
  }, []);

  if (loading) {
    // Render loading indicator or any other UI element
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={{ marginTop: "20px" }}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Helmet>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        {auth.token !== false && (
          // Conditionally render Header, Navbar, and Footer
          <>
            <Header toggle={toggle} opened={opened} />
            <Navbar closeHeader={closeHeader} />
          </>
        )}
        <AppShell.Main>
          <RouterSwitcher handleLogin={handleLogin} auth={auth} />
        </AppShell.Main>
        {auth.token !== false && (
          // Conditionally render Footer
          <AppShell.Footer zIndex={opened ? "auto" : 201}>
            Sponsrad av Segeltorps IF
          </AppShell.Footer>
        )}
      </AppShell>
    </div>
  );
}

export default App;
