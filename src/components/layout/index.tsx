import type { MyModalRefType } from '@/components/my-modal';

import { Layout, Spin } from 'antd';
import React, { Suspense, useRef } from 'react';
import { Outlet } from 'react-router';

import MyFooter from '@/components/my-footer';
import MyHeader from '@/components/my-header';
import { MyModal } from '@/components/my-modal';
import { MyModalRefContext } from '@/context/modalRefContext';

const { Content } = Layout;

export default () => {
  const ref = useRef<MyModalRefType>();

  return (
    <Layout className="layout">
      <MyHeader />
      <Content>
        <Suspense fallback={<Spin spinning={true} className="app-loading-wrapper"></Spin>}>
          <MyModalRefContext.Provider value={ref}>
            <MyModal ref={ref} />
            <Outlet />
          </MyModalRefContext.Provider>
        </Suspense>
      </Content>
      <MyFooter />
    </Layout>
  );
};
