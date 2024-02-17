import type { TableProps } from 'antd';

import { useAsyncEffect } from 'ahooks';
import { Button, Flex, Image, Table, Typography } from 'antd';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import PoolFactoryAbi from '@/abi/pool_factory_abi.json';
import MarketsAvatarA from '@/assets/img/MarketsAvatarA.png';
import Constants from '@/constants';
import { useEthersSigner } from '@/web3/ethers';

import indexStyle from './index.module.css';

const { Text } = Typography;

interface TribeDataType {
  avatar: string;
  id: string;
  name: string;
  members: string;
  holders: string;
  revenue: string;
  slot: string;
  slotPrice: string;
  isList: boolean;
}
const TribeColumns: TableProps<TribeDataType>['columns'] = [
  {
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    render: avatar => (
      <Flex style={{ width: '100%' }} vertical={false} justify={'center'} align={'center'}>
        <Image width={'3.75rem'} height={'3.75rem'} src={avatar ? avatar : MarketsAvatarA} preview={false} />
      </Flex>
    ),
  },
  {
    title: 'Tribe ID',
    dataIndex: 'id',
    key: 'id',
    render: id => (
      <Flex vertical={false} justify={'flex-start'} align={'center'}>
        <Text className="font1">{id}</Text>
        <svg
          style={{ marginLeft: '0.38rem' }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.66669 7.33334L14.1334 1.86667" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.6667 4.53333V1.33333H11.4667" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M7.33337 1.33333H6.00004C2.66671 1.33333 1.33337 2.66666 1.33337 5.99999V9.99999C1.33337 13.3333 2.66671 14.6667 6.00004 14.6667H10C13.3334 14.6667 14.6667 13.3333 14.6667 9.99999V8.66666"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Flex>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <Text className="font1">{text}</Text>,
  },
  {
    title: 'Members',
    dataIndex: 'members',
    key: 'members',
    render: text => <Text className="font1">{text}</Text>,
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
    render: text => (
      <Text className={`${'font1'} ${text.includes('-') ? 'colorR' : text == '$0' ? 'colorBlack' : 'colorG'}`}>
        {text}
      </Text>
    ),
  },
  {
    title: 'Holders',
    dataIndex: 'holders',
    key: 'holders',
    render: text => <Text className="font1">{text}</Text>,
  },
  {
    title: 'Slot',
    dataIndex: 'slot',
    key: 'slot',
    render: text => <Text className="font1">{text}</Text>,
  },
  {
    title: 'Slot price',
    dataIndex: 'slotPrice',
    key: 'slotPrice',
    render: text => <Text className="font1">{text}</Text>,
  },
  {
    //Boolean
    title: 'List',
    dataIndex: 'isList',
    key: 'isList',
    render: is =>
      is ? (
        <Button
          className="solidActiveBtn font0p87"
          style={{ fontFamily: 'Space Mono', width: '6.25rem', padding: '0.5rem' }}
        >
          List
        </Button>
      ) : (
        <></>
      ),
  },
];

// My
interface MyDataType {
  avatar: string;
  name: string;
  slotPrice: string;
  change: string;
  holders: string;
  own: string;
  trade: {
    isBuy: boolean;
    isSell: boolean;
  };
}
const MyColumns: TableProps<MyDataType>['columns'] = [
  {
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    render: avatar => (
      <Flex style={{ width: '100%' }} vertical={false} justify={'center'} align={'center'}>
        <Image width={'3.75rem'} height={'3.75rem'} src={avatar ? avatar : MarketsAvatarA} preview={false} />
      </Flex>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <Text className="font1">{text}</Text>,
  },
  {
    title: 'Slot price',
    dataIndex: 'slotPrice',
    key: 'slotPrice',
    render: text => (
      <Text className="font1" style={{ width: '9.375rem' }}>
        {text}
      </Text>
    ),
  },
  {
    title: 'Change',
    dataIndex: 'change',
    key: 'change',
    render: text => <Text className="font1">{text}</Text>,
  },

  {
    title: 'Holders',
    dataIndex: 'holders',
    key: 'holders',
    render: text => <Text className="font1">{text}</Text>,
  },
  {
    title: 'My Own',
    dataIndex: 'own',
    key: 'own',
    render: text => (
      <Text className="font1" style={{ width: '9.375rem' }}>
        {text}
      </Text>
    ),
  },
  {
    //Boolean
    title: 'Trade',
    dataIndex: 'trade',
    key: 'trade',
    render: isArr => (
      <Flex vertical={false} justify={'flex-start'} align={'center'}>
        {isArr.isBuy ? (
          <Button
            className="confirmBtn font0p87"
            style={{ fontFamily: 'Space Mono', width: '6.25rem', height: '2rem', padding: '0.5rem' }}
          >
            BUY
          </Button>
        ) : (
          <></>
        )}
        {isArr.isSell ? (
          <Button
            className="warnBtn font0p87"
            style={{ fontFamily: 'Space Mono', width: '6.25rem', height: '2rem', padding: '0.5rem' }}
          >
            SELL
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    ),
  },
];

const Launchpad = () => {
  const { address: userAddress, isConnected } = useAccount();
  const signer = useEthersSigner();
  const [loading, setLoading] = useState(false);
  const PoolFactoryContract = new ethers.Contract(Constants.Contracts.PoolFactory, PoolFactoryAbi, signer);

  const loadData = async () => {
    setLoading(true);
    console.log('userAddress', userAddress);

    try {
      const data = await PoolFactoryContract.getOwnerPools(userAddress);
      const tableData = [];

      for (let i = 0; i < data?.length; i++) {
        tableData.push({
          id: '#' + i + 1,
          avatar: '',
          name: 'Xsatoshi',
          members: '23',
          holders: '123',
          revenue: '$423',
          slot: '$123',
          slotPrice: '$123',
          isList: true,
        });
      }

      setTribeData(tableData);
      console.log('data', data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useAsyncEffect(async () => {
    if (isConnected && signer) {
      loadData();
    }
  }, [isConnected, signer]);
  const [tribeData, setTribeData] = useState<TribeDataType[]>([]);
  const [MyData, setMyData] = useState<MyDataType[]>([
    {
      avatar: '',
      name: 'Xsatoshi',
      slotPrice: '0.1 E',
      change: '+29%',
      holders: '123',
      own: '23',
      trade: {
        isBuy: true,
        isSell: true,
      },
    },
  ]);

  return (
    <div className="wp pageBgDecorate">
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
            marginBottom: '1.44rem',
            backgroundColor: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '1.725rem',
          }}
        >
          Tribe Managment
        </Text>
        <Table
          style={{ width: '100%' }}
          columns={TribeColumns}
          dataSource={tribeData}
          loading={loading}
          pagination={{ position: ['bottomCenter'], defaultCurrent: 6, total: tribeData.length+1 }}
        />
        <Text
          className="font1p75 colorBlack mb0p75"
          style={{
            width: '100%',
            textAlign: 'center',
            borderTop: '1px solid var(--dark, #000)',
            borderBottom: '1px solid var(--dark, #000)',
            background: 'rgba(255, 255, 255, 0.70)',
            padding: '0.38rem',
            margin: '2rem 0',
            backgroundColor: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '1.725rem',
          }}
        >
          MY Slot
        </Text>
        <Table
          style={{ width: '100%' }}
          columns={MyColumns}
          dataSource={MyData}
          loading={loading}
          pagination={{ position: ['bottomCenter'], defaultCurrent: 6, total: MyData.length+1 }}
        />
      </Flex>
    </div>
  );
};

export default Launchpad;
