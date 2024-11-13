import { useState } from "react";
import { Link } from 'react-router-dom';

export default function GameBanners() {
  const [buttonText, setButtonText] = useState("Tap now!");

  const topBanner = {
    title: "Tap and Collect Dino",
    buttonText: "Tap now!",
    backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
  };

  const lowerBanner = {
    title: "Run, Jump and Earn Dino",
    buttonText: "Coming Soon",
    backgroundImage: "url('/images/friends.png')",
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #000, #333)",
        fontFamily: "'ZCOOL KuaiLe', sans-serif",
        padding: "2vw",
      }}
    >
      
      {/* Upper Banner */}
      <div
        style={{
          width: "94vw",
          height: "60vh", // Reduced height to improve visibility of lower banner
          backgroundImage: topBanner.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "2vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#ffffff",
          position: "relative",
          marginBottom: "2vh",
          padding: "2vw",
        }}
      >
        
        <Link to="/home"> {/* Adjust this if the route is different */}
      <button
        style={{
          padding: "2vw 5vw",
          background: "linear-gradient(to bottom, #FCD113, #F6BA06)",
          color: "#000",
          borderRadius: "32vw",
          fontSize: "4vw",
          fontWeight: "bold",
          border: "none",
          position: "absolute",
          bottom: "2vw",
          left: "2vw", // Positioned on bottom left
        }}
      >
       Tap now!
      </button>
    </Link>
      </div>

      {/* Lower Banner */}
      <div
        style={{
          width: "94vw",
          height: "26vh",
          backgroundImage: lowerBanner.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "2vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#ffffff",
          position: "relative",
          padding: "2vw",
          marginBottom: "2vh", // Additional margin to ensure it's visible on screen
        }}
      >
                </div>
      </div>
    
  );
}
