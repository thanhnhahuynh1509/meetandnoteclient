import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<LoginForm />} />
        <Route path="/sign-up" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
