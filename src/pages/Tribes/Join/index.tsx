import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Flex, Image, message, Select, Typography } from 'antd';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import PoolFactoryAbi from '@/abi/pool_factory_abi.json';
import SlotAbi from '@/abi/slot_abi.json';
import BlocMates from '@/assets/nft/BlocMates.jpg';
import CM from '@/assets/nft/CM.jpg';
import DefiCheetah from '@/assets/nft/DeFi Cheetah.jpg';
import DefiDad from '@/assets/nft/DeFi Dad ⟠ defidad.eth.jpg';
import DefiIgnas from '@/assets/nft/Defi Ignas.jpg';
import Constants from '@/constants';
import util from '@/libs/util';
import { useEthersSigner } from '@/web3/ethers';

import indexStyle from './index.module.css';

const { Text } = Typography;

const JoinATribe = () => {
  const { openConnectModal } = useConnectModal();
  const { address: userAddress, isConnected } = useAccount();
  const signer = useEthersSigner();

  const SlotContract = new ethers.Contract(Constants.Contracts.PoolFactory, SlotAbi, signer);

  // 进度: 0 1
  const [process, setProcess] = useState(0);
  // 表单验证后的 激活按钮
  const [verify, setVerify] = useState(true);

  const [btnLoading, setBtnLoading] = useState(false);
  // Select a tribe 下拉
  const [curTribe, setCurTribe] = useState({ value: 'BlocMates', label: 'BlocMates', icon: BlocMates });
  const [bindTribe, setBindTribe] = useState([
    { value: 'BlocMates', label: 'BlocMates', icon: BlocMates },
    { value: 'CM', label: 'CM', icon: CM },
    { value: 'DeFi Cheetah', label: 'DeFi Cheetah', icon: DefiCheetah },
    { value: 'DeFi Dad ⟠ defidad.eth', label: 'DeFi Dad ⟠ defidad.eth', icon: DefiDad },
    { value: 'Defi Ignas', label: 'Defi Ignas', icon: DefiIgnas },
  ]);

  const confirmJoin = async () => {
    try {
      if (isConnected) {
        setBtnLoading(true);
        const txn = await SlotContract.buySlots(userAddress, BigInt(1));

        await txn.wait();
        console.log('tx set', txn.hash);
        message.success('Successful operation!');
        setBtnLoading(false);
      } else {
        openConnectModal?.();
      }
    } catch (e: any) {
      console.log('claim error', e);
      message.error(e.toString());
      setBtnLoading(false);
    }
  };

  const handleTribeChange = (value: string, option: any) => {
    // value: 项中 value
    setCurTribe(option);
    //test();
  };

  return (
    <div className="wp pageCreateTeibeBgDecorate">
      <Flex style={{ width: '100%' }} vertical justify={'center'} align={'center'}>
        <Flex className={`${'mb2p5'} ${indexStyle.topBox}`} vertical justify={'flex-start'} align={'flex-start'}>
          <Flex
            style={{ width: '100%', position: 'relative', marginBottom: '0.38rem' }}
            vertical
            justify={'center'}
            align={'center'}
          >
            <svg
              style={{ width: '100%' }}
              xmlns="http://www.w3.org/2000/svg"
              width="702"
              height="45"
              viewBox="0 0 702 45"
              fill="none"
            >
              <path
                d="M701 4.9915L695.662 1.28363L9.11023 1.28332L1 7.9781L1 36.4854L7.26227 44.0041L683.342 44.0044L691.555 37.2067L691.555 31.2556L701 25.2818L701 4.9915Z"
                fill="white"
                stroke="#8A8A8A"
                stroke-width="1.02996"
              />
            </svg>
            <Text
              className="font1p25 colorBlack"
              style={{ position: 'absolute', textTransform: 'uppercase', fontWeight: '400' }}
            >
              EPIC 1 ASSET RESERVES
            </Text>
          </Flex>
          <Flex
            className={`${'w-full'} ${indexStyle.paginBox}`}
            vertical={false}
            justify={'space-between'}
            align={'center'}
          >
            <Flex
              className={`${indexStyle.paginItem} ${
                process == 0 ? indexStyle.paginItemActive : indexStyle.paginItemDisable
              }`}
              vertical={false}
              justify={'center'}
              align={'center'}
            >
              <Flex
                className={`${indexStyle.paginItemTag} ${
                  process >= 0 ? indexStyle.paginItemTagActive : indexStyle.paginItemTagDisable
                }`}
                justify={'center'}
                align={'center'}
              >
                1
              </Flex>
              <Text className={`${'font1'} ${'colorBlack'}`}>Join a tribe</Text>
            </Flex>
            <Flex
              className={`${indexStyle.paginItem} ${
                process == 1 ? indexStyle.paginItemActive : indexStyle.paginItemDisable
              }`}
              vertical={false}
              justify={'center'}
              align={'center'}
            >
              <Flex
                className={`${indexStyle.paginItemTag} ${
                  process >= 1 ? indexStyle.paginItemTagActive : indexStyle.paginItemTagDisable
                }`}
                justify={'center'}
                align={'center'}
              >
                2
              </Flex>
              <Text className={`${'font1'} ${'colorBlack'}`}>Start to Flight</Text>
            </Flex>
          </Flex>

          <Flex className={`${indexStyle.windowBody}`} vertical justify={'space-between'} align={'center'}>
            <Flex
              className={`${indexStyle.formItem}`}
              style={{ height: '7.5rem', borderBottom: '1px solid #333' }}
              vertical={false}
              justify={'space-between'}
              align={'center'}
            >
              <Text className="font1p25 colorBlack" style={{ fontWeight: '700' }}>
                1. Connect your wallet
              </Text>
              {isConnected ? (
                <Button className={`${'confirmBtn font1'} ${indexStyle.walletBtn}`}>{util.address(userAddress)}</Button>
              ) : (
                <Button
                  className={`${'confirmBtn font1'} ${indexStyle.walletBtn}`}
                  onClick={() => openConnectModal?.()}
                >
                  Connect Wallet
                </Button>
              )}
            </Flex>
            <Flex
              className={`${indexStyle.formItem}`}
              style={{ height: '7.5rem', borderBottom: '1px solid #333' }}
              vertical={false}
              justify={'space-between'}
              align={'center'}
            >
              <Text className="font1p25 colorBlack" style={{ fontWeight: '700' }}>
                2. Select a tribe
              </Text>
              <Flex
                style={{ position: 'relative', padding: '0.75rem', border: '1px solid var(--line-border, #8A8A8A)' }}
                vertical={false}
                justify={'center'}
                align={'center'}
              >
                <div
                  className="mr0p5"
                  style={{
                    position: 'absolute',
                    left: '0.5rem',
                  }}
                >
                  <Image width={'1.5rem'} src={curTribe.icon} preview={false} />
                </div>
                <Select
                  className={`${'font1 colorMain createTeibeSelect'} ${indexStyle.SelectBox}`}
                  defaultValue={bindTribe[0].label}
                  onChange={handleTribeChange}
                  options={bindTribe}
                  optionRender={(option, info) => (
                    <Flex vertical={false} justify={'flex-start'} align={'center'}>
                      <div className="mr0p5">
                        <Image width={'1.5rem'} src={option.data.icon} preview={false} />
                      </div>
                      <Text className="font1 colorBlack" style={{ fontFamily: 'Orbitron' }}>
                        {option.value}
                      </Text>
                    </Flex>
                  )}
                  suffixIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M15 8L10 13L5 8"
                        stroke="#8A8A8A"
                        stroke-width="1.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                />
              </Flex>
            </Flex>

            <div style={{ width: '100%', padding: '0.5rem' }}>
              <Button
                onClick={confirmJoin}
                loading={btnLoading}
                className={`${verify ? 'confirmBtn' : 'confirmDisableBtn'}`}
              >
                Confirm
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default JoinATribe;
