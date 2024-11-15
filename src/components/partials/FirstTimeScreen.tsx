import { Button } from "../ui/button";

type Props = {
  startGame: () => void;
};

export default function FirstTimeScreen({ startGame }: Props) {
  return (
    <div
      className="flex flex-col justify-end bg-cover flex-1"
      style={{
        background: 'linear-gradient(to bottom, #575EFF, rgba(14, 203, 255, 0.94))'
      }}
    >
      <div className="flex flex-col items-center">
        <p className="text-sm font-bold text-center">Welcome Bonus</p>
        <div className="flex items-center gap-3 mt-4">
          <img
            src="/images/coins.png"
            alt="coins"
            className="object-contain w-14 h-14"
          />
          <span className="text-3xl font-bold text-gradient">5,000</span>
        </div>
        <img src="/images/chest.png" alt="box" className="w-full" />
        <div className="w-full px-12">
          <Button className="w-full uppercase" onClick={() => startGame()}>
            Join Tappy Dino!
          </Button>
        </div>
      </div>
    </div>
  );
}
