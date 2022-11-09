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
import AuthorizePage from "./components/ErrorPage/AuthorizePage";
import RoomNotExists from "./components/ErrorPage/RoomNotExists";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [changeTrigger, setChangeTrigger] = useState("");

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
            <Route path="/authorized" element={<AuthorizePage />} />
            <Route path="/room-not-exist" element={<RoomNotExists />} />
          </>
        }
      </Routes>
      <Modal />
    </>
  );
}

export default App;
