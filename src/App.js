import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import PrivateRoute from "./components/core/HomePage/Registration/PrivateRoute";
// import Dashboard from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="w-screen min-h-screen bg-richblack-100 flex flex-col font-inter ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
        />
        {/* Make dashboard a protected route */}
        <Route
          path="/dashboard"
          element={<PrivateRoute isLoggedIn={isLoggedIn}></PrivateRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
