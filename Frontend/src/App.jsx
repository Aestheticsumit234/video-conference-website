import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Authentication from "./pages/authentication";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import VideoMeet from "./pages/VideoMeet";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/auth" element={<Authentication />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:url" element={<VideoMeet/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
