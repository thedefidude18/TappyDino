import UserTap from "../components/UserTap";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import UserGameDetails from "@/components/UserGameDetails";
import levelConfig from "@/config/level-config";
import { uesStore } from "@/store";
import Image from 'next/image';
import { compactNumber } from "@/lib/utils";


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
  <div className="w-fit m-auto mt-5 px-2 flex items-center h-10 bg-[#1461c9] select-none transition-all duration-150 [box-shadow:0_3px_0_0_#ac36a0] rounded-2xl border-[2px] border-[#df69d4]">
    <img
      src="/images/avatar.png"
      alt="user-avatar"
      className="object-cover w-7 h-7 rounded-sm"
    />
    <span
      className="big-outline ml-2 text-white font-bold text-sm"
      style={{ fontFamily: "'ZCOOL KuaiLe', sans-serif" }}
    >
      {user?.first_name} {user?.last_name}
    </span>
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
    <span
      className="big-outline flex flex-col justify-center items-center h-full text-white font-bold text-3xl mr-2"
      style={{ fontFamily: "'ZCOOL KuaiLe', sans-serif" }}
    >
      {Math.floor(user.balance)?.toLocaleString()}
    </span>
  </div>
</div>


      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        {/* Left side buttons */}
       <div className="flex flex-col items-center space-y-1">
  <button
    className="glass-button w-14 h-14 flex items-center justify-center bg-[#00B1FF] border-2 border-[#1B3746] rounded-xl shadow-md transition-all duration-150 hover:shadow-lg active:shadow-sm"
    aria-label="Earn per tap"
  >
    <img className="object-contain w-10 h-10 mr-1" src="/images/coin.png" alt="coin icon" />
  </button>
  <span className="text-xs font-bold text-center text-white">Earn per tap</span><span className="text-sm font-bold text-white">+{user?.earn_per_tap}</span>
</div>



        <div className="flex flex-col items-center">
        <button
    className="glass-button w-14 h-14 flex items-center justify-center bg-[#D744C9] border-2 border-[#df69d4] rounded-xl shadow-md transition-all duration-150 hover:shadow-lg active:shadow-sm"
    aria-label="Coins to level up"
  >
    <img className="object-contain w-10 h-10 mr-1" src="/images/coin.png" alt="coin icon" />
  </button>
  <span className="text-xs font-bold text-center text-white">Level up</span><span className="text-sm font-bold text-white">
      {user?.level ? compactNumber(user.level.to_balance) : 'N/A'}
    </span>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        {/* Right side buttons */}
        <div className="flex flex-col items-center space-y-1">
  <button
    className="glass-button w-14 h-14 flex items-center justify-center bg-[#00B1FF] border-2 border-[#1B3746] rounded-xl shadow-md transition-all duration-150 hover:shadow-lg active:shadow-sm"
    aria-label="Profit per hour"
  >
    <img className="object-contain w-10 h-10 mr-1" src="/images/coin.png" alt="coin icon" />
  </button>
  <span className="text-xs font-bold text-center text-white">DINOH p/h</span>
  <span className="text-sm font-bold text-white">
    +{compactNumber(user.production_per_hour)}
  </span>
</div>


        <div className="flex flex-col items-center">
        <Link to="/leaderboard">
  <button
    className="glass-button w-14 h-14 flex items-center justify-center bg-[#f9f9f9] border-2 border-[#df69d4] rounded-xl shadow-md transition-all duration-150 hover:shadow-lg active:shadow-sm"
    aria-label="Coins to level up"
  >
    <img className="object-contain w-10 h-10 mr-1" src="/images/coin.png" alt="coin icon" />
    <span className="text-sm font-bold text-white"></span>
  </button>
</Link>
  <span className="text-xs font-bold text-center text-white">Rank</span>
        </div>
      </div>
      <UserTap />
    </div>
  );
}
