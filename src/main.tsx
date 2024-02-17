import './styles/index.less';

import { App as AntdApp, ConfigProvider } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import EscapeAntd from '@/components/my-message';

import App from './App';
import store from './stores';

const container: any = document.getElementById('root');

const root = createRoot(container);

import { Buffer } from 'buffer';

window.Buffer = window.Buffer || Buffer;
root.render(
  <Provider store={store}>
    <ConfigProvider theme={{ hashed: false }}>
      <AntdApp>
        <EscapeAntd />

        <App />
      </AntdApp>
    </ConfigProvider>
  </Provider>,
);
