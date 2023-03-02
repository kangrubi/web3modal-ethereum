import React from "react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Moda", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal
        projectId="<YOUR_PROJECT_ID>"
        theme="dark"
        accentColor="default"
        ethereumClient={ethereumClient}
      />
    </>
  );
};

export default App;
