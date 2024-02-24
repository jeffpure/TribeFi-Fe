import type { UploadProps } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Flex, Image, Input, message, Select, Typography, Upload } from 'antd';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import PoolFactoryAbi from '@/abi/pool_factory_abi.json';
import SlotAbi from '@/abi/slot_abi.json';
import ETHIcon from '@/assets/img/ethCoinB.svg';
import tribeCoin from '@/assets/img/tribeCoin.svg';
import upImgIcon from '@/assets/img/upImgIcon.svg';
import BlocMates from '@/assets/nft/BlocMates.jpg';
import CM from '@/assets/nft/CM.jpg';
import DefiCheetah from '@/assets/nft/DeFi Cheetah.jpg';
import DefiDad from '@/assets/nft/DeFi Dad ⟠ defidad.eth.jpg';
import DefiIgnas from '@/assets/nft/Defi Ignas.jpg';
import Constants from '@/constants';
import { useEthersSigner } from '@/web3/ethers';

import indexStyle from './index.module.css';

const { Text } = Typography;

type FileType = Parameters<any>[0];

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const CreateTribe = () => {
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const { address: userAddress, isConnected } = useAccount();
  const signer = useEthersSigner();
  const SlotContract = new ethers.Contract(Constants.Contracts.Slot, SlotAbi, signer);

  const PoolFactoryContract = new ethers.Contract(Constants.Contracts.PoolFactory, PoolFactoryAbi, signer);

  // 进度: 0 1 2
  const [process, setProcess] = useState(1);
  // 表单验证后的 激活按钮
  const [verify, setVerify] = useState(false);

  const test = () => {
    let isVerify = false;

    if (curNFT.value && name) {
      isVerify = true;
    }

    setVerify(isVerify);
  };

  // NFT 下拉
  const [curNFT, setCurNFT] = useState({
    value: 'Tribe MFT #1',
    label: 'Tribe MFT #1',
    addr: '0xC8Fe71511E7508F8c9016EcF10C31bE4bd31c3A8',
  });
  const [bindNFT, setBindNFT] = useState([
    { value: 'Tribe MFT #1', label: 'Tribe MFT #1', addr: '0xC8Fe71511E7508F8c9016EcF10C31bE4bd31c3A8' },
    { value: 'Tribe MFT #2', label: 'Tribe MFT #2', addr: '0xfBDd9763c5Fa9747fB948Af4a1cE785654191e2e' },
    { value: 'Tribe MFT #3', label: 'Tribe MFT #3', addr: '0xfBDd9763c5Fa9747fB948Af4a1cE785654191e2e' },
    { value: 'Tribe MFT #4', label: 'Tribe MFT #4', addr: '0xfBDd9763c5Fa9747fB948Af4a1cE785654191e2e' },
    { value: 'Tribe MFT #5', label: 'Tribe MFT #5', addr: '0xfBDd9763c5Fa9747fB948Af4a1cE785654191e2e' },
  ]);

  const handleNTFChange = (value: string, option: any) => {
    // value: 项中 value
    setCurNFT(option);
    test();
  };

  const [btnLoading, setBtnLoading] = useState(false);
  // 头像上传
  // https://ant.design/components/upload-cn#onchange
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <Image width={'6.5rem'} src={upImgIcon} preview={false} />}
    </button>
  );

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleUploadChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      test();

      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false);
        setImageUrl(url);
        test();
      });
    }
  };

  // 名称
  const [name, setName] = useState('');

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  // Staking 下拉
  const [curStaking, setCurStaking] = useState({});
  const [bindStaking, setBindStaking] = useState([
    { value: 'ETH', label: 'ETH', icon: ETHIcon },
    { value: 'TRFI', label: 'TRFI', icon: tribeCoin },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ]);

  const handleStakingChange = (value: string, option: any) => {
    // value: 项中 value
    setCurStaking(option);
    test();
  };

  useEffect(() => {
    test();
  }, [name, curNFT]);

  const nextStep = async () => {
    try {
      if (isConnected) {
        setBtnLoading(true);
        const txn1 = await PoolFactoryContract.addPool(
          curNFT.addr,
          name,
          curNFT.addr,
          '0xDc826f32923523B2Be6C8E333Dd99f7b1f900e19',
          BigInt(0),
          Constants.Contracts.Slot,
        );

        await txn1.wait();
        console.log('tx1 set', txn1.hash);
        const isHaveSlot = await SlotContract.isUserHasSlot(userAddress, userAddress);

        if (!isHaveSlot) {
          const txn2 = await SlotContract.buySlots(userAddress, BigInt(1), { gasLimit: 1000000 });

          await txn2.wait();
          console.log('tx2 set', txn2.hash);
        }

        message.success('Created successfully');
        setTimeout(() => {
          setBtnLoading(false);
          navigate('/Tribes');
        }, 2000);
      } else {
        openConnectModal?.();
      }
    } catch (e: any) {
      console.log('claim error', e);
      message.error(e.toString());
      setBtnLoading(false);
    }
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
              Create a Tribe
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
              <Text className={`${'font1'} ${'colorBlack'}`}>Bind Tribe NFT</Text>
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
              <Text className={`${'font1'} ${'colorBlack'}`}>Tribe Info</Text>
            </Flex>
            {/*<Flex*/}
            {/*  className={`${indexStyle.paginItem} ${*/}
            {/*    process == 2 ? indexStyle.paginItemActive : indexStyle.paginItemDisable*/}
            {/*  }`}*/}
            {/*  vertical={false}*/}
            {/*  justify={'space-between'}*/}
            {/*  align={'center'}*/}
            {/*>*/}
            {/*  <Flex*/}
            {/*    className={`${indexStyle.paginItemTag} ${*/}
            {/*      process >= 2 ? indexStyle.paginItemTagActive : indexStyle.paginItemTagDisable*/}
            {/*    }`}*/}
            {/*    justify={'center'}*/}
            {/*    align={'center'}*/}
            {/*  >*/}
            {/*    3*/}
            {/*  </Flex>*/}
            {/*  <Text className={`${'font1'} ${'colorBlack'}`}>Customize Farming</Text>*/}
            {/*</Flex>*/}
          </Flex>

          <Flex className={`${indexStyle.windowBody}`} vertical justify={'space-between'} align={'center'}>
            <Flex className={`${indexStyle.formItem}`} vertical={false} justify={'space-between'} align={'center'}>
              <Text className="font1p25 colorBlack" style={{ fontWeight: '700' }}>
                1. Bind one Tribe NFT
              </Text>

              <Flex
                style={{ position: 'relative', padding: '0.75rem', border: '1px solid var(--line-border, #8A8A8A)' }}
                vertical={false}
                justify={'center'}
                align={'center'}
              >
                {/*<div*/}
                {/*  className="mr0p5"*/}
                {/*  style={{*/}
                {/*    position: 'absolute',*/}
                {/*    left: '0.5rem',*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <Image width={'1.5rem'} src={curNFT.icon} preview={false} />*/}
                {/*</div>*/}
                <Select
                  className={`${'font1 colorMain createTeibeSelect'} ${indexStyle.SelectBox}`}
                  defaultValue={bindNFT[0].label}
                  onChange={handleNTFChange}
                  options={bindNFT}
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
            <Flex
              className={`${indexStyle.formItem}`}
              style={{ marginBottom: '1.5rem' }}
              vertical={false}
              justify={'space-between'}
              align={'flex-start'}
            >
              <Text className="font1p25 colorBlack" style={{ fontWeight: '700' }}>
                2. Enter Tribe Info
              </Text>
              <Flex style={{ width: '18.6875rem' }} vertical justify={'center'} align={'flex-start'}>
                <Text
                  className="font0p87 colorBlackLight"
                  style={{ fontFamily: 'Space Mono', marginBottom: '0.5rem', lineHeight: '1.78356rem' }}
                >
                  Upload Tribe Photo
                </Text>
                <Flex style={{ width: '18.6875rem' }} vertical={false} justify={'center'} align={'center'}>
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    beforeUpload={beforeUpload}
                    onChange={handleUploadChange}
                    accept="image/png, image/jpeg"
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Flex>
                <Text
                  className="font0p87 colorBlackLight"
                  style={{ fontFamily: 'Space Mono', marginBottom: '0.25rem', lineHeight: '1.78356rem' }}
                >
                  Tribe name
                </Text>
                <Input placeholder="Enter your tribe name" onChange={handleNameChange} />
              </Flex>
            </Flex>
            {/*
            <Flex className={`${indexStyle.formItem}`} vertical={false} justify={'space-between'} align={'flex-start'}>
              <Text className="font1p25 colorBlack" style={{ fontWeight: '700' }}>
                3. Customize Farming Event
              </Text>
              <Flex vertical justify={'center'} align={'flex-start'}>
                <Text
                  className="font0p87 colorBlackLight"
                  style={{ fontFamily: 'Space Mono', marginBottom: '0.5rem', lineHeight: '1.78356rem' }}
                >
                  Staking Token
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
                    <Image width={'1.5rem'} src={curStaking.icon} preview={false} />
                  </div>
                  <Select
                    className={`${'font1 colorMain createTeibeSelect'} ${indexStyle.SelectBox}`}
                    placeholder="Select staking token"
                    onChange={handleStakingChange}
                    options={bindStaking}
                    optionRender={(option, info) => (
                      <Flex vertical={false} justify={'flex-start'} align={'center'}>
                        <div className="mr0p5">
                          <Image width={'1.5rem'} src={option.data.icon} preview={false} />
                        </div>
                        <Text className="font1 colorW" style={{ fontFamily: 'Orbitron' }}>
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
                <Text
                  className="font0p87 colorBlackLight"
                  style={{
                    fontFamily: 'Space Mono',
                    marginBottom: '0.5rem',
                    marginTop: '1.5rem',
                    lineHeight: '1.78356rem',
                  }}
                >
                  Reward token
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
                    <Image width={'1.5rem'} src={curReward.icon} preview={false} />
                  </div>
                  <Select
                    className={`${'font1 colorMain createTeibeSelect'} ${indexStyle.SelectBox}`}
                    placeholder="Select reward token"
                    onChange={handleRewardChange}
                    options={bindReward}
                    optionRender={(option, info) => (
                      <Flex vertical={false} justify={'flex-start'} align={'center'}>
                        <div className="mr0p5">
                          <Image width={'1.5rem'} src={option.data.icon} preview={false} />
                        </div>
                        <Text className="font1 colorW" style={{ fontFamily: 'Orbitron' }}>
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
            </Flex>
             */}
            <div style={{ width: '100%', padding: '0.5rem' }}>
              <Button
                className={`${verify ? 'confirmBtn' : 'confirmDisableBtn'}`}
                loading={btnLoading}
                onClick={() => nextStep()}
              >
                {isConnected ? 'Confirm' : 'Connect Wallet'}
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default CreateTribe;
