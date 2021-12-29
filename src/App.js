import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import SigninScreen from "./pages/SigninScreen";
import SignupScreen from "./pages/RegisterScreen";
import AddShipentScreen from "./pages/AddShipmentScreen";

import ProtectedRoute from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import ManageShipmentScreen from "./pages/ManageShipmentScreen";
import { useSelector } from "react-redux";
import axios from "axios";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert("unauthenticated");
    }
    return error;
  }
);
function App() {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <>
      {userInfo && <Header userInfo={userInfo} />}
      <Routes>
        <Route path="/" element={<SigninScreen />} exact />
        <Route path="/register" element={<SignupScreen />} exact />
        <Route
          path="/home"
          exact
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addshipment"
          exact
          element={
            <ProtectedRoute>
              <AddShipentScreen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateshipment/:id"
          exact
          element={
            <ProtectedRoute>
              <ManageShipmentScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
      {userInfo && <Footer />}
    </>
  );
}

export default App;
