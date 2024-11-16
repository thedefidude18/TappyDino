import React, { useEffect, useState } from 'react'; 
import { Loader2Icon } from "lucide-react";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { UserType } from "@/types/UserType";
import { uesStore } from "@/store";
import { compactNumber } from "@/lib/utils";
import levelConfig from "@/config/level-config";

export default function Leaderboard() {
  const { balance, level, ...user } = useUserStore();
  const [activeTab, setActiveTab] = useState(0);
  const { levels } = uesStore();

  const leaderboard = useQuery({
    queryKey: ["leaderboard", levels?.[activeTab]?.id],
    queryFn: () =>
      $http.$get<UserType[]>("/clicker/leaderboard", {
        params: { level_id: levels?.[activeTab].id },
      }),
    staleTime: Infinity,
    enabled: !!levels?.[activeTab]?.level,
  });

  useEffect(() => {
    if (level?.level) {
      const index = levels?.findIndex((item) => item.level === level.level);
      if (index !== -1) {
        setActiveTab(index);
      }
    }
  }, [level, levels]);

  return (
    <div className="flex flex-col justify-end bg-cover flex-1 overflow-visible"
      style={{
        background: 'linear-gradient(to bottom, #575EFF, rgba(14, 203, 255, 0.94))',
      }}>
      <div className="flex flex-col flex-1 w-full h-full px-4 py-2 pb-20 mt-8">
        
      {/* Tabs Ttitle */}
      <img
          src="/images/rank.png"
          alt="rank"
          className="object-contain w-20 h-20 mx-auto"
        />
        <h1
          style={{
            fontFamily: "'ZCOOL KuaiLe', sans-serif",
            fontSize: "1.3rem",
            textAlign: "center",
            marginTop: "0.4rem",
            color: "#ffffff",
          }}
        >
          LEADERBOARD
        </h1>

        
        
        
        
        
        {/* Tabs Container */}
        <div className="flex justify-between mb-6 px-2">
          {levels?.slice(0, 5).map((item, index) => (
            <button
              key={`tab-${index}`}
              onClick={() => setActiveTab(index)}
              className={`relative flex flex-col items-center w-14 py-2 rounded-[20px] transition-all ${
                activeTab === index
                  ? 'bg-yellow-400 bg-opacity-80' // Active tab style with background highlight
                  : 'opacity-70 hover:opacity-90'   // Non-active tabs with reduced opacity
              }`}
              style={{
                border: activeTab === index ? '2px solid #FFD700' : '2px solid transparent',
              }}
            >
              <div className="relative w-12 h-12 mb-1">
                <img
                  src={levelConfig.frogs[item.level]}
                  alt={item.name}
                  className="w-full h-full object-contain rounded-full"
                  style={{
                    filter: levelConfig.filter[item.level],
                  }}
                />
                {activeTab === index && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-yellow-400 rounded-full" />
                )}
              </div>
              {/* Caption Text */}
              <span className="text-[8px] text-white text-center leading-tight">
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active Level Progress */}
        {levels?.[activeTab] && levels?.[activeTab]?.level === level?.level && (
          <div className="mb-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center text-1xl font-medium text-white">
                <span style={{ fontFamily: "'ZCOOL KuaiLe', sans-serif" }}>
                  {level.name}
                </span>
              </div>
              <span className="font-medium text-white">
                {compactNumber(balance)}/{compactNumber(level.to_balance)}
              </span>
            </div>
            <div className="relative mt-2 w-full h-4 rounded-full bg-[#FFDAA3]/10 border border-[#FFDAA3]/10 overflow-hidden">
              <div className="absolute inset-0 rounded-full border-2 border-[#F7B87D]/30 animate-pulse" />
              <div
                className="relative h-full bg-gradient-to-r from-[#69ffa5] to-[#ffee00] rounded-sm"
                style={{
                  width: `${(balance / level.to_balance) * 100}%`,
                }}
              >
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white font-bold text-sm">
                  {Math.round((balance / level.to_balance) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="flex-1 overflow-y-auto">
          {leaderboard.isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : leaderboard.data && leaderboard.data.length > 0 ? (
            <div className="space-y-4">
              {leaderboard.data.map((item, key) => (
                <div
                  key={key}
                  className="flex items-center py-1 px-4 gap-2 bg-white rounded-lg"
                  style={{
                    borderRadius: '15px',
                    padding: '0.5rem',
                    boxShadow: '0 6px 0 #AC36A0, 0 8px 15px rgba(0, 0, 0, 0)',
                  }}
                >
                  <span className="w-5 text-left text-black font-medium">{key + 1}</span>
                  <span className="text-black font-medium">
                    {item.first_name} {item.last_name}
                  </span>
                  {key < 3 && (
                    <img
                      src="/images/rank.png"
                      alt="rank"
                      className="w-5 h-5 ml-2"
                    />
                  )}
                  <div className="flex items-center gap-1 ml-auto">
                    <img
                      src="/images/coin.png"
                      alt="coin"
                      className="w-4 h-4 object-contain"
                    />
                    <span className="font-medium text-black">
                      {compactNumber(item.balance)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              No data
            </div>
          )}
        </div>

        {/* Current User Position */}
        {levels && levels[activeTab]?.level === level?.level &&
          !leaderboard.data?.some((item) => item.id === user.id) && (
            <div className="mt-4 flex items-center py-2 gap-2.5 px-4 bg-[#FFAB5D1A] rounded-xl">
              <span className="w-5 text-right text-primary">+99</span>
              <span className="text-white">You</span>
              <div className="flex items-center gap-1 ml-auto">
                <img
                  src="/images/coin.png"
                  alt="coin"
                  className="w-4 h-4 object-contain"
                />
                <span className="text-white">{compactNumber(balance)}</span>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
