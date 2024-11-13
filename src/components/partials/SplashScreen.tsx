import { useState, useEffect } from "react";
import TelegramIcon from "../icons/TelegramIcon"; 
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";

const socialLinks = [
  {
    title: "Telegram",
    url: "",
    icon: TelegramIcon,
  },
  {
    title: "Youtube",
    url: "",
    icon: YoutubeIcon,
  },
  {
    title: "Twitter",
    url: "",
    icon: TwitterIcon,
  },
];

const splashScreenImages = [
  "/images/splash-screen/bg.png",
];

export default function SplashScreen() {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    // Increment loading percentage up to 100%
    const loadingInterval = setInterval(() => {
      setLoadingPercentage((prev) => (prev < 100 ? prev + (100 / 30) : 100)); // ~3.33% every 100ms
    }, 100);

    if (loadingPercentage >= 100) {
      clearInterval(loadingInterval); // Stop the interval once 100% is reached
    }

    return () => clearInterval(loadingInterval);
  }, [loadingPercentage]);

  const randomImage = splashScreenImages[Math.floor(Math.random() * splashScreenImages.length)];

  return (
    <div
      className="flex flex-col items-center justify-between pt-16 bg-cover bg-center w-full max-w-lg h-[--tg-viewport-height] mx-auto"
      style={{ backgroundImage: `url('${randomImage}')` }}
    >
      <img src="/images/logo.png" alt="logo" className="h-48 max-w-full" />
      
      <div className="flex flex-col items-center w-full">
        <h1 className="text-6xl font-medium text-center uppercase text-shadow">
          {/* Page Title or Message */}
        </h1>
        
        {/* Loading Bar */}
        <div className="relative w-4/5 h-6 bg-gray-600 rounded-full overflow-hidden shadow-lg mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-blue-600 transition-all ease-linear"
            style={{
              width: `${loadingPercentage}%`,
            }}
          />
          {/* Loading Percentage Display */}
          <div
            className="absolute top-0 left-0 h-full flex items-center justify-center text-white font-bold"
            style={{
              width: '100%',
            }}
          >
            {Math.round(loadingPercentage)}%
          </div>
        </div>
        
        <p className="mt-3 text-sm font-bold uppercase text-primary"></p>
      </div>
    </div>
  );
}
