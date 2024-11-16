import { ReferralTaskType, TaskType } from "@/types/TaskType";
import { useMemo, useState, useEffect } from "react";
import TaskDrawer from "@/components/TaskDrawer";
import ListItem from "@/components/ListItem";
import Price from "@/components/Price";
import DailyDrawer from "@/components/DailyDrawer";
import CheckIcon from "@/components/icons/CheckIcon";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { cn } from "@/lib/utils";
import { uesStore } from "@/store";
import ReferralTaskDrawer from "@/components/ReferralTaskDrawer";
import levelConfig from "@/config/level-config";
import { useUserStore } from "@/store/user-store";

export default function Earn() {
  const { totalDailyRewards } = uesStore();
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isDailyDrawerOpen, setIsDailyDrawerOpen] = useState(false);
  const [isReferralTaskDrawerOpen, setIsReferralTaskDrawerOpen] = useState(false);
  const [activeReferralTask, setActiveReferralTask] = useState<ReferralTaskType | null>(null);

  const user = useUserStore();

  // Fetch all tasks
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => $http.$get<TaskType[]>("/clicker/tasks"),
  });

  // Fetch referral tasks with better error handling
  const { data: referralTasksData, isLoading: referralTasksLoading, error: referralTasksError } = useQuery({
    queryKey: ["referral-tasks"],
    queryFn: async () => {
      try {
        const response = await $http.$get<ReferralTaskType[]>("/clicker/referral-tasks");
        console.log("Referral Tasks Response:", response);
        return response;
      } catch (error) {
        console.error("Error fetching referral tasks:", error);
        throw error;
      }
    },
  });

  // Debug logging
  useEffect(() => {
    console.log("Referral Tasks Data:", referralTasksData);
    console.log("Referral Tasks Loading:", referralTasksLoading);
    console.log("Referral Tasks Error:", referralTasksError);
  }, [referralTasksData, referralTasksLoading, referralTasksError]);

  const videoTasks = useMemo(
    () => data?.filter((task) => task.type === "video") || [],
    [data]
  );

  const otherTasks = useMemo(
    () => data?.filter((task) => task.type === "other") || [],
    [data]
  );

  const cardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "0.75rem",
    boxShadow: "0 6px 0 #AC36A0, 0 8px 15px rgba(0, 0, 0, 0.2)",
    position: "relative" as const,
    transform: "translateY(-3px)",
    marginBottom: "1rem",
  };

  const headerStyle = {
    fontFamily: "'ZCOOL KuaiLe', sans-serif",
    fontSize: "1.0rem",
    textAlign: "center" as const,
    marginTop: "1rem",
    marginBottom: "1rem",
    color: "#ffffff",
    fontWeight: "bold",
  };

  // Function to render referral tasks section
  const renderReferralTasks = () => {
    if (referralTasksLoading) {
      return <div className="text-white text-center mt-4">Loading referral tasks...</div>;
    }

    if (referralTasksError) {
      return <div className="text-white text-center mt-4">Error loading referral tasks</div>;
    }

    if (!referralTasksData || referralTasksData.length === 0) {
      return <div className="text-white text-center mt-4">No referral tasks available</div>;
    }

    return (
      <>
        <h1 style={headerStyle}>Referral Tasks</h1>
        <div className="space-y-4">
          {referralTasksData.map((item) => (
            <div 
              key={item.id} 
              style={cardStyle}
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <img
                src="/images/bounty.png"
                alt="Referral"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <ListItem
                  title={item.title}
                  subtitle={
                    <Price 
                      amount={`+${item.reward.toLocaleString()}`} 
                      className="text-black font-medium"
                    />
                  }
                  onClick={() => {
                    console.log("Referral task clicked:", item);
                    setActiveReferralTask(item);
                    setIsReferralTaskDrawerOpen(true);
                  }}
                  disabled={!!item.is_completed}
                  action={
                    item.is_completed ? (
                      <CheckIcon className="w-6 h-6 text-[#27D46C]" />
                    ) : undefined
                  }
                  className={cn(
                    "flex-1 text-black font-semibold",
                    item.is_completed && "opacity-50"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col justify-end bg-cover flex-1 min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #575EFF, rgba(14, 203, 255, 0.94))',
      }}>
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 overflow-y-auto">
        {/* Top Image and Title */}
        <img
          src="/images/bounty.png"
          alt="coins"
          className="object-contain w-32 h-32 mx-auto"
        />
        <h1 style={{...headerStyle, fontSize: "1.5rem"}}>
          EARN DINOH FROM TASKS
        </h1>

        {/* Video Tasks */}
        {videoTasks.length > 0 && (
          <div className="mb-6">
            <h1 style={headerStyle}>Dino Horizon Youtube</h1>
            <div className="space-y-4">
              {videoTasks.map((item) => (
                <div key={item.id} style={cardStyle} className="flex items-center space-x-3">
                  <img
                    src={item.image || "/images/youtube.png"}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <ListItem
                    title={item.name}
                    subtitle={<Price amount={`+${item.reward_coins.toLocaleString()}`} className="text-black" />}
                    onClick={() => {
                      setActiveTask(item);
                      setIsTaskDrawerOpen(true);
                    }}
                    action={item.is_rewarded ? <CheckIcon className="w-6 h-6 text-[#27D46C]" /> : undefined}
                    disabled={item.is_rewarded}
                    className="flex-1 text-black font-semibold"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Rewards */}
        <div className="mb-6">
          <h1 style={headerStyle}>Tappy Dino Daily Reward</h1>
          <div style={cardStyle} className="flex items-center space-x-3">
            <img
              src="/images/daily-task.png"
              alt="Daily Task"
              className="w-10 h-10 rounded-full"
            />
            <ListItem
              title="Daily DINOH"
              subtitle={`+${Number(totalDailyRewards).toLocaleString()}`}
              onClick={() => setIsDailyDrawerOpen(true)}
              className="flex-1 text-black font-semibold"
            />
          </div>
        </div>

        {/* Other Tasks */}
        {otherTasks.length > 0 && (
          <div className="mb-6">
            <h1 style={headerStyle}>All Tasks</h1>
            <div className="space-y-4">
              {otherTasks.map((item) => (
                <div key={item.id} style={cardStyle} className="flex items-center space-x-3">
                  <img
                    src={item.image || "/images/bounty.png"}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <ListItem
                    title={item.name}
                    subtitle={<Price amount={`+${item.reward_coins.toLocaleString()}`} className="text-black" />}
                    disabled={item.is_rewarded}
                    action={item.is_rewarded ? <CheckIcon className="w-6 h-6 text-[#27D46C]" /> : undefined}
                    onClick={() => {
                      setActiveTask(item);
                      setIsTaskDrawerOpen(true);
                    }}
                    className="flex-1 text-black font-semibold"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Referral Tasks */}
        <div className="mb-6">
          {renderReferralTasks()}
        </div>
      </div>

      {/* Drawers */}
      <TaskDrawer
        task={activeTask}
        open={isTaskDrawerOpen}
        onOpenChange={(isOpen) => setIsTaskDrawerOpen(isOpen)}
      />
      <DailyDrawer
        open={isDailyDrawerOpen}
        onOpenChange={(isOpen) => setIsDailyDrawerOpen(isOpen)}
      />
      <ReferralTaskDrawer
        task={activeReferralTask}
        open={isReferralTaskDrawerOpen}
        onOpenChange={(isOpen) => setIsReferralTaskDrawerOpen(isOpen)}
      />
    </div>
  );
}
