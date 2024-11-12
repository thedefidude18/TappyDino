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
      className="flex-1 px-5 pb-20 bg-center bg-cover relative"
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
      <div className="">
        <Link
          to={"/leaderboard"}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center text-xs">
            <span>{user.level?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs">Level</span>
            <span className="font-bold">
              {user.level?.level}/{maxLevel}
            </span>
          </div>
        </Link>
        <div className="bg-[#FFDAA3]/10 border overflow-hidden border-[#FFDAA3]/10 rounded-full mt-2 h-4 w-full">
          <div
            className="bg-[linear-gradient(180deg,#FBEDE0_0%,#F7B87D_21%,#F3A155_52%,#E6824B_84%,#D36224_100%)] h-full"
            style={{
              width: `${(user.balance! / user.level!.to_balance) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Glassy buttons with shadow */}
      <div className="absolute left-4 top-1/3 transform -translate-y-1/3 flex flex-col gap-4">
        <button className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex justify-center items-center">
          <img
            src="https://raw.githubusercontent.com/thedefidude18/TappyDino/refs/heads/main/public/images/coin_box.png"
            alt="Button Icon 1"
            className="object-contain w-16 h-16"
          />
        </button>
        <p className="text-xs font-bold text-white text-center">Earn per tap +2</p>
        
        <button className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex justify-center items-center">
          <img
            src="https://raw.githubusercontent.com/thedefidude18/TappyDino/refs/heads/main/public/images/coin_box.png"
            alt="Button Icon 2"
            className="object-contain w-16 h-16"
          />
        </button>
        <p className="text-xs font-bold text-white text-center">Coins to level up 15k</p>

        <button className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex justify-center items-center">
          <img
            src="https://raw.githubusercontent.com/thedefidude18/TappyDino/refs/heads/main/public/images/coin_box.png"
            alt="Button Icon 3"
            className="object-contain w-16 h-16"
          />
        </button>
        <p className="text-xs font-bold text-white text-center">Profit per hour +0</p>
      </div>

      <div className="absolute right-4 top-1/3 transform -translate-y-1/3 flex flex-col gap-4">
        <button className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex justify-center items-center">
          <img
            src="https://raw.githubusercontent.com/thedefidude18/TappyDino/refs/heads/main/public/images/coin_box.png"
            alt="Button Icon 4"
            className="object-contain w-16 h-16"
          />
        </button>
        <p className="text-xs font-bold text-white text-center">Button 4</p>

        <button className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex justify-center items-center">
          <img
            src="https://raw.githubusercontent.com/thedefidude18/TappyDino/refs/heads/main/public/images/coin_box.png"
            alt="Button Icon 5"
            className="object-contain w-16 h-16"
          />
        </button>
        <p className="text-xs font-bold text-white text-center">Button 5</p>
      </div>

      <UserTap />
    </div>
  );
}
