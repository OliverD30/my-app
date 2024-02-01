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
        label="Hem"
        onClick={() => handleNavLinkClick("/home")}
        style={{ margin: "5px" }}
        leftSection={<IconHome />}
      />
      <NavLink
        label="Quiz 1"
        onClick={() => handleNavLinkClick("/quiz1")}
        style={{ margin: "5px" }}
      />
    
    </AppShell.Navbar>

  );
};

export default Navbar;
