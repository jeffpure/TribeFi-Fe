import { providers } from 'ethers';
import * as React from 'react';
import { useWalletClient, type WalletClient } from 'wagmi';

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;

  console.log('chain info', chain);
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);

  return provider.getSigner(account.address);
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });

  return React.useMemo(() => (walletClient ? walletClientToSigner(walletClient) : undefined), [walletClient]);
}
