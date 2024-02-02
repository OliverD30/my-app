import { AppShell, NavLink } from "@mantine/core";
import { To, useNavigate } from "react-router-dom";
import { IconClipboardText, IconHome, IconQuestionMark } from '@tabler/icons-react';


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
        onClick={() => handleNavLinkClick("/")}
        style={{ margin: "5px" }}
        leftSection={<IconHome />}
      />
             <NavLink
        label="Anslagstavlan"
        onClick={() => handleNavLinkClick("/anslagstavlan")}
        style={{ margin: "5px" }}
        leftSection={< IconClipboardText/>}
      />
      <NavLink
        label="Quiz 1"
        onClick={() => handleNavLinkClick("/quiz1")}
        style={{ margin: "5px" }}
        leftSection={< IconQuestionMark/>}
      />

    </AppShell.Navbar>

  );
};

export default Navbar;
