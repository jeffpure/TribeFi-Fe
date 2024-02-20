import type { TableProps } from 'antd';

import { Button, Flex, Table, Typography } from 'antd';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useContractRead } from 'wagmi';

import PoolFactoryAbi from '@/abi/pool_factory_abi.json';
import SlotAbi from '@/abi/slot_abi.json';
import Constants from '@/constants';
import { useEthersSigner } from '@/web3/ethers';

import indexStyle from './index.module.css';

const { Text } = Typography;

interface DataType {
  rank: string;
  tribe: string;
  blastTVL: string;
  tribeTVL: string;
  apyGeneralEth: string;
  apyTribeEth: string;
  apyTribeTRFI: string;
  apyEsTRFI: string;
  members: string;
  slot: string;
  activity: boolean;
}

const Launchpad = () => {
  const { address: userAddress, isConnected } = useAccount();
  const signer = useEthersSigner();

  const PoolFactoryContract = new ethers.Contract(Constants.Contracts.PoolFactory, PoolFactoryAbi, signer);

  const SlotContract = new ethers.Contract(Constants.Contracts.Slot, SlotAbi, signer);

  const { data: pools, isLoading: loading }: any = useContractRead({
    abi: PoolFactoryAbi,
    address: Constants.Contracts.PoolFactory as `0x${string}`,
    functionName: 'getAllPools',
  });

  useEffect(() => {
    if (pools && pools.length > 0) {
      const tableData = [];

      for (let i = 0; i < pools.length; i++) {
        tableData.push({
          address: pools[i],
          rank: '#' + (i + 1),
          tribe: 'Tribe MFT #' + (i + 1),
          blastTVL: '8,712',
          tribeTVL: '2,302',
          apyGeneralEth: '126%',
          apyTribeEth: '126%',
          apyTribeTRFI: '126%',
          apyEsTRFI: '126%',
          members: '233',
          slot: '263 Holders',
          activity: true,
        });
      }

      setData(tableData);

      console.log(pools);
    }
  }, [pools]);
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Tribe',
      dataIndex: 'tribe',
      key: 'tribe',
    },
    {
      title: 'Blast TVL',
      dataIndex: 'blastTVL',
      key: 'blastTVL',
    },
    {
      title: 'Tribe TVL',
      dataIndex: 'tribeTVL',
      key: 'tribeTVL',
    },
    {
      title: (
        <Flex vertical justify={'flex-start'} align={'center'}>
          <Text className="colorW">General APY</Text>
          <Text className="colorY">ETH/USDT</Text>
        </Flex>
      ),
      dataIndex: 'apyGeneralEth',
      key: 'apyGeneralEth',
    },
    {
      title: (
        <Flex vertical justify={'flex-start'} align={'center'}>
          <Text className="colorW">Tribe APY</Text>
          <Text className="colorC">ETH/USDT</Text>
        </Flex>
      ),
      dataIndex: 'apyTribeEth',
      key: 'apyTribeEth',
    },
    {
      title: (
        <Flex vertical justify={'flex-start'} align={'center'}>
          <Text className="colorW">Tribe APY</Text>
          <Text className="colorB">ETH/TRFI</Text>
        </Flex>
      ),
      dataIndex: 'apyTribeTRFI',
      key: 'apyTribeTRFI',
    },
    {
      title: (
        <Flex vertical justify={'flex-start'} align={'center'}>
          <Text className="colorW">Tribe APY</Text>
          <Text className="colorG">esTRFI</Text>
        </Flex>
      ),
      dataIndex: 'apyEsTRFI',
      key: 'apyEsTRFI',
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
    },
    {
      title: 'Slot',
      dataIndex: 'slot',
      key: 'slot',
    },
    {
      //Boolean
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      render: (is, record) =>
        is ? (
          <Button
            onClick={() => toFarm(record)}
            className="solidActiveBtn font0p87"
            style={{ fontFamily: 'Space Mono', padding: '0.5rem', width: '8.4375rem' }}
          >
            Join
          </Button>
        ) : (
          <></>
        ),
    },
  ];
  const [data, setData] = useState<DataType[]>([
    // {
    //   rank: '#1',
    //   tribe: 'HANWE.ETH',
    //   blastTVL: '8,712',
    //   tribeTVL: '2,302',
    //   apyGeneralEth: '126%',
    //   apyTribeEth: '126%',
    //   apyTribeTRFI: '126%',
    //   apyEsTRFI: '126%',
    //   members: '233',
    //   slot: '263 Holders',
    //   activity: true,
    // },
    // {
    //   rank: '#1',
    //   tribe: 'HANWE.ETH',
    //   blastTVL: '8,712',
    //   tribeTVL: '2,302',
    //   apyGeneralEth: '126%',
    //   apyTribeEth: '126%',
    //   apyTribeTRFI: '126%',
    //   apyEsTRFI: '126%',
    //   members: '233',
    //   slot: '263 Holders',
    //   activity: true,
    // },
  ]);

  const navigate = useNavigate();

  const joinATribe = () => {
    navigate('/Tribes/Join');
  };

  const toFarm = async (s: any) => {
    console.log(s);
    // if (isConnected){
    //   const PoolContract = new ethers.Contract(s.address, PoolAbi, signer);
    //   const data = await PoolContract.poolOwner();
    //   if (data.toLowerCase()===userAddress?.toLowerCase()){
    //     const isHaveSlot = await SlotContract.isUserHasSlot(data, userAddress);
    //     if (!isHaveSlot){
    //       navigate('/Tribes/Join');
    //     }
    //   }
    // }
    localStorage.setItem('tribeAddr', s.address);

    navigate('/Farming?address=' + s.address);
  };

  return (
    <div className="pageBgDecorate" style={{ paddingTop: '1.5rem' }}>
      <Flex className={`${'mb2p5'} ${indexStyle.topBox}`} vertical justify={'flex-start'} align={'flex-start'}>
        <Text
          className="font1p75 colorBlack mb0p75"
          style={{
            width: '100%',
            textAlign: 'center',
            borderTop: '1px solid var(--dark, #000)',
            borderBottom: '1px solid var(--dark, #000)',
            background: 'rgba(255, 255, 255, 0.70)',
            padding: '0.38rem',
            marginBottom: '0.5rem',
            backgroundColor: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '1.725rem',
          }}
        >
          Join a tribe
        </Text>
        <Flex className="w-full r2v" vertical={false} justify={'space-between'} align={'center'}>
          <Text className="font1p1 colorBlackLight" style={{ maxWidth: '48rem', margin: '1.44rem 0' }}>
            Select a tribe to join, and deposit your assets on Blast for yield. if you have slot, you will earn more.
          </Text>
          <Text
            className="font1p1 colorMain"
            onClick={() => joinATribe()}
            style={{ fontStyle: 'italic', cursor: 'pointer', textDecorationLine: 'underline' }}
          >
            Join a Tribe to Fight!
          </Text>
        </Flex>
      </Flex>
      <div style={{ padding: '0 2.5rem' }}>
        <Table
          style={{ width: '100%' }}
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={{ position: ['bottomCenter'], defaultCurrent: 6, total: data?.length }}
        />
      </div>
    </div>
  );
};

export default Launchpad;
