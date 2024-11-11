import ListItem from "@/components/ListItem";
import CheckIcon from "@/components/icons/CheckIcon";
import Drawer from "@/components/ui/drawer";
import { useTonConnect } from "@/hooks/useTonConnect";
import useTonPay from "@/hooks/useTonPay";
import { CHAIN, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { CopyIcon, Loader2Icon, Wallet2Icon, XIcon } from "lucide-react";
import { useState } from "react";
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

  const tonPay = useTonPay({
    onSuccess: () => toast.success("Your transaction has been completed"),
    onError: () => toast.error("Request rejected"),
  });

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      flex: 1,
      backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,
      backgroundSize: "cover",
    },
    heading: {
      marginTop: "1rem",
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
    },
    subheading: {
      marginTop: "0.625rem",
      fontWeight: "500",
      textAlign: "center",
    },
    drawerButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      fontWeight: "bold",
      fontSize: "0.875rem",
      width: "100%",
      background: "linear-gradient(98deg,#35a6eb_3.58%,#309adb_101.32%)",
    },
    textButton: {
      color: "#999a9c",
      backgroundColor: "#ffffff1a",
      padding: "0.5rem 1rem",
      borderRadius: "0.75rem",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      width: "1.5rem",
      height: "1.5rem",
      marginRight: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div className="modal-body" style={{ padding: "1.5rem", flex: 1, marginTop: "3rem" }}>
        <img
          src="/images/toncoin.png"
          alt="toncoin"
          style={{ width: "8rem", height: "8rem", margin: "auto" }}
        />
        <h1 style={styles.heading}>TON Wallet</h1>
        <p style={styles.subheading}>Connect your TON wallet</p>

        <div style={{ marginTop: "1rem", gap: "0.5rem" }}>
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
            action={isConnected && <CheckIcon style={{ color: "green" }} />}
          />
        </div>
      </div>

      <Drawer open={tonPay.isLoading} hideClose>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Loader2Icon className="animate-spin" style={{ width: "3rem", height: "3rem", color: "#007bff" }} />
          <p style={{ marginTop: "1rem" }}>Waiting for transaction to complete processing...</p>
        </div>
      </Drawer>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <img src="/images/wallet.png" alt="wallet" style={{ width: "7rem", height: "7rem", margin: "auto" }} />
        </div>
        <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", textAlign: "center", marginBottom: "0.75rem" }}>
          {isConnected ? "Your TON wallet is connected" : "Connect your TON wallet"}
        </h2>
        <p style={{ margin: "0 auto", fontSize: "0.875rem", textAlign: "center", maxWidth: "18rem" }}>
          {isConnected
            ? "You can disconnect it or copy wallet address"
            : "Connect your crypto wallet. If you don't have one, create one in your Telegram account"}
        </p>
        {isConnected ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={styles.textButton} onClick={() => tonConnectUI.disconnect()}>
              <XIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>
            <button style={{ ...styles.textButton, flex: 1 }} onClick={() => {
              copy(tonAddress);
              toast.success("Copied to clipboard");
            }}>
              <Wallet2Icon style={styles.icon} />
              <span>{tonAddress.slice(0, 8)}...{tonAddress.slice(-8)}</span>
              <CopyIcon style={{ marginLeft: "auto", width: "1.25rem", height: "1.25rem" }} />
            </button>
          </div>
        ) : (
          <button style={styles.drawerButton} onClick={() => {
            tonConnectUI.openModal();
            setOpenDrawer(false);
          }}>
            <Wallet2Icon style={styles.icon} />
            Connect your TON wallet
          </button>
        )}
      </Drawer>
    </div>
  );
}

