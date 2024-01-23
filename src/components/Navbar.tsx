import { AppShell, NavLink } from "@mantine/core";
import { To, useNavigate } from "react-router-dom";
import { IconHome } from '@tabler/icons-react';


interface NavbarProps {
    closeHeader: () => void;
  }
const Navbar: React.FC<NavbarProps> = ({ closeHeader }) => {
  const navigate = useNavigate();

  const handleNavLinkClick = (path: To) => {
    closeHeader();
    navigate(path);
  };


  return (
    <AppShell.Navbar p="md" style={{ gap: "10px" }}>
        <NavLink
        label="Home"
        onClick={() => handleNavLinkClick("/")}
        style={{ margin: "5px" }}
        leftSection={<IconHome />}
      />
      <NavLink
        label="1"
        onClick={() => handleNavLinkClick("/text-component")}
        style={{ margin: "5px" }}
      />
      <NavLink
        label="2"
        onClick={() => handleNavLinkClick("/button-component")}
        style={{ margin: "5px" }}
      />
    </AppShell.Navbar>
  );
};

export default Navbar;
