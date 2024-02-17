import 'dayjs/locale/en';

import { ConfigProvider, Spin, theme as a } from 'antd';
import enUS from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { history, HistoryRouter } from '@/routes/history';
import { persistor } from '@/stores';
import { MyWeb3Provider } from '@/web3/MyWeb3Provider';

import RenderRouter from './routes';

const App: React.FC = () => {
  const { theme } = useSelector(state => state.global);

  console.log('app');

  dayjs.locale('en');

  return (
    <MyWeb3Provider>
      <ConfigProvider
        locale={enUS}
        componentSize="middle"
        theme={{
          hashed: false,
          token: { colorPrimary: '#02C4EE', colorLink: '#02C4EE' },
          algorithm: a.defaultAlgorithm,
        }}
      >
        <HistoryRouter history={history}>
          <PersistGate loading={null} persistor={persistor}>
            <Suspense>
              <RenderRouter />
            </Suspense>
          </PersistGate>
        </HistoryRouter>
      </ConfigProvider>
    </MyWeb3Provider>
  );
};

export default App;
