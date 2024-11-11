import { useState } from "react";
import { useEffect } from "react";
import ListItem from "@/components/ListItem";
import CheckIcon from "@/components/icons/CheckIcon";
import Drawer from "@/components/ui/drawer";
import { useTonConnect } from "@/hooks/useTonConnect";
import useTonPay from "@/hooks/useTonPay";
import { CHAIN, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { CopyIcon, Loader2Icon, Wallet2Icon, XIcon } from "lucide-react";
import { toast } from "react-toastify";
import levelConfig from "@/config/level-config";
import { useUserStore } from "@/store/user-store";

export default function Wallet() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const [, copy] = useCopyToClipboard();
  const tonAddress = useTonAddress();
  const { connected: isConnected, network } = useTonConnect();
  const user = useUserStore();

  // Dynamically load the font within the component using <style> tag
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Zcool+Kualie&display=swap');
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const tonPay = useTonPay({
    onSuccess: () => toast.success("Your transaction has been completed"),
    onError: () => toast.error("Request rejected"),
  });

  return (
    <div className="flex flex-col justify-end bg-cover flex-1" style={{backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,}}>
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body" style={{ fontFamily: 'Zcool Kualie, sans-serif' }}>
        <img
          src="/images/toncoin.png"
          alt="toncoin"
          className="object-contain w-32 h-32 mx-auto"
        />
         <h1
         style={{
         fontFamily: "'ZCOOL KuaiLe', sans-serif",
         fontSize: '1.5rem',
         textAlign: 'center',
         marginTop: '1rem',
         color: '#ffffff',
         }}
         >
         WALLET
         </h1>
        <h1
         style={{
         fontFamily: "'ZCOOL KuaiLe', sans-serif",
         fontSize: '1.0rem',
         textAlign: 'center',
         marginTop: '1rem',
         color: '#ffffff',
         }}
         >
         Connect your TON wallet.
         </h1>

        <div className="mt-4 space-y-2">
          <ListItem
            title={"Pay"}
            image="/images/wallet.png"
            onClick={async () => {
              if (network !== CHAIN.MAINNET) {
                toast.error("Please switch to mainnet");
                return;
              }
              tonPay.send(0.001, "CryptoCoin Payment");
            }}
          />
          <ListItem
            title={"Connect your TON Wallet"}
            image="/images/wallet.png"
            onClick={() => setOpenDrawer(true)}
            action={isConnected && <CheckIcon className="text-green-500" />}
          />
        </div>
      </div>
      <Drawer open={tonPay.isLoading} hideClose>
        <div className="flex flex-col items-center justify-center">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
          <p className="mt-4">
            Waiting for transaction to complete processing...
          </p>
        </div>
      </Drawer>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <div className="mb-4">
          <img
            src={"/images/wallet.png"}
            alt={"wallet"}
            className="object-contain mx-auto w-28 h-28"
          />
        </div>
        <h2 className="mb-3 text-3xl font-bold text-center">
          {isConnected
            ? "Your TON wallet is connected"
            : "Connect your TON wallet"}
        </h2>
        <p className="mx-auto mb-6 text-sm text-center max-w-72">
          {isConnected
            ? "You can disconnect it or copy wallet address"
            : "Connect your crypto wallet. If you don't have one, create one in your Telegram account"}
        </p>
        {isConnected ? (
          <div className="flex gap-2">
            <button
              className="bg-[#ffffff1a] text-[#999a9c] rounded-xl text-sm px-4 h-11 flex items-center"
              onClick={() => tonConnectUI.disconnect()}
            >
              <XIcon className="w-6 h-6" />
            </button>
            <button
              className="flex-1 bg-[#ffffff1a] text-[#999a9c] rounded-xl text-sm px-4 h-11 flex items-center"
              onClick={() => {
                copy(tonAddress);
                toast.success("Copied to clipboard");
              }}
            >
              <Wallet2Icon className="w-6 h-6 mr-2" />
              <span className="font-semibold text-white">
                {tonAddress.slice(0, 8)}...
                {tonAddress.slice(-8, tonAddress.length)}
              </span>
              <div className="ml-auto">
                <CopyIcon className="w-5 h-5" />
              </div>
            </button>
          </div>
        ) : (
          <button
            className="flex items-center justify-center py-0 px-3 rounded-xl font-bold h-11 text-sm w-full bg-[linear-gradient(98deg,#35a6eb_3.58%,#309adb_101.32%)]"
            onClick={() => {
              tonConnectUI.openModal();
              setOpenDrawer(false);
            }}
          >
            <Wallet2Icon className="w-6 h-6 mr-2" />
            Connect your TON wallet
          </button>
        )}
      </Drawer>
    </div>
  );
}
