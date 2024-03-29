import React, { useEffect, useState } from "react";
import NavSide from "./components/navside/NavSide";
import "./App.css";
import Menu from "./components/menu/Menu";
import Swal from 'sweetalert2';

export default function App() {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [isMobile, setIsMobile] = useState(
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
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

  useEffect(() => {
    if (isMobile || !isLandscape) {
      Swal.fire({
        title: 'Peringatan!',
        text: 'Maaf, website ini tidak dapat dibuka di perangkat mobile atau dalam mode potrait.',
        icon: 'warning',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        confirmButtonText: 'Refresh',
        preConfirm: () => {
          window.location.reload();
        }
      });
    }
  }, [isMobile, isLandscape]);

  return (
    <>
      {isMobile ? (
        <p>Maaf, website ini tidak dapat dibuka di perangkat mobile.</p>
      ) : isLandscape ? (
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
