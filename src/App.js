import React from "react";
import { Route, Routes } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Login from "./components/Login";
import MapComponent from "./MapComponent";
import Friends from "./components/Friends";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/:email" element={<MapComponent />} />
        <Route path="/friends" element={<Friends />} />

      </Routes>
    </>
  );
}
