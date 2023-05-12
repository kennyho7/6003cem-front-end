import React, { Suspense, createContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import useUser from "./models/UserModel";
import StyledToast from "./components/ToastMessage/StyledToast";
import usePets from "./models/PetsMode";

const Home = React.lazy(() => import("./containers/Home"));
const Login = React.lazy(() => import("./containers/Login"));
const Register = React.lazy(() => import("./containers/Register"));

export const UserContext = createContext(null);
export const PetsContext = createContext(null);

function App() {
  const { login, user, signUp } = useUser();
  const { pets, getPets } = usePets();

  return (
    <Suspense>
      <UserContext.Provider value={{ user, login, signUp }}>
        <PetsContext.Provider value={{ pets, getPets }}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PetsContext.Provider>
      </UserContext.Provider>
      <StyledToast position="top-center" hideProgressBar />
    </Suspense>
  );
}

export default App;
