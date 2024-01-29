import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import QuizPage1 from "../pages/Quiz1";
import HomeComponent from "../pages/Home";
import ThankYouQuiz1 from "../pages/Thank-you-page-quiz1";
import TodoComponent from "../pages/Todo";

const RouterSwitcher = () => {
  return (
    <Routes>
            <Route path="/" element={<HomeComponent />} />
      <Route path="/todo" element={<TodoComponent />} />
      <Route path="/quiz1" element={<QuizPage1 />} />
      <Route path="/thank-you-quiz1" element={<ThankYouQuiz1 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterSwitcher;
