import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const links = [
  { name: "Home", link: "/", image: "/images/explore.png" },
  { name: "Friends", link: "/friends", image: "/images/friends.png" },
  { name: "Tappy", link: "/game", image: "/images/main_button.png" },
  { name: "Tasks", link: "/earn", image: "/images/bounty.png" },
  { name: "Rewards", link: "/airdrop", image: "/images/toncoin.png" },
];

export default function AppBar() {
  const { pathname } = useLocation();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap');
          .zcool-font {
            font-family: 'ZCOOL KuaiLe', cursive;
          }
        `}
      </style>

      <div className="fixed bottom-0 w-full flex justify-center items-center z-40 text-xs">
        <div className="w-full max-w-xl flex justify-around items-center bg-black rounded-t-lg border border-gray-600 p-1">
          {links.map((link, key) => (
            <Link
              key={key}
              to={link.link}
              className="flex-1 py-0 px-[1px]"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center h-16 p-1 transition-all duration-300 rounded-lg",
                  pathname === link.link
                    ? "bg-gradient-to-b from-black via-[#1461C9] to-[#1461C9] mt-[-3px]"
                    : "text-[#85827d] bg-[#17307B]"
                )}
              >
                <div className="w-8 h-8">
                  {link.image && (
                    <img
                      src={link.image}
                      alt={link.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <p className="mt-1 zcool-font text-white">{link.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
