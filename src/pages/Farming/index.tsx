import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Flex, Image, Input, message, Modal, Tooltip, Typography } from 'antd';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccount, useBalance, useContractRead } from 'wagmi';

import PoolAbi from '@/abi/pool_abi.json';
import SlotAbi from '@/abi/slot_abi.json';
import arrowExplorer from '@/assets/img/arrowExplorer2.svg';
import farmingAvatarA from '@/assets/img/farmingAvatarA.png';
import farmingAvatarB from '@/assets/img/farmingAvatarB.png';
import Constants from '@/constants';
import { useEthersSigner } from '@/web3/ethers';

import indexStyle from './index.module.css';

const { Text } = Typography;

const Farming = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openConnectModal } = useConnectModal();
  const { address: userAddress, isConnected } = useAccount();
  const signer = useEthersSigner();

  const SlotContract = new ethers.Contract(Constants.Contracts.Slot, SlotAbi, signer);

  const { data: ethBalanceData, isSuccess: ethBalanceSuccess } = useBalance({
    address: userAddress,
    watch: true,
    enabled: !!userAddress,
  });

  const { data: poolOwner, isLoading: poolOwnerLoading } = useContractRead({
    abi: PoolAbi,
    address: searchParams.get('address') as `0x${string}`,
    functionName: 'poolOwner',
    enabled: !!searchParams.get('address'),
  });

  console.log('poolOwner', poolOwner);

  const { data: slotsSupply, isLoading: slotsSupplyLoading } = useContractRead({
    abi: SlotAbi,
    address: Constants.Contracts.Slot as `0x${string}`,
    functionName: 'slotsSupply',
    args: [poolOwner],
    enabled: !!poolOwner,
  });

  console.log('slotsSupply', slotsSupply);

  const { data: isHaveSlot, isLoading: isHaveSlotLoading } = useContractRead({
    abi: SlotAbi,
    address: Constants.Contracts.Slot as `0x${string}`,
    functionName: 'isUserHasSlot',
    args: [poolOwner, userAddress],
    enabled: !!poolOwner && !!userAddress,
  });

  console.log('isHaveSlot', isHaveSlot);

  // 弹窗 Buy
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);

  // 分页按钮
  const [pagin, setPagin] = useState(0);
  // 页面总览数据
  const [dataList, setDataList] = useState([
    { title: 'TVL', val: '$103.48 M' },
    { title: 'Tribe TVL', val: '$103.48 M' },
    { title: 'Members', val: '273' },
  ]);

  const [poolList, setPoolList] = useState([
    {
      name: 'ETH Pool',
      TVL: '$2,374,462',
      AverageAPY: '242%',
      MyAPY: '375%',
      MyStaked: '$12233.2',
    },
  ]);

  // 侧栏数据
  const [sidebar, setSidebar] = useState({
    viewOnAvatar: farmingAvatarA,
    viewOnUrl: '',
    name: 'DeFi Ignas',
    avatar: farmingAvatarB,
    overview1: [
      { title: 'Slot Price', val: '$2736' },
      { title: 'I hold 2 slots', val: '+27.12%' },
    ],
    overview2: [
      { title: 'Members:', val: '2,372' },
      { title: 'Slots:', val: '272' },
    ],
  });

  // 弹窗 stake
  const [stakeData, setStakeData] = useState({
    title: '',
    Amount: 0,
    type: 'ETH',
    Balance: '12.523 ETH',
    MyAPY: '375%',
    MyStaked: '10 ETH',
  });

  const [stakeLoading, setStakeLoading] = useState(false);
  const [stakeOpen, setStakeOpen] = useState(false);

  const stakeShowModal = (item: {
    name: any;
    TVL?: string;
    AverageAPY?: string;
    MyAPY?: string;
    MyStaked?: string;
  }) => {
    /*
    item:
        AverageAPY
        MyAPY
        MyStaked
        TVL
        name
    */
    stakeData.title = item.name;
    // setStakeData 这里更新弹窗数据

    setStakeData(stakeData);
    setStakeOpen(true);
  };

  const handleStakeOk = async () => {
    try {
      if (isConnected) {
        setStakeLoading(true);
        const txn = await SlotContract.stake(BigInt(stakeData.Amount), { gasLimit: 1000000 });

        await txn.wait();
        console.log('tx set', txn.hash);
        message.success('Successful operation!');
        setStakeLoading(false);
        setStakeOpen(false);
      } else {
        openConnectModal?.();
      }
    } catch (e: any) {
      console.log('claim error', e);
      message.error(e.toString());
      setStakeLoading(false);
    }
  };

  const handleStakeCancel = () => {
    setStakeOpen(false);
  };

  //const [stakeAmount, setStakeAmountInput] = useState('');

  const handleStakeAmountChange = (e: any) => {
    stakeData.Amount = e.target.value;
    setStakeData(stakeData);
    //setStakeAmountInput(e.target.value);
    //e.target.value
  };

  const buyShowModal = () => {
    setBuyOpen(true);
  };

  const handleBuyOk = async () => {
    try {
      if (isConnected) {
        setBuyLoading(true);
        // @ts-ignore
        const PoolContract = new ethers.Contract(searchParams.get('address'), PoolAbi, signer);

        const data = await PoolContract.poolOwner();
        const txn = await SlotContract.buySlots(data, BigInt(buyAmount), { gasLimit: 1000000 });

        await txn.wait();
        console.log('tx set', txn.hash);
        message.success('Successful operation!');
        setBuyOpen(false);
        setBuyLoading(false);
      } else {
        openConnectModal?.();
      }
    } catch (e: any) {
      console.log('claim error', e);
      message.error(e.toString());
      setBuyLoading(false);
    }
  };

  const handleBuyCancel = () => {
    setBuyOpen(false);
  };

  const [buyAmount, setBuyAmountInput] = useState('');

  const handleBuyChange = (e: any) => {
    setBuyAmountInput(e.target.value);
    //e.target.value
  };

  // 弹窗 Unstake

  const [unstakeData, setUnStakeData] = useState({
    title: '',
    Amount: 0,
    type: 'ETH',
    StakedBalance: '12.523 ETH',
    MyAPY: '375%',
    YouWillReceive: '5 ETH',
  });

  const [unstakeLoading, setUnStakeLoading] = useState(false);
  const [unstakeOpen, setUnStakeOpen] = useState(false);

  const unstakeShowModal = (item: {
    name: any;
    TVL?: string;
    AverageAPY?: string;
    MyAPY?: string;
    MyStaked?: string;
  }) => {
    /*
    item:
        AverageAPY
        MyAPY
        MyStaked
        TVL
        name
    */
    unstakeData.title = item.name;
    // setUnStakeData 这里更新弹窗数据

    setUnStakeData(unstakeData);
    setUnStakeOpen(true);
  };

  const handleUnStakeOk = async () => {
    try {
      if (isConnected) {
        setUnStakeLoading(true);
        const txn = await SlotContract.unstake(BigInt(unstakeData.Amount), { gasLimit: 1000000 });

        await txn.wait();
        console.log('tx set', txn.hash);
        message.success('Successful operation!');
        setUnStakeLoading(false);
        setUnStakeOpen(false);
      } else {
        openConnectModal?.();
      }
    } catch (e: any) {
      console.log('claim error', e);
      message.error(e.reason);
      setUnStakeLoading(false);
    }
  };

  const handleUnStakeCancel = () => {
    setUnStakeOpen(false);
  };

  const backPage = () => {
    navigate(-1);
  };

  //const [stakeAmount, setStakeAmountInput] = useState('');

  const handleUnStakeAmountChange = (e: any) => {
    unstakeData.Amount = e.target.value;
    setUnStakeData(unstakeData);
    //setStakeAmountInput(e.target.value);
    //e.target.value
  };

  useEffect(() => {
    if (signer) {
    }
  }, [signer]);

  return (
      <>
        <Flex
            style={{
              display: 'grid',
              gridTemplateColumns: 'calc(100% - 19.7rem - 2.5rem) auto',
              gap: '0',
            }}
            vertical={false}
            justify={'space-between'}
            align={'flex-start'}
        >
          <Flex style={{ position: 'relative', width: '100%' }} vertical justify={'flex-start'} align={'flex-start'}>
            <Flex
                style={{ padding: '0 2.5rem', flexWrap: 'wrap' }}
                vertical={false}
                justify={'flex-start'}
                align={'center'}
            >
              <Flex
                  className="mt1 mb1"
                  onClick={() => backPage()}
                  vertical={false}
                  justify={'flex-start'}
                  align={'center'}
              >
                <svg
                    className="mr0p5"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M19.2002 24L11.2002 16L19.2002 8"
                      stroke="#171717"
                      stroke-width="2.672"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                </svg>
                <Text className="font1p25 colorBlack1E mr1" style={{ textTransform: 'uppercase', cursor: 'pointer' }}>
                  Back
                </Text>
                <Text className="font1p5 colorBlack33 mr2p5">DeFi Ignas</Text>
              </Flex>
              <Flex vertical={false} justify={'flex-start'} align={'flex-start'}>
                <Button className={`${'font1p25'} ${pagin == 0 ? 'FarmingPaginBtn' : 'FarmingPaginDisableBtn'}`}>
                  Farming
                </Button>
                <Tooltip
                    title={isHaveSlot ? 'Click to enter the room to chat' : 'You don’t have a slot, please buy it first!'}
                    color={isHaveSlot ? 'blue' : ''}
                >
                  <Button
                      onClick={() => {
                        isHaveSlot ? navigate('/Room?address=' + searchParams.get('address')) : buyShowModal();
                      }}
                      className={`${'font1p25'} ${pagin == 1 ? 'FarmingPaginBtn' : 'FarmingPaginDisableBtn'}`}
                  >
                    ROOM
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
            <Flex
                className="vmt1 mb1"
                style={{ padding: '0 2.5rem', flexWrap: 'wrap' }}
                vertical={false}
                justify={'flex-start'}
                align={'flex-start'}
            >
              {dataList.map((item, idx) => (
                  <Flex className={'mt0p5 mb0p5'} vertical={false} justify={'flex-start'} align={'center'}>
                    <Text className="font font0p87 colorBlack mr0p75">{item.title}</Text>
                    <Text className="font font1p5 colorBlack mr2p5">{item.val}</Text>
                  </Flex>
              ))}
            </Flex>

            <Flex
                className="pageBgDecorate"
                style={{ minHeight: '36.9rem' }}
                vertical
                justify={'flex-start'}
                align={'flex-start'}
            >
              <Flex
                  className={`${indexStyle.cardBox}`}
                  style={{ padding: '0 2.5rem' }}
                  vertical={false}
                  justify={'flex-start'}
                  align={'flex-start'}
              >
                {poolList.map(item => (
                    <Flex className={`${indexStyle.cardItem}`} vertical justify={'flex-start'} align={'flex-start'}>
                      <Text
                          className="font1p25 colorBlack"
                          style={{
                            letterSpacing: '-0.025rem',
                            borderBottom: '1px solid #8A8A8A',
                            padding: '0.75rem 1rem',
                            width: '100%',
                            fontWeight: '700',
                          }}
                      >
                        {item.name}
                      </Text>
                      {[
                        { title: 'TVL', val: item.TVL },
                        { title: 'Average APY', val: item.AverageAPY },
                        { title: 'My APY', val: item.MyAPY },
                        { title: 'My Staked', val: item.MyStaked },
                      ].map(item1 => (
                          <Flex
                              style={{ width: '100%', padding: '0.5rem 1rem' }}
                              vertical={false}
                              justify={'space-between'}
                              align={'flex-start'}
                          >
                            <Text className="font font0p87 colorBlack" style={{ fontWeight: '400' }}>
                              {item1.title}
                            </Text>
                            <Text className="font font0p87 colorBlack">{item1.val}</Text>
                          </Flex>
                      ))}
                      <Flex
                          style={{ width: '100%', padding: '0.5rem' }}
                          vertical={false}
                          justify={'space-between'}
                          align={'flex-start'}
                      >
                        <Button
                            onClick={() => unstakeShowModal(item)}
                            className="confirmDisableBtn font1"
                            style={{ width: '50%', lineHeight: '1.78356rem' }}
                        >
                          Unstake
                        </Button>
                        <Button
                            onClick={() => stakeShowModal(item)}
                            className="confirmBtn font1"
                            style={{ width: '50%', lineHeight: '1.78356rem' }}
                        >
                          Stake
                        </Button>
                      </Flex>
                    </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex className={`${indexStyle.sidebarBox}`} vertical justify={'flex-start'} align={'flex-start'}>
            <Flex
                style={{ width: '100%', padding: '0.5rem 1rem', borderBottom: '1px solid #EFEFEF' }}
                vertical={false}
                justify={'flex-end'}
                align={'center'}
            >
              <Text
                  className="font0p75 colorBlack mr0p32"
                  style={{ textDecorationLine: 'underline', fontStyle: 'italic', fontWeight: '700' }}
              >
                view
              </Text>
              <div className="mr0p32">
                {sidebar.viewOnAvatar ? (
                    <Image height={'1.27431rem'} width={'1.27431rem'} src={sidebar.viewOnAvatar} preview={false} />
                ) : (
                    <div className={`${indexStyle.noneAvatar}`}></div>
                )}
              </div>
              <Image height={'0.85rem'} width={'0.85rem'} src={arrowExplorer} preview={false} />
            </Flex>
            <Text
                className="font1p25 colorBlack"
                style={{
                  textDecorationLine: 'underline',
                  fontWeight: '700',
                  textAlign: 'center',
                  width: '100%',
                  padding: '0.75rem 0',
                }}
            >
              {sidebar.name}
            </Text>
            <Flex className="mr0p32" style={{ width: '100%', padding: '0.75rem 0' }} justify={'center'} align={'center'}>
              {sidebar.avatar ? (
                  <Image height={'8.6875rem'} width={'8.6875rem'} src={sidebar.avatar} preview={false} />
              ) : (
                  <div className={`${indexStyle.noneAvatar}`}></div>
              )}
            </Flex>
            <Flex
                style={{ width: '100%', padding: '0.75rem 1rem' }}
                vertical={false}
                justify={'space-between'}
                align={'flex-start'}
            >
              <Flex style={{ width: '50%' }} vertical justify={'flex-start'} align={'flex-start'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview1[0].title}
                </Text>
                <Text className="font font2 colorBlack" style={{ fontFamily: 'Space Grotesk' }}>
                  {sidebar.overview1[0].val}
                </Text>
              </Flex>
              <Flex style={{ width: '50%' }} vertical justify={'flex-start'} align={'flex-start'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview1[1].title}
                </Text>
                <Text
                    className={`${'font font2'} ${
                        sidebar.overview1[1].val.includes('+')
                            ? 'colorG'
                            : sidebar.overview1[1].val.includes('-')
                                ? 'colorR'
                                : 'colorBlack'
                    }`}
                    style={{ fontFamily: 'Space Grotesk' }}
                >
                  {sidebar.overview1[1].val}
                </Text>
              </Flex>
            </Flex>
            <Flex
                style={{ width: '100%', borderBottom: '1px solid #EFEFEF', padding: '0.75rem 0' }}
                vertical={false}
                justify={'space-between'}
                align={'flex-start'}
            >
              <Flex style={{ width: '50%', padding: '0 1rem' }} vertical={false} justify={'flex-start'} align={'center'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[0].title}
                </Text>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[0].val}
                </Text>
              </Flex>
              <Flex style={{ width: '50%', padding: '0 1rem' }} vertical={false} justify={'flex-start'} align={'center'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[1].title}
                </Text>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[1].val}
                </Text>
              </Flex>
            </Flex>
            <Flex style={{ width: '100%', padding: '0.5rem' }} vertical justify={'flex-start'} align={'center'}>
              {isHaveSlot && (
                  <Button
                      onClick={() => navigate('/Room')}
                      className="confirmBtn font1p1"
                      style={{ width: '100%', marginBottom: '0.5rem', textTransform: 'uppercase' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="0 0 28 21" fill="none">
                      <path
                          d="M3.60648 10.7075L4.07176 10.1957L3.60648 9.68384L0.76087 6.55367V1.52174H27.2391V19.4783H0.76087V13.8376L3.60648 10.7075Z"
                          stroke="white"
                          stroke-width="1.52174"
                      />
                      <path
                          d="M18.7185 7.23747L18.261 6.28192L17.8035 7.23747L17.0437 8.82446L15.2995 9.0567L14.2494 9.19654L15.0168 9.92694L16.2913 11.14L15.9732 12.8705L15.7817 13.9125L16.7135 13.4084L18.261 12.5711L19.8085 13.4084L20.7403 13.9125L20.5488 12.8705L20.2307 11.14L21.5052 9.92694L22.2726 9.19654L21.2225 9.0567L19.4784 8.82446L18.7185 7.23747Z"
                          stroke="white"
                          stroke-width="1.01449"
                      />
                      <path d="M8.52197 1.36957V6.23913" stroke="white" stroke-width="1.52174" />
                      <path d="M8.52197 15.3696V20.2391" stroke="white" stroke-width="1.52174" />
                      <path d="M8.52197 8.06522V12.9348" stroke="white" stroke-width="1.52174" />
                    </svg>
                    Enter the room
                  </Button>
              )}
              {!isHaveSlot && (
                  <Button
                      className="colorCBtn font1p1 colorBlack"
                      loading={buyLoading}
                      onClick={buyShowModal}
                      style={{ width: '100%', marginLeft: 0 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                      <path
                          d="M14.8999 9.20833L17.9999 6.10831L14.8999 3.00833"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                      <path
                          d="M3 6.10831H18"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                      <path
                          d="M6.09998 11.7916L3 14.8917L6.09998 17.9917"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                      <path
                          d="M18 14.8917H3"
                          stroke="black"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                    </svg>
                    Buy
                  </Button>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Modal
            open={buyOpen}
            title={sidebar.name}
            maskClosable={!buyLoading}
            onOk={handleBuyOk}
            onCancel={handleBuyCancel}
            closeIcon={false}
            footer={false}
        >
          <Flex
              className={`${indexStyle.sidebarBox}`}
              style={{ width: '100%', height: 'auto', minHeight: 'auto', margin: 0 }}
              vertical
              justify={'flex-start'}
              align={'flex-start'}
          >
            <Flex className="mr0p32" style={{ width: '100%', padding: '0.75rem 0' }} justify={'center'} align={'center'}>
              {sidebar.avatar ? (
                  <Image height={'8.6875rem'} width={'8.6875rem'} src={sidebar.avatar} preview={false} />
              ) : (
                  <div className={`${indexStyle.noneAvatar}`}></div>
              )}
            </Flex>
            <Flex
                style={{ width: '100%', padding: '0.75rem 1rem' }}
                vertical={false}
                justify={'space-between'}
                align={'flex-start'}
            >
              <Flex style={{ width: '50%' }} vertical justify={'flex-start'} align={'flex-start'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview1[0].title}
                </Text>
                <Text className="font font2 colorBlack" style={{ fontFamily: 'Space Grotesk' }}>
                  {sidebar.overview1[0].val}
                </Text>
              </Flex>
              <Flex style={{ width: '50%' }} vertical justify={'flex-start'} align={'flex-start'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview1[1].title}
                </Text>
                <Text
                    className={`${'font font2'} ${
                        sidebar.overview1[1].val.includes('+')
                            ? 'colorG'
                            : sidebar.overview1[1].val.includes('-')
                                ? 'colorR'
                                : 'colorBlack'
                    }`}
                    style={{ fontFamily: 'Space Grotesk' }}
                >
                  {sidebar.overview1[1].val}
                </Text>
              </Flex>
            </Flex>
            <Flex
                style={{ width: '100%', padding: '0.75rem 0' }}
                vertical={false}
                justify={'space-between'}
                align={'flex-start'}
            >
              <Flex style={{ width: '50%', padding: '0 1rem' }} vertical={false} justify={'flex-start'} align={'center'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[0].title}
                </Text>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[0].val}
                </Text>
              </Flex>
              <Flex style={{ width: '50%', padding: '0 1rem' }} vertical={false} justify={'flex-start'} align={'center'}>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[1].title}
                </Text>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono' }}>
                  {sidebar.overview2[1].val}
                </Text>
              </Flex>
            </Flex>
            <Flex
                style={{ width: '100%', padding: '0.5rem 1rem', borderBottom: '1px solid #EFEFEF' }}
                vertical
                justify={'flex-start'}
                align={'flex-start'}
            >
              <Text className="font font0p87 colorBlack mb0p5" style={{ fontFamily: 'Space Mono' }}>
                Amount
              </Text>
              <Flex
                  style={{ width: '100%', padding: '0.3rem 0.75rem', border: '1px solid #8A8A8A' }}
                  vertical={false}
                  justify={'space-bwteen'}
                  align={'center'}
              >
                <Input id="chatInput" className="noneInput" placeholder="" onInput={handleBuyChange} />
                <Text
                    className="font font0p87 colorBlack ml0p5"
                    style={{ fontFamily: 'Space Mono', whiteSpace: 'nowrap' }}
                >
                  Slots
                </Text>
              </Flex>
            </Flex>
            <Flex style={{ width: '100%', padding: '0.5rem' }} vertical justify={'flex-start'} align={'center'}>
              <Flex
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'calc(50% - 0.5rem / 2) calc(50% - 0.5rem / 2)',
                    gap: '0.5rem',
                  }}
                  vertical={false}
                  justify={'space-between'}
                  align={'center'}
              >
                <Button
                    disabled={buyLoading}
                    onClick={handleBuyCancel}
                    className="confirmSubBtn font1p1"
                    style={{ width: '100%', marginLeft: 0 }}
                >
                  DISCARD
                </Button>
                <Button
                    className="confirmBtn font1p1 colorW"
                    loading={buyLoading}
                    onClick={handleBuyOk}
                    style={{ width: '100%', marginLeft: 0 }}
                >
                  Buy
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Modal>

        <Modal
            maskClosable={!stakeLoading}
            open={stakeOpen}
            title={<Text className="font1">{stakeData.title}</Text>}
            onOk={handleStakeOk}
            onCancel={handleStakeCancel}
            closeIcon={false}
            footer={false}
        >
          <Flex
              className={`${indexStyle.sidebarBox}`}
              style={{ width: '100%', height: 'auto', minHeight: 'auto', margin: 0 }}
              vertical
              justify={'flex-start'}
              align={'flex-start'}
          >
            <Flex style={{ width: '100%', padding: '0 1rem' }} vertical justify={'flex-start'} align={'flex-start'}>
              <Text className="font font0p87 colorBlack mb0p5" style={{ fontFamily: 'Space Mono' }}>
                Stake amount
              </Text>
              <Flex
                  style={{ width: '100%', padding: '0.3rem 0.75rem', border: '1px solid #8A8A8A' }}
                  vertical={false}
                  justify={'space-bwteen'}
                  align={'center'}
              >
                <Input id="chatInput" className="noneInput" placeholder="" onInput={handleStakeAmountChange} />
                <Text
                    className="font font0p87 colorBlack ml0p5"
                    style={{ fontFamily: 'Space Mono', whiteSpace: 'nowrap' }}
                >
                  {stakeData.type}
                </Text>
              </Flex>
              <Flex style={{ width: '100%' }} vertical={false} justify={'space-between'} align={'center'}>
                <Text className="font font0p75 colorGrey82" style={{ fontFamily: 'Space Mono', lineHeight: '1.25rem' }}>
                  Balance
                </Text>
                <Text className="font font0p75 colorGrey82" style={{ fontFamily: 'Space Mono', lineHeight: '1.25rem' }}>
                  {ethBalanceData?.formatted}
                </Text>
              </Flex>
            </Flex>
            <Flex style={{ width: '100%', padding: '0 1rem' }} vertical justify={'space-between'} align={'flex-start'}>
              <Flex
                  style={{ width: '100%', padding: '0.5rem 0rem' }}
                  vertical={false}
                  justify={'space-between'}
                  align={'center'}
              >
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono', fontWeight: '400' }}>
                  My APY
                </Text>
                <Text
                    className={`${'font font0p87'} ${
                        stakeData.MyAPY.includes('-') ? 'colorR' : stakeData.MyAPY == '0%' ? 'colorBlack' : 'colorG'
                    }`}
                    style={{ fontFamily: 'Space Grotesk' }}
                >
                  {stakeData.MyAPY}
                </Text>
              </Flex>
              <Flex
                  style={{ width: '100%', padding: '0.5rem 0rem' }}
                  vertical={false}
                  justify={'space-between'}
                  align={'center'}
              >
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono', fontWeight: '400' }}>
                  My Staked
                </Text>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Grotesk' }}>
                  {stakeData.MyStaked}
                </Text>
              </Flex>
            </Flex>

            <Flex
                style={{ width: '100%', padding: '0.5rem', borderTop: '1px solid #EFEFEF' }}
                vertical
                justify={'flex-start'}
                align={'center'}
            >
              <Flex
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'calc(50% - 0.5rem / 2) calc(50% - 0.5rem / 2)',
                    gap: '0.5rem',
                  }}
                  vertical={false}
                  justify={'space-between'}
                  align={'center'}
              >
                <Button
                    disabled={stakeLoading}
                    onClick={handleStakeCancel}
                    className="confirmSubBtn font1p1"
                    style={{ width: '100%', marginLeft: 0 }}
                >
                  DISCARD
                </Button>
                <Button
                    onClick={handleStakeOk}
                    loading={stakeLoading}
                    className={'confirmBtn font1p1 colorW'}
                    style={{ width: '100%', marginLeft: 0 }}
                >
                  STAKE
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Modal>

        <Modal
            maskClosable={!unstakeLoading}
            open={unstakeOpen}
            title={<Text className="font1">{unstakeData.title}</Text>}
            onOk={handleUnStakeOk}
            onCancel={handleUnStakeCancel}
            closeIcon={false}
            footer={false}
        >
          <Flex
              className={`${indexStyle.sidebarBox}`}
              style={{ width: '100%', height: 'auto', minHeight: 'auto', margin: 0 }}
              vertical
              justify={'flex-start'}
              align={'flex-start'}
          >
            <Flex style={{ width: '100%', padding: '0 1rem' }} vertical justify={'flex-start'} align={'flex-start'}>
              <Text className="font font0p87 colorBlack mb0p5" style={{ fontFamily: 'Space Mono' }}>
                Unstake amount
              </Text>
              <Flex
                  style={{ width: '100%', padding: '0.3rem 0.75rem', border: '1px solid #8A8A8A' }}
                  vertical={false}
                  justify={'space-bwteen'}
                  align={'center'}
              >
                <Input id="chatInput" className="noneInput" placeholder="" onInput={handleUnStakeAmountChange} />
                <Text
                    className="font font0p87 colorBlack ml0p5"
                    style={{ fontFamily: 'Space Mono', whiteSpace: 'nowrap' }}
                >
                  {unstakeData.type}
                </Text>
              </Flex>
              <Flex style={{ width: '100%' }} vertical={false} justify={'space-between'} align={'center'}>
                <Text className="font font0p75 colorGrey82" style={{ fontFamily: 'Space Mono', lineHeight: '1.25rem' }}>
                  Staked Balance
                </Text>
                <Text className="font font0p75 colorGrey82" style={{ fontFamily: 'Space Mono', lineHeight: '1.25rem' }}>
                  {ethBalanceData?.formatted}
                </Text>
              </Flex>
            </Flex>
            <Flex style={{ width: '100%', padding: '0 1rem' }} vertical justify={'space-between'} align={'flex-start'}>
              <Flex
                  style={{ width: '100%', padding: '0.5rem 0rem' }}
                  vertical={false}
                  justify={'space-between'}
                  align={'center'}
              >
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono', fontWeight: '400' }}>
                  My APY
                </Text>
                <Text
                    className={`${'font font0p87'} ${
                        unstakeData.MyAPY.includes('-') ? 'colorR' : unstakeData.MyAPY == '0%' ? 'colorBlack' : 'colorG'
                    }`}
                    style={{ fontFamily: 'Space Grotesk' }}
                >
                  {unstakeData.MyAPY}
                </Text>
              </Flex>
              <Flex
                  style={{ width: '100%', padding: '0.5rem 0rem' }}
                  vertical={false}
                  justify={'space-between'}
                  align={'center'}
              >
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Mono', fontWeight: '400' }}>
                  You will receive
                </Text>
                <Text className="font font0p87 colorBlack" style={{ fontFamily: 'Space Grotesk' }}>
                  {unstakeData.YouWillReceive}
                </Text>
              </Flex>
            </Flex>

            <Flex
                style={{ width: '100%', padding: '0.5rem', borderTop: '1px solid #EFEFEF' }}
                vertical
                justify={'flex-start'}
                align={'center'}
            >
              <Flex
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'calc(50% - 0.5rem / 2) calc(50% - 0.5rem / 2)',
                    gap: '0.5rem',
                  }}
                  vertical={false}
                  justify={'space-between'}
                  align={'center'}
              >
                <Button
                    disabled={unstakeLoading}
                    onClick={handleUnStakeCancel}
                    className="confirmSubBtn font1p1"
                    style={{ width: '100%', marginLeft: 0 }}
                >
                  DISCARD
                </Button>
                <Button
                    onClick={handleUnStakeOk}
                    loading={unstakeLoading}
                    className="confirmBtn font1p1 colorW"
                    style={{ width: '100%', marginLeft: 0 }}
                >
                  UNSTAKE
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Modal>
      </>
  );
};

export default Farming;
