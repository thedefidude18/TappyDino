import React, { useEffect, useRef, useState } from "react";
import { useClicksStore } from "../store/clicks-store";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { $http } from "@/lib/http";
import levelConfig from "@/config/level-config";

// Correct paths for your images
import coin_box from "../public/images/coin_box.png";
import setting_pic from "../public/images/setting_pic.png";
import alert_pic from "../public/images/alert_pic.png";
import rank_pic from "../public/images/rank_pic.png";
import shop_pic from "../public/images/shop_pic.png";
import time_pic from "../public/images/time_pic.png";

export default function UserTap(props: React.HTMLProps<HTMLDivElement>) {
  const { gameLevelIndex, LEVELS, user } = useUserStore();
  const { handleSettingsClick, tabMe, userTapButtonRef } = useClicksStore();
  const [debouncedUserPoints, setDebouncedUserPoints] = useState(user.points);

  // Example of using debounced points (adjust as needed)
  const debouncedPoints = useDebounce(user.points, 1000);

  useEffect(() => {
    setDebouncedUserPoints(debouncedPoints);
  }, [debouncedPoints]);

  return (
    <div {...props}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <img
            src="/images/coin.png"
            alt="coin"
            className="object-contain w-8 h-8"
          />
          <span className="text-xs font-bold">
            {user.available_energy} / {user.max_energy}
          </span>
        </div>
      </div>

      {/* Image button for tap */}
      <div className="mt-4 mb-8">
        <button
          ref={userTapButtonRef}
          className="flex items-center justify-center mx-auto transition-all rounded-full outline-none select-none disabled:opacity-80 disabled:cursor-not-allowed"
          disabled={user.available_energy < user.earn_per_tap}
          onPointerUp={tabMe}
        >
          <img
            src={coin_box}
            alt="level image"
            className="object-contain max-w-full w-80 h-80"
            style={{ filter: levelConfig.filter[user.level?.level || 1] }}
          />
        </button>
      </div>

      {/* Left-side absolute section with level and speed */}
      <div className="absolute top-[30%] left-3 p-2 rounded-xl bg-black bg-opacity-20">
        <div>
          <img
            src={coin_box}
            alt="coin_box"
            className="w-[48px] !h-[48px] m-auto"
          />
          <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-2 text-center tracking-tighter">
            {LEVELS[gameLevelIndex].name}&#8226; {gameLevelIndex + 1}/{LEVELS.length}
          </p>
        </div>
        <div>
          <Link href="#">
            <img
              src="/images/speed.png"
              alt="coin_box"
              className="w-[48px] !h-[48px] m-auto cursor-pointer active:scale-95 transition transform duration-150"
            />
            <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-1 text-center tracking-tighter">
              Speed
            </p>
          </Link>
        </div>
      </div>

      {/* Right-side absolute section with settings, rank, shop */}
      <div className="absolute top-[30%] right-3 p-2 rounded-xl bg-black bg-opacity-20">
        <div>
          <div
            className="relative cursor-pointer active:scale-95 transition transform duration-150"
            onClick={handleSettingsClick}
          >
            <img
              src={setting_pic}
              alt="coin_box"
              className="w-[48px] !h-[48px] m-auto"
            />
            <img
              src={alert_pic}
              alt="alert_icon"
              className="w-[18px] !h-[18px] m-auto absolute top-[0px] -right-[9px]"
            />
          </div>
          <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-2 text-center tracking-tighter">
            Settings
          </p>
        </div>
        <div>
          <Link href="#">
            <img
              src={rank_pic}
              alt="rank_icon"
              className="w-[48px] !h-[48px] m-auto cursor-pointer active:scale-95 transition transform duration-150"
            />
            <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-2 text-center tracking-tighter">
              Rank
            </p>
          </Link>
        </div>
        <div>
          <Link href="#">
            <img
              src={shop_pic}
              alt="shop_icon"
              className="w-[48px] !h-[48px] m-auto cursor-pointer active:scale-95 transition transform duration-150"
            />
            <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-2 text-center tracking-tighter">
              Shop
            </p>
          </Link>
        </div>
        <div>
          <img
            src={time_pic}
            alt="time_icon"
            className="w-[48px] !h-[48px] m-auto"
          />
          <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-1 text-center tracking-tighter">
            2d 06h
          </p>
        </div>
      </div>
    </div>
  );
}
