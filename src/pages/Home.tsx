import UserTap from "../components/UserTap";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import UserGameDetails from "@/components/UserGameDetails";
import levelConfig from "@/config/level-config";
import { uesStore } from "@/store";
import Image from 'next/image';


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
<div className="px-4 pt-1 pb-24">
  <div className="w-fit m-auto mt-6 px-2 flex justify-center h-12 bg-[#D744C9] select-none transition-all duration-150 [box-shadow:0_3px_0_0_#ac36a0] rounded-2xl border-[2px] border-[#df69d4]">
    <img
      src="/images/coins.png"
      alt="coins"
      className="object-contain w-22 h-30"
    />
    <span className="lilita-one-regular !italic big-outline flex flex-col justify-center items-center h-full text-white font-bold text-3xl mr-2">
      {Math.floor(user.balance)?.toLocaleString()}
    </span>
  </div>
</div>

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        {/* Left side buttons */}
        <div className="flex flex-col items-center">
          <button className="glass-button w-12 h-12" aria-label="Earn per tap">
            <img src="/images/coin_box.png" alt="Earn per tap" />
          </button>
          <span className="text-xs font-bold mt-1">Earn per tap +2</span>
        </div>
        <div className="flex flex-col items-center">
          <button className="glass-button w-12 h-12" aria-label="Coins to level up">
            <img src="/images/coin_box.png" alt="Coins to level up" />
          </button>
          <span className="text-xs font-bold mt-1">Coins to level up 15k</span>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        {/* Right side buttons */}
        <div className="flex flex-col items-center">
          <button className="glass-button w-12 h-12" aria-label="Profit per hour">
            <img src="/images/coin_box.png" alt="Profit per hour" />
          </button>
          <span className="text-xs font-bold mt-1">Profit per hour +0</span>
        </div>
        <div className="flex flex-col items-center">
          <button className="glass-button w-12 h-12" aria-label="Other Action">
            <img src="/images/coin_box.png" alt="Other Action" />
          </button>
          <span className="text-xs font-bold mt-1">Other Action</span>
        </div>
      </div>
      <UserTap />
    </div>
  );
}
