import React, { Suspense, createContext } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import useUser from "./models/UserModel";
import StyledToast from "./components/ToastMessage/StyledToast";
import usePets from "./models/PetsMode";

const Home = React.lazy(() => import("./containers/Home"));
const Login = React.lazy(() => import("./containers/Login"));
const Register = React.lazy(() => import("./containers/Register"));
const Favourite = React.lazy(() => import("./containers/Favourite"));

export const UserContext = createContext(null);
export const PetsContext = createContext(null);

function App() {
  const userModel = useUser();
  const petModel = usePets();

  return (
    <Suspense>
      <UserContext.Provider value={userModel}>
        <PetsContext.Provider value={petModel}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/favourite" element={<Favourite />} /> */}
                <Route path="/" element={<Home />} />
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
