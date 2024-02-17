import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Flex } from 'antd';
import { useAccount } from 'wagmi';

import util from '@/libs/util';

export const MyWalletButton = () => {
  // const isMounted = useIsMounted()
  const { address, connector, isConnected } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  // const { openChainModal } = useChainModal();

  const openInExplore = () => {
    window.open(connector?.chains[0]?.blockExplorers?.default?.url + '/address/' + address);
  };

  return (
    <>
      <Flex vertical={true} justify={'flex-start'} align={'center'}>
        {isConnected ? (
          <span style={{ cursor: 'pointer' }} onClick={() => openAccountModal?.()}>
            {util.address(address)}
          </span>
        ) : (
          <Button className="neonBtn" onClick={() => openConnectModal?.()}>
            <span>Connect Wallet</span>
          </Button>
        )}
      </Flex>
    </>
  );
};
