import { Result } from 'antd';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return <Result style={{ height: '100vh' }} status="404" title="404" subTitle="Not Found"></Result>;
};

export default NotFoundPage;
