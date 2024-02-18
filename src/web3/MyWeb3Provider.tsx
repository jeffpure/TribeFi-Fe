import { Chain, sepolia } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';

import { connectorsForWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { injectedWallet, metaMaskWallet, okxWallet } from '@rainbow-me/rainbowkit/wallets';
import { useSelector } from 'react-redux';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { goerli } from 'wagmi/chains';
import Constants from '@/constants';

export const blast = {
  id: 168587773,
  network: 'Blast Sepolia',
  name: 'Blast',
  nativeCurrency: { name: 'Blast Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://sepolia.blast.io'],
    },
    public: {
      http: ['https://sepolia.blast.io'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io',
    },
  },
  testnet: true,
} as const satisfies Chain;

export function MyWeb3Provider({ children }: any) {
  const { theme } = useSelector(state => state.global);
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [blast],
    [
      jsonRpcProvider({
        rpc: chain => ({
           http: `https://sepolia.blast.io/`,
          // http: `https://ethereum-sepolia.publicnode.com`,
        }),
      }),
    ],
  );

  const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ projectId: Constants.Contracts.Slot, chains }),
        okxWallet({ chains, projectId: Constants.Contracts.Slot }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} showRecentTransactions={true} theme={lightTheme()} coolMode>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
