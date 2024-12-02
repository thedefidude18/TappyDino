const levelConfig = {
  frogs: {
    1: "/images/levels/coin1.gif",
    2: "/images/levels/coin2.gif",
    3: "/images/levels/coin3.gif",
    4: "/images/levels/coin4.gif",
    5: "/images/levels/coin5.gif",
  } as Record<number, string>,

  filter: {
    1: "drop-shadow(0 0 64px rgba(209, 173, 255, 0.5))",
    2: "drop-shadow(0 0 64px rgba(209, 173, 255, 0.5))",
    3: "drop-shadow(0 0 64px rgba(209, 173, 255, 0.5))",
    4: "drop-shadow(0 0 64px rgba(209, 173, 255, 0.5))",
    5: "drop-shadow(0 0 64px rgba(209, 173, 255, 0.5))",
  } as Record<number, string>,

  bg: {
    1: "/images/levels/bg.png",
    2: "/images/levels/bg-level-2.png",
    3: "/images/levels/bg-level-3.png",
    4: "/images/levels/bg-level-4.png",
    5: "/images/levels/bg-level-5.png",
  } as Record<number, string>,
};

export default levelConfig;
