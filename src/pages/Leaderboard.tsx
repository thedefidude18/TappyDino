import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import SwapPrevIcon from "@/components/icons/SwapPrevIcon";
import SwapNextIcon from "@/components/icons/SwapNextIcon";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { compactNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { UserType } from "@/types/UserType";
import levelConfig from "@/config/level-config";
import { uesStore } from "@/store";
import { Loader2Icon } from "lucide-react";

export default function Leaderboard() {
  const { balance, level, ...user } = useUserStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const { levels } = uesStore();
  const swiperRef = useRef<SwiperRef | null>(null);

  const leaderboard = useQuery({
    queryKey: ["leaderboard", levels?.[activeIndex]?.id],
    queryFn: () =>
      $http.$get<UserType[]>("/clicker/leaderboard", {
        params: { level_id: levels?.[activeIndex].id },
      }),
    staleTime: Infinity,
    enabled: !!levels?.[activeIndex]?.level,
  });

  useEffect(() => {
    if (level?.level) {
      const index = levels?.findIndex((item) => item.level === level.level);
      if (index !== -1) {
        setActiveIndex(index);
        if (swiperRef.current) swiperRef.current.swiper.slideTo(index);
      }
    }
  }, []);

  return (
    <div
      className="flex flex-col justify-end bg-cover flex-1 overflow-visible"
      style={{
        background: 'linear-gradient(to bottom, #575EFF, rgba(14, 203, 255, 0.94))',
      }}
    >
      <div className="flex flex-col flex-1 w-full h-full px-4 py-4 pb-20 mt-8 modal-body">
        <div className="relative mb-8 overflow-visible">
          <Swiper
            ref={swiperRef}
            spaceBetween={15}
            modules={[EffectFade, Navigation]}
            effect={"fade"}
            className="rounded-[30px] overflow-visible"
            style={{
              width: '80%',
              height: '170px',
            }}
            navigation={{
              enabled: true,
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {levels?.map((item, i) => (
              <SwiperSlide key={`slide-${i}`}>
                <div
                  className="relative py-3 bg-center bg-cover rounded-[25px] overflow-visible"
                  style={{
                    backgroundImage: `url('${levelConfig.bg[item.level]}')`,
                    height: '100%',
                  }}
                >
                  {/* Trophy Badge positioned directly on the edge */}
                  <img
                    src="/images/rank.png" // Replace with your trophy icon path
                    alt="rank"
                    className="absolute top-3 right-4 w-10 h-10 transform translate-x-1/2 -translate-y-1/2" // Position trophy icon on the corner edge
                  />

                  <img
                    src={levelConfig.frogs[item.level]}
                    alt="level image"
                    className="object-contain mx-auto w-28 h-28"
                    style={{
                      filter: levelConfig.filter[item.level],
                    }}
                  />
                  <p className="mt-2 text-sm text-center text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-center text-white/70">
                    From {compactNumber(item.from_balance)}
                  </p>
                </div>
              </SwiperSlide>
            ))}
            <button className="absolute z-[999] left-2 flex items-center justify-center text-white custom-swiper-button-prev top-1/2 -translate-y-1/2 disabled:opacity-30">
              <SwapPrevIcon />
            </button>
            <button className="absolute z-[999] right-2 flex items-center justify-center text-white custom-swiper-button-next top-1/2 -translate-y-1/2 disabled:opacity-30">
              <SwapNextIcon />
            </button>
          </Swiper>
        </div>
        {levels?.[activeIndex] &&
          levels?.[activeIndex]?.level === level?.level && (
            <div className="mt-1">
              <div className="flex items-center justify-between gap-2 ">
                <div className="flex items-center text-2xl font-bold">
                <span style={{ fontFamily: "'ZCOOL KuaiLe', sans-serif" }}>
  {level.name}
</span>
                </div>
                <span className="font-medium font-[ZCOOL KuaiLe]">
                  {compactNumber(balance)}/{compactNumber(level!.to_balance)}
                </span>
              </div>
              <div className="relative mt-2 w-full h-6 rounded-full bg-[#FFDAA3]/10 border border-[#FFDAA3]/10 shadow-lg overflow-hidden">
  {/* Outer Glow */}
  <div className="absolute inset-0 rounded-full border-2 border-[#F7B87D]/30 animate-pulse" />

  {/* Progress bar */}
  <div
    className="relative h-full bg-gradient-to-r from-[#FFC371] to-[#ffee00] rounded-sm"
    style={{
      width: `${(balance / level.to_balance) * 100}%`,
    }}
  >
    {/* Optional progress percentage text */}
    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white font-bold text-sm">
      {Math.round((balance / level.to_balance) * 100)}%
    </span>
  </div>
</div>
</div>
          )}
       {/* User List for Selected Tab */}
<div className="relative flex-1 mt-7">
  {/* Add a style block for global styles */}
  <style>
    {`
      .scrollbar-hide::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
      .scrollbar-hide {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;     /* Firefox */
      }
    `}
  </style>

  <div className="absolute inset-0 w-full h-full divide-y divide-[#D9D9D9]/10 overflow-y-auto scrollbar-hide">
    {leaderboard.isLoading ? (
      <div className="flex items-center justify-center h-full">
        <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
      </div>
    ) : leaderboard.data && leaderboard.data.length > 0 ? (
      leaderboard.data.map((item, key) => (
        <div
          key={key}
          className="flex items-center py-1 px-4 gap-2 mb-4 rounded-lg"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '15px',
            padding: '0.6rem',
            boxShadow: '0 6px 0 #AC36A0, 0 8px 15px rgba(0, 0, 0, 0)',
          }}
        >
          <span className="w-5 text-left text-black font-bold">{key + 1}</span>
          <span className="text-black font-medium">
            {item.first_name} {item.last_name}
          </span>
          {key < 3 && (
            <img
              src="/images/rank.png"
              alt="rank"
              className="w-5 h-5 ml-2 text-gold"
            />
          )}
          <div className="flex items-center gap-1 ml-auto">
            <img
              src="/images/coin.png"
              alt="coin"
              className="object-contain w-4 h-4"
            />
            <span className="font-md text-black">
              {compactNumber(item.balance)}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="flex items-center justify-center h-full text-white">
        No data
      </div>
    )}
  </div>
</div>

        {/* Show user's data if they are not in the leaderboard */}
        {levels &&
          levels[activeIndex]?.level === level?.level &&
          !leaderboard.data?.some((item) => item.id === user.id) && (
            <div className="mt-4 flex items-center py-2 gap-2.5 px-4 bg-[#FFAB5D1A] rounded-xl">
              <span className="w-5 text-right text-primary">+99</span>
              <span className="text-white">You</span>
              <div className="flex items-center gap-1 ml-auto">
                <img
                  src="/images/coin.png"
                  alt="coin"
                  className="object-contain w-4 h-4"
                />
                <span>{balance}</span>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
