import React from "react";
import NavSide from "./components/navside/NavSide";
import "./App.css";
import Menu from "./components/menu/Menu";

export default function App() {
  return (
    <div className="allcontent">
      <NavSide />
      <Menu />
    </div>
  );
}
