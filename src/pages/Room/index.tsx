import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Flex, Image, Input, message, Modal, Typography } from 'antd';
import { ethers } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

import PoolAbi from '@/abi/pool_abi.json';
import SlotAbi from '@/abi/slot_abi.json';
import arrowExplorer from '@/assets/img/arrowExplorer2.svg';
import chatAvatarA from '@/assets/img/chatAvatarA.png';
import chatAvatarB from '@/assets/img/chatAvatarB.png';
import chatEmojiIcon from '@/assets/img/chatEmojiIcon.svg';
import chatSendIcon from '@/assets/img/chatSendIcon.svg';
import farmingAvatarA from '@/assets/img/farmingAvatarA.png';
import farmingAvatarB from '@/assets/img/farmingAvatarB.png';
import Constants from '@/constants';
import { useEthersSigner } from '@/web3/ethers';

import indexStyle from './index.module.css';

const { Text } = Typography;

const Earn = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { openConnectModal } = useConnectModal();
  const { address: userAddress, isConnected } = useAccount();
  const signer = useEthersSigner();

  const PoolContract  = new ethers.Contract(searchParams.get('address') as `0x${string}`, PoolAbi, signer);;

  const SlotContract = new ethers.Contract(Constants.Contracts.PoolFactory, SlotAbi, signer);

  // 分页按钮
  const [pagin, setPagin] = useState(1);

  const [myData, setMyData] = useState({
    avatar: chatAvatarB,
    name: 'Hoaiphong15',
    id: '1',
  });

  const [chatData, setChatData] = useState([
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
    {
      user: {
        avatar: chatAvatarA,
        name: 'Doodles AI',
        id: 'xxx',
      },
      msg: 'Lorem ipsumgittis senectus prmet turpis.',
    },
    {
      user: {
        avatar: chatAvatarB,
        name: 'Hoaiphong15',
        id: '1',
      },
      msg: 'Lorem ipsum dolor sit  sagittis senectus pretium ut amet turpis.',
    },
  ]);

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

  // 聊天输入
  const [chatInput, setChatInput] = useState('');

  const handleChatChange = (e: any) => {
    setChatInput(e.target.value);

    //e.target.value
  };

  const chatInputRef = useRef();

  const handleChatBlur = (e: any) => {
    // 不要使用chatInput发送 可能会慢一个字符, 使用 e.target.value
    if (!e.target.value) {
      return;
    }

    chatData.push({
      user: {
        avatar: myData.avatar,
        name: myData.name,
        id: myData.id,
      },
      msg: e.target.value,
    });
    setChatData([...chatData]);
    setChatInput('');
  };

  useEffect(() => {
    const current: any = chatInputRef.current!;

    current.scrollTop = current.scrollHeight;
  }, [chatData]);

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

  // 弹窗 Buy
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);

  const buyShowModal = () => {
    setBuyOpen(true);
  };

  const handleBuyOk = async () => {
    try {
      if (isConnected) {
        setBuyLoading(true);
        const txn = await SlotContract.buySlots(BigInt(buyAmount), { gasLimit: 1000000 });

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

  // 弹窗 Deposit for Yield
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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


  // 弹窗 SELL
  const [sellLoading, setSellLoading] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);

  const showSellModal = () => {
    setSellOpen(true);
  };

  const handleSellOk = async () => {
    try {
      if (isConnected) {
        setSellLoading(true);
        const txn = await SlotContract.sellSlots(BigInt(buyAmount), { gasLimit: 1000000 });

        await txn.wait();
        console.log('tx set', txn.hash);
        message.success('Successful operation!');
        setSellOpen(false);
        setSellLoading(false);
      } else {
        openConnectModal?.();
      }
    } catch (e: any) {
      console.log('claim error', e);
      message.error(e.toString());
      setSellLoading(false);
    }
  };

  const handleSellCancel = () => {
    setSellOpen(false);
  };

  return (
    <>
      <Flex
        style={{
          display: 'grid',
          gridTemplateColumns: 'calc(100% - 23rem - 2.5rem) auto',
          gap: '0',
        }}
        vertical={false}
        justify={'space-between'}
        align={'flex-start'}
      >
        <Flex vertical justify={'flex-start'} align={'flex-start'}>
          <Flex style={{ position: 'relative', width: '100%' }} vertical justify={'flex-start'} align={'flex-start'}>
            <Flex
              style={{ padding: '0 2.5rem' }}
              className="r2v"
              vertical={false}
              justify={'flex-start'}
              align={'center'}
            >
              <Flex className="mt1 mb1" vertical={false} justify={'flex-start'} align={'center'}>
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
                <Text className="font1p25 colorBlack1E mr1" style={{ textTransform: 'uppercase' }}>
                  Back
                </Text>
                <Text className="font1p5 colorBlack33 mr2p5">DeFi Ignas</Text>
              </Flex>
              <Flex vertical={false} justify={'flex-start'} align={'flex-start'}>
                <Button
                  onClick={() => navigate('/Farming?address='+searchParams.get('address'))}
                  className={`${'font1p25'} ${pagin == 0 ? 'FarmingPaginBtn' : 'FarmingPaginDisableBtn'}`}
                >
                  Farming
                </Button>
                <Button className={`${'font1p25'} ${pagin == 1 ? 'FarmingPaginBtn' : 'FarmingPaginDisableBtn'}`}>
                  ROOM
                </Button>
              </Flex>
            </Flex>

            <Flex className={`${indexStyle.chatView}`} vertical justify={'flex-start'} align={'flex-start'}>
              <Flex
                ref={chatInputRef}
                className={`${indexStyle.chatBox}`}
                vertical
                justify={'flex-start'}
                align={'flex-start'}
              >
                {chatData.map(item => (
                  <Flex
                    className={`${myData.id == item.user.id ? indexStyle.chatItemMy : indexStyle.chatItem}`}
                    vertical={false}
                    justify={'flex-start'}
                    align={'flex-end'}
                  >
                    <Image height={'1.8rem'} width={'1.8rem'} src={item.user.avatar} preview={false} />
                    <Flex
                      className={`${myData.id == item.user.id ? indexStyle.chatMsgBoxMy : indexStyle.chatMsgBox}`}
                      vertical
                      justify={'flex-start'}
                      align={'flex-start'}
                    >
                      <Text className={`${indexStyle.chatTextName}`}>{item.user.name}</Text>
                      <Text className={`${indexStyle.chatTextMsg}`}>{item.msg}</Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
              <Flex className={`${indexStyle.chatInputBox}`} vertical={false} justify={'flex-start'} align={'center'}>
                <Button style={{ background: 'transparent', border: 'none', padding: '0', marginRight: '0.75rem' }}>
                  <Image height={'1.5rem'} width={'1.5rem'} src={chatEmojiIcon} preview={false} />
                </Button>
                <Input
                  className="chatSendInput"
                  placeholder="Say something..."
                  onInput={handleChatChange}
                  onBlur={handleChatBlur}
                  value={chatInput}
                />
                <Button
                  onClick={handleChatBlur}
                  style={{ background: 'transparent', border: 'none', padding: 0, marginRight: '0.8125rem' }}
                >
                  <Image height={'1.5rem'} width={'1.5rem'} src={chatSendIcon} preview={false} />
                </Button>
              </Flex>
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
            <Button
              onClick={() => stakeShowModal({ name: 'xxx' })}
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
              Deposit for Yield
            </Button>
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
                onClick={showSellModal}
                className="warnBtn font1p1 colorR"
                style={{ width: '100%', marginLeft: 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path
                    d="M8.66675 11.9583C8.66675 12.7667 9.29176 13.4167 10.0584 13.4167H11.6251C12.2917 13.4167 12.8334 12.85 12.8334 12.1417C12.8334 11.3833 12.5001 11.1083 12.0084 10.9333L9.50008 10.0583C9.00841 9.88333 8.67509 9.61667 8.67509 8.85C8.67509 8.15 9.21674 7.575 9.88341 7.575H11.4501C12.2167 7.575 12.8418 8.225 12.8418 9.03334"
                    stroke="#FD3535"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.75 6.75V14.25"
                    stroke="#FD3535"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.0834 10.5C19.0834 15.1 15.3501 18.8333 10.7501 18.8333C6.15008 18.8333 2.41675 15.1 2.41675 10.5C2.41675 5.9 6.15008 2.16666 10.7501 2.16666"
                    stroke="#FD3535"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.0833 5.5V2.16666H15.75"
                    stroke="#FD3535"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.9167 6.33333L19.0834 2.16666"
                    stroke="#FD3535"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Sell
              </Button>
              <Button
                onClick={buyShowModal}
                className="colorCBtn font1p1 colorBlack"
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
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal
        maskClosable={false}
        open={buyOpen}
        title={sidebar.name}
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
                onClick={handleBuyCancel}
                className="confirmSubBtn font1p1"
                style={{ width: '100%', marginLeft: 0 }}
              >
                DISCARD
              </Button>
              <Button className="confirmBtn font1p1 colorW" style={{ width: '100%', marginLeft: 0 }}>
                Buy
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>

      {/* Deposit for Yield */}
      <Modal open={open} maskClosable={false} title={sidebar.name} onOk={handleOk} onCancel={handleCancel} closeIcon={false} footer={false}>
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
                onClick={handleBuyCancel}
                className="confirmSubBtn font1p1"
                style={{ width: '100%', marginLeft: 0 }}
              >
                DISCARD
              </Button>
              <Button
                onClick={handleBuyOk}
                loading={buyLoading}
                className="confirmBtn font1p1 colorW"
                style={{ width: '100%', marginLeft: 0 }}
              >
                Buy
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
      {/* SELL */}
      <Modal
        maskClosable={false}
        open={sellOpen}
        title={sidebar.name}
        onOk={handleSellOk}
        onCancel={handleSellCancel}
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
                onClick={handleSellCancel}
                className="confirmSubBtn font1p1"
                style={{ width: '100%', marginLeft: 0 }}
              >
                DISCARD
              </Button>
              <Button
                onClick={handleSellOk}
                loading={sellLoading}
                className="warnSolidBtn font1p1 colorW"
                style={{ width: '100%', marginLeft: 0 }}
              >
                SELL
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
                {stakeData.Balance}
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
                className={"confirmBtn font1p1 colorW"}
                style={{ width: '100%', marginLeft: 0 }}
              >
                STAKE
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default Earn;
