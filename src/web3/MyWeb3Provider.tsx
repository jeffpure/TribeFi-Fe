import type { Chain } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';

import { connectorsForWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { injectedWallet, metaMaskWallet, okxWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

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
    default: {
      name: 'Blastscan',
      url: 'https://testnet.blastscan.io',
    },
  },
  testnet: true,
} as const satisfies Chain;

export function MyWeb3Provider({ children }: any) {
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
        metaMaskWallet({ projectId: Constants.Contracts.PoolFactory, chains }),
        okxWallet({ chains, projectId: Constants.Contracts.PoolFactory }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  const queryClient = new QueryClient();

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions={true} theme={lightTheme()} coolMode>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
