import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import TextComponent from "../pages/Quiz1";
import ButtonComponent from "../pages/Buttons";
import HomeComponent from "../pages/Home";

const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/text-component" element={<TextComponent />} />
      <Route path="/button-component" element={<ButtonComponent />} />
    </Routes>
  );
};

export default RouterSwitcher;
