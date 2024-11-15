import UserTap from "../components/UserTap";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import UserGameDetails from "@/components/UserGameDetails";
import levelConfig from "@/config/level-config";
import { uesStore } from "@/store";
import { compactNumber } from "@/lib/utils";

export default function Home() {
  const user = useUserStore();
  const { maxLevel } = uesStore();

  return (
    <div
      className="flex-1 px-4 pb-12 bg-center bg-cover relative"
      style={{
        backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,
      }}
    >
      <header className="flex items-center justify-between mt-2">
        <div className="w-fit m-auto mt-3 px-2 flex items-center h-10 bg-[#1461c9] select-none transition-all duration-150 [box-shadow:0_3px_0_0_#ac36a0] rounded-2xl border-[2px] border-[#df69d4]">
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

      <UserGameDetails className="mt-4" />
      <div className="px-3 pt-1 pb-10">
        <div className="w-fit m-auto mt-4 px-2 flex justify-center h-12 bg-[#D744C9] select-none transition-all duration-150 [box-shadow:0_3px_0_0_#ac36a0] rounded-2xl border-[2px] border-[#df69d4]">
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

      {/* Left Buttons */}
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-3">
        {/* First Left Button */}
        <div className="flex flex-col items-center space-y-1">
          <button className="glass-button w-14 h-14 relative flex items-center justify-center bg-[#00B1FF] border-2 border-white rounded-xl transition-all duration-150">
            <img
              className="object-contain w-10 h-10 mr-1"
              src="/images/coin.png"
              alt="coin icon"
            />
          </button>
          {/* Badge with smaller text */}
          <div className="mt-1 w-15 h-3 bg-yellow-400 text-black text-[8px] font-semibold flex items-center justify-center rounded-lg px-1">
            Per Tap +{user?.earn_per_tap}
          </div>
        </div>

        {/* Second Left Button */}
        <div className="flex flex-col items-center space-y-1">
          <button className="glass-button w-14 h-14 relative flex items-center justify-center bg-[#D744C9] border-2 border-white rounded-xl transition-all duration-150">
            <img
              className="object-contain w-10 h-10 mr-1"
              src="/images/coin.png"
              alt="coin icon"
            />
          </button>
          {/* Badge with smaller text */}
          <div className="mt-1 w-15 h-3 bg-yellow-400 text-black text-[8px] font-semibold flex items-center justify-center rounded-lg px-1">
            Per lvl {user?.level ? compactNumber(user.level.to_balance) : 'N/A'}
          </div>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-3">
        {/* First Right Button */}
        <div className="flex flex-col items-center space-y-1">
          <button className="glass-button w-14 h-14 relative flex items-center justify-center bg-[#00B1FF] border-2 border-white rounded-xl transition-all duration-150">
            <img
              className="object-contain w-10 h-10 mr-2"
              src="/images/clock.png"
              alt="coin icon"
            />
          </button>
          {/* Badge with smaller text */}
          <div className="mt-1 w-15 h-3 bg-yellow-400 text-black text-[8px] font-semibold flex items-center justify-center rounded-lg px-1">
            Per Hour +{compactNumber(user.production_per_hour)}
          </div>
        </div>

        {/* Second Right Button */}
        <div className="flex flex-col items-center space-y-1">
          <Link to="/leaderboard">
            <button className="glass-button w-14 h-14 relative flex items-center justify-center bg-[#f9f9f9] border-2 border-white rounded-xl transition-all duration-150">
              <img
                className="object-contain w-10 h-10 mr-1"
                src="/images/rank.png"
                alt="rank icon"
              />
            </button>
            {/* Badge with smaller text */}
            <div className="mt-1 w-14 h-3 bg-[#f9f9f9] text-black text-[8px] font-semibold flex items-center justify-center rounded-lg px-1">
              Rank
            </div>
          </Link>
        </div>
      </div>

      <UserTap />
    </div>
  );
}
