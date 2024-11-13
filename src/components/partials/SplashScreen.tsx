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
  const randomImage =
    splashScreenImages[Math.floor(Math.random() * splashScreenImages.length)];
  return (
    <div
      className="flex flex-col items-center justify-between pt-16 bg-cover bg-center w-full max-w-lg h-[--tg-viewport-height] mx-auto"
      style={{ backgroundImage: `url('${randomImage}')` }}
    >
      <img src="/images/logo.png" alt="logo" className="h-48 max-w-full" />
      <div className="flex flex-col items-center w-full">
          <h1 className="text-6xl font-medium text-center uppercase text-shadow">
            
          </h1>
          <img
            src="/images/loader.png"
            alt="loader"
            className="mt-3 animate-spin"
          />
          <p className="mt-3 text-sm font-bold uppercase text-primary"> 
          </p>
          </div>
        </div>
     
  );
}
