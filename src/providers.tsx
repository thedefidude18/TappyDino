import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const WALLET_MANIFEST_URL =
  "https://yellow-patient-cheetah-559.mypinata.cloud/ipfs/Qman9QdYTU85oVqkyfY7ZoKNHJNjNStASeoL1fQWKkrLoR";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider
        manifestUrl={WALLET_MANIFEST_URL}
      >
        {children}
      </TonConnectUIProvider>

      <ToastContainer
        theme="dark"
        position="top-center"
        hideProgressBar
        stacked
      />
    </QueryClientProvider>
  );
}
