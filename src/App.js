import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import Modal from "./components/UI/modal/Modal";
import Workspace from "./components/Workspace/Workspace";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateUser } from "./store/user-slice";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      dispatch(updateUser(JSON.parse(localStorage.getItem("user"))));
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <>
      <Routes>
        {
          <>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<LoginForm />} />
            <Route path="/sign-up" element={<RegisterForm />} />
            <Route path="/:roomId" element={<Workspace />} />
          </>
        }
      </Routes>
      <Modal />
    </>
  );
}

export default App;
