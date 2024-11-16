import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { $http } from "@/lib/http";
import { uesStore } from "@/store";
import { useUserStore } from "@/store/user-store";
import ReferralTaskDrawer from "./ReferralTaskDrawer";
import CopyIcon from "@/components/icons/CopyIcon";
import { Button } from "@/components/ui/button";
import { compactNumber } from "@/lib/utils";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { ReferralTaskType } from "@/types/TaskType";
import { PaginationResponse } from "@/types/Response";
import { UserType } from "@/types/UserType";

const shareMessage = encodeURI("Play Tappy Dino with me!");

export default function Friends() {
  const [, copy] = useCopyToClipboard();
  const { telegram_id } = useUserStore();
  const { referral, totalReferals } = uesStore();
  const referralLink = `${import.meta.env.VITE_BOT_URL}/?startapp=ref${telegram_id}`;

  // Manage referral task drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<ReferralTaskType | null>(null);

  // Fetch referred users
  const referredUsers = useQuery({
    queryKey: ["referredUsers"],
    queryFn: () => $http.$get<PaginationResponse<UserType>>("/referred-users"),
  });

  // Referral Task Mock Data
  const referralTask: ReferralTaskType = {
    id: "123",
    title: "Invite 5 friends",
    reward: 50,
    is_completed: false,
    number_of_referrals: 5,
  };

  // Open drawer when referral task is completed
  useEffect(() => {
    if (
      totalReferals >= referralTask.number_of_referrals && 
      !referralTask.is_completed
    ) {
      setCurrentTask(referralTask);
      setDrawerOpen(true);
    }
  }, [totalReferals]);

  return (
    <div
      className="flex flex-col justify-end bg-cover flex-1"
      style={{
        background: "linear-gradient(to bottom, #575EFF, rgba(14, 203, 255, 0.94))",
      }}
    >
      <ReferralTaskDrawer
        task={currentTask}
        open={drawerOpen}
        onOpenChange={(isOpen) => setDrawerOpen(isOpen)}
      />
      <div className="flex flex-col flex-1 w-full h-full px-6 py-1 pb-24 mt-5 modal-body">
        <img
          src="/images/friends.png"
          alt="friends"
          className="object-contain w-32 h-32 mx-auto"
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
          FRIENDS
        </h1>
        <h1
          style={{
            fontFamily: "'ZCOOL KuaiLe', sans-serif",
            fontSize: "1.0rem",
            textAlign: "center",
            marginTop: "0.2rem",
            color: "#ffffff",
          }}
        >
          You and your friends will receive DINOH bonus!
        </h1>
        <div className="mt-4 space-y-2">
          <div className="space-y-4">
            <button
              className="flex items-center w-full gap-4 rounded-lg"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
                padding: "0.4rem 1rem",
                boxShadow: "0 6px 0 #AC36A0, 0 8px 15px rgba(0, 0, 0, 0.2)",
                position: "relative",
                transform: "translateY(-3px)",
              }}
            >
              <img
                src="/images/chest.png"
                alt="chest"
                className="object-contain w-9 h-9"
              />
              <div className="text-sm font-medium text-left text-black">
                <p>Invite a friend</p>
                <div className="flex items-center space-x-1">
                  <img
                    src="/images/coin.png"
                    alt="coin"
                    className="object-contain w-5 h-5"
                  />
                  <span className="font-bold text-black">
                    +{referral.base.welcome.toLocaleString()}
                  </span>
                  <span className="text-sm text-black">for you and your friend</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="relative flex-1">
          <p className="mt-8 text-sm font-bold uppercase">
            List of your friends{" "}
            {referredUsers.data?.meta
              ? `(${referredUsers.data?.meta.total})`
              : null}
          </p>
          {referredUsers.isLoading ? (
            <div className="flex items-center justify-center w-full h-14">
              <div className="w-5 h-5 border-2 border-t-[#D9D9D9]/10 rounded-full border-t animate-spin"></div>
            </div>
          ) : referredUsers.data?.data?.length ? (
            <div className="mt-4 space-y-4">
              {referredUsers.data.data.map((item, key) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/avatar.png"
                      alt="avatar"
                      className="object-contain w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {item.first_name} {item.last_name}
                      </p>
                      <p className="text-xs">{item.level?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/coin.png"
                      alt="coin"
                      className="object-contain w-5 h-5"
                    />
                    <span className="text-sm font-medium text-primary">
                      {compactNumber(item.balance)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center px-4 mt-4 border-2 border-dashed rounded-xl border-white/10 h-14">
              <p className="text-xs font-medium text-center text-white/30">
                You didn’t invite anyone yet
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-3" style={{ marginTop: "1rem" }}>
          <Button
            className="flex-shrink-0"
            onClick={() => {
              copy(referralLink);
              toast.success("Referral link copied to clipboard");
            }}
          >
            <CopyIcon className="w-5 h-5" />
          </Button>
          <Button
            className="flex-1"
            onClick={() =>
              Telegram.WebApp.openTelegramLink(
                `https://t.me/share/url?text=${shareMessage}&url=${referralLink}`
              )
            }
          >
            Invite a friend
          </Button>
        </div>
      </div>
    </div>
  );
}
