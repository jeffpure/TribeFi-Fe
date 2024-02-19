/* eslint-disable max-len */
import './footer-style.css';

import { Flex, Image, theme as antTheme, Typography } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import { Link } from 'react-router-dom';

import docIcon from '@/assets/img/docIcon.svg';
import logo from '@/assets/logo/logo.svg';
import { TwitterLogo } from '@/components/Icons';

const { Text } = Typography;

function MyFooter(): JSX.Element {
  const token = antTheme.useToken();

  return (
    <Footer
      className="bg-2 footer-logos-container"
      style={{ backgroundColor: '#FFF', height: '17.1rem', zIndex: 2, borderTop: '1px solid var(--Gray-1, #333)' }}
    >
      <Flex vertical justify={'flex-start'} align={'flex-start'}>
        <Flex vertical={false} justify={'center'} align={'center'}>
          <Flex className="mb2p25 mr5" style={{ width: '15.4rem' }} vertical justify={'center'} align={'flex-start'}>
            <Link className="mb1p5" style={{ flexShrink: 0 }} to={'/Home'} target="_self">
              <Flex vertical={false} justify={'center'} align={'center'}>
                <Image height={'1.56181rem'} width={'1.56181rem'} src={logo} preview={false} />
                <Text className="font1 colorBlack" style={{ marginLeft: '0.43rem' }}>
                  TribeFi
                </Text>
              </Flex>
            </Link>
            <Flex vertical={false} justify={'center'} align={'center'}>
              <Link to="https://tribenest.gitbook.io/tribefi/" target="_blank" className="mr1">
                <Image height={'1.5rem'} width={'1.5rem'} src={docIcon} preview={false} />
              </Link>
              <Link to="" target="_blank" className="mr1">
                <TwitterLogo size={30} color="#828282" />
              </Link>
            </Flex>
          </Flex>
          <Flex className="footerNav" vertical={false} justify={'center'} align={'center'}>
            {[
              { url: '/Tribes', name: 'Tribes' },
              { url: '/Farming', name: 'Farming' },
              { url: '/Room', name: 'Room' },
              { url: '/Markets', name: 'Markets' },
            ].map((item: any) => (
              <Link
                style={{ flexShrink: 0 }}
                to={
                  item.name === 'Farming' || item.name === '/Room'
                    ? localStorage.getItem('tribeAddr')
                      ? item.url + '?address=' + localStorage.getItem('tribeAddr')
                      : '/Tribes/Join'
                    : item.url
                }
                target="_self"
                className="footerNavItem"
              >
                <Text className="font0p87 colorBlack" style={{ fontFamily: 'Space Mono', fontWeight: '400' }}>
                  {item.name}
                </Text>
              </Link>
            ))}
          </Flex>
        </Flex>

        <Text className="font0p87 colorBlack" style={{ fontWeight: '400' }}>
          © 2023 TribeFi. All rights reserved.
        </Text>
      </Flex>
    </Footer>
  );
}

export default MyFooter;
