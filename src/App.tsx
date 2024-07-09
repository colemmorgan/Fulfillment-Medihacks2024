import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Quiz from "./pages/Quiz";
import Trivia from "./pages/Trivia";
import { RecoilRoot } from "recoil";
import NewGame from "./pages/NewGame";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <Router>
        <RecoilRoot>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<Quiz />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/newgame" element={<NewGame />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </RecoilRoot>
      </Router>
    </>
  );
}

export default App;
