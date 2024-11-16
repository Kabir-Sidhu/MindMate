import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, polygonAmoy, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [polygonAmoy],
    connectors: [metaMask()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [polygonAmoy.id]: http(
        "https://polygon-amoy.g.alchemy.com/v2/jbHOUdOOuZjNPqUE4Eb_v21l-jN7AZCY"
      ),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
