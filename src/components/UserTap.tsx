import React, { useEffect, useRef, useState } from "react";
import { useClicksStore } from "../store/clicks-store";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { $http } from "@/lib/http";
import levelConfig from "@/config/level-config";

// Correct paths for your images - use relative paths from the root
const coin_box = "/images/coin_box.png";
const setting_pic = "/images/setting_pic.png";
const rank_pic = "/images/rank_pic.png";
const shop_pic = "/images/shop_pic.png";

export default function UserTap(props: React.HTMLProps<HTMLDivElement>) {
  const { gameLevelIndex, LEVELS, user } = useUserStore();
  const { handleSettingsClick, tabMe, userTapButtonRef } = useClicksStore();
  const [debouncedUserPoints, setDebouncedUserPoints] = useState(user?.points || 0);

  // Example of using debounced points (adjust as needed)
  const debouncedPoints = useDebounce(user?.points, 1000);

  useEffect(() => {
    // Check if the user object exists before updating state
    if (user) {
      setDebouncedUserPoints(debouncedPoints);
    }
  }, [debouncedPoints, user]); // Added user as a dependency

  // Check if user is defined before rendering
  if (!user) {
    return <div>Loading...</div>; // Optionally display a loading message or spinner
  }

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

      {/* Left-side absolute section with two buttons */}
      <div className="absolute top-[30%] left-3 p-2 rounded-xl bg-black bg-opacity-20">
        <div>
          <Link to="/settings">
            <img
              src={setting_pic}
              alt="settings"
              className="w-[48px] !h-[48px] m-auto cursor-pointer active:scale-95 transition transform duration-150"
            />
            <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-2 text-center tracking-tighter">
              Settings
            </p>
          </Link>
        </div>
        <div>
          <Link to="/rank">
            <img
              src={rank_pic}
              alt="rank"
              className="w-[48px] !h-[48px] m-auto cursor-pointer active:scale-95 transition transform duration-150"
            />
            <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-2 text-center tracking-tighter">
              Rank
            </p>
          </Link>
        </div>
      </div>

      {/* Right-side absolute section with two buttons */}
      <div className="absolute top-[30%] right-3 p-2 rounded-xl bg-black bg-opacity-20">
        <div>
          <Link to="/shop">
            <img
              src={shop_pic}
              alt="shop"
              className="w-[48px] !h-[48px] m-auto cursor-pointer active:scale-95 transition transform duration-150"
            />
            <p className="text-white small-outline poppins-thin text-xs !font-extrabold m-auto mt-1 mb-2 text-center tracking-tighter">
              Shop
            </p>
          </Link>
        </div>
        <div>
          <img
            src="/images/time_pic.png"
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
