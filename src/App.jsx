import React, { useEffect, useState } from "react";
import NavSide from "./components/navside/NavSide";
import "./App.css";
import Menu from "./components/menu/Menu";

export default function App() {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  const checkOrientation = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <>
      {isLandscape ? (
        <div className="allcontent">
          <NavSide />
          <Menu />
        </div>
      ) : (
        <p>Harap putar layar Anda menjadi landscape agar bisa melihat konten</p>
      )}
    </>
  );
}
