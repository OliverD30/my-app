import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import RouterSwitcher from "./components/RouterSwitcher";

function App() {
  const [opened, { toggle }] = useDisclosure();
  const closeHeader: () => void = () => {
    toggle();
  };
  return (
    <div className="App" style={{ marginTop: "20px" }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <Header toggle={toggle} opened={opened} />
        <Navbar closeHeader={closeHeader} />
        <AppShell.Main>
          <RouterSwitcher />
        </AppShell.Main>
        <AppShell.Footer zIndex={opened ? "auto" : 201}>
          CONTENT
        </AppShell.Footer>
      </AppShell>
    </div>
  );
}

export default App;
