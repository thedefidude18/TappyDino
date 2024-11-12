import UserTap from "../components/UserTap";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import UserGameDetails from "@/components/UserGameDetails";
import levelConfig from "@/config/level-config";
import { uesStore } from "@/store";

export default function Home() {
  const user = useUserStore();
  const { maxLevel } = uesStore();

  return (
    <div
      className="flex-1 px-5 pb-20 bg-center bg-cover"
      style={{
        backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,
      }}
    >
      <header className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 px-3 py-2 border-2 rounded-full bg-black/20 border-white/10">
          <img
            src="/images/avatar.png"
            alt="user-avatar"
            className="object-cover w-8 h-8 rounded-full"
          />
          <p className="text-sm font-medium uppercase">
            {user?.first_name} {user?.last_name}
          </p>
        </div>
      </header>
      <UserGameDetails className="mt-6" />
      <div className="flex mt-6 space-x-1.5 justify-center items-center select-none">
        <img
          src="/images/coins.png"
          alt="coins"
          className="object-contain w-20 h-20"
        />
        <span className="text-3xl font-bold text-gradient">
          {Math.floor(user.balance)?.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between items-center mt-10">
        {/* Left-side Buttons */}
        <div className="flex flex-col space-y-4 items-center">
          <div className="relative w-12 h-12 flex items-center justify-center bg-white/30 shadow-lg shadow-white/30 rounded">
            <img src="/images/coin_box.png" alt="icon1" className="w-10 h-10" />
          </div>
          <p className="text-xs font-bold text-center mt-1">Earn per tap +2</p>

          <div className="relative w-12 h-12 flex items-center justify-center bg-white/30 shadow-lg shadow-white/30 rounded">
            <img src="/images/coin_box.png" alt="icon2" className="w-10 h-10" />
          </div>
          <p className="text-xs font-bold text-center mt-1">Coins to level up 15k</p>
        </div>

        {/* Right-side Buttons */}
        <div className="flex flex-col space-y-4 items-center">
          <div className="relative w-12 h-12 flex items-center justify-center bg-white/30 shadow-lg shadow-white/30 rounded">
            <img src="/images/coin_box.png" alt="icon3" className="w-10 h-10" />
          </div>
          <p className="text-xs font-bold text-center mt-1">Profit per hour +0</p>

          <div className="relative w-12 h-12 flex items-center justify-center bg-white/30 shadow-lg shadow-white/30 rounded">
            <img src="/images/coin_box.png" alt="icon4" className="w-10 h-10" />
          </div>
          <p className="text-xs font-bold text-center mt-1">Bonus +1%</p>
        </div>
      </div>

      <UserTap />
    </div>
  );
}
