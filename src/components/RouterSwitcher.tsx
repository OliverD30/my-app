import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import QuizPage1 from "../pages/Quiz1";
import HomeComponent from "../pages/Home";
import ThankYouQuiz1 from "../pages/Thank-you-page-quiz1";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

interface RouterSwitcherProps {
  handleLogin: (token: any) => void; 
  auth: { token: boolean };
}

const RouterSwitcher: React.FC<RouterSwitcherProps> = ({ handleLogin, auth }) => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route
        path="/login"
        element={<Login handleLogin={handleLogin} />}
      />
      <Route
        path="/"
        element={<PrivateRoutes auth={auth}><HomeComponent /></PrivateRoutes>}
      />
      <Route
        path="/quiz1"
        element={<PrivateRoutes auth={auth}><QuizPage1 /></PrivateRoutes>}
      />
      <Route
        path="/thank-you-quiz1"
        element={<PrivateRoutes auth={auth}><ThankYouQuiz1 /></PrivateRoutes>}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterSwitcher;
