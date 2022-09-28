import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import Workspace from "./components/Workspace/Workspace";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<LoginForm />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/:id" element={<Workspace />} />
      </Routes>
    </>
  );
}

export default App;
