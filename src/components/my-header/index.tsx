import type { FC } from 'react';

import { Flex, Image, Layout, theme as antTheme, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHref, useNavigate } from 'react-router-dom';

import docIcon from '@/assets/img/docIcon.svg';
import TribeNFTIcon from '@/assets/img/TribeNFTIcon.svg';
import logo from '@/assets/logo/logo-negative.svg';
//import { TelegramLogo, TwitterLogo } from 'phosphor-react';
import { TelegramLogo, TwitterLogo } from '@/components/Icons';
import { MyWalletButton } from '@/components/my-wallet-button';
import { setGlobalState } from '@/stores/system/global.store';

import indexStyle from './index.module.css';

const { Text, Paragraph } = Typography;
const { Header } = Layout;

const MyHeader: FC = () => {
  const href = useHref({});

  const { theme } = useSelector(state => state.global);
  const token = antTheme.useToken();
  const dispatch = useDispatch();

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  window.addEventListener('resize', function () {
    if (isOpenMenu) {
      const aspectRatio = document.body.offsetWidth / document.body.offsetHeight;

      if (aspectRatio > 1.2) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
    }
  });

  return (
    <Header id="nav-container" className={`${indexStyle.header}`}>
      {/*style={{ backgroundColor: token.token.colorBgContainer }} */}
      <Flex style={{ width: '100%', position: 'relative' }} vertical justify={'center'} align={'center'}>
        <Text
          className="font1 colorW"
          style={{
            width: '100%',
            background: 'rgb(141,49,182)',
            textAlign: 'center',
            marginBottom: '0.2rem',
            padding: '0.2rem',
            zIndex: '999',
          }}
        >
          More features are under developed for the Demo version. Stay tuned
        </Text>

        <div className={`${indexStyle.headerContaine}`} style={{ width: '100%' }}>
          <Flex
            style={{ flexShrink: 0, background: '#0D4CF5', width: '10rem', height: '4.31rem' }}
            vertical={false}
            justify={'center'}
            align={'center'}
          >
            <Link to={'/Home'} style={{ cursor: 'pointer' }}>
              <Flex vertical={false} justify={'center'} align={'center'}>
                <Image height={'1.56181rem'} width={'1.56181rem'} src={logo} preview={false} />
                <Text className="font1 colorW" style={{ marginLeft: '0.43rem' }}>
                  TribeFi
                </Text>
              </Flex>
            </Link>
          </Flex>
          <div className={`${indexStyle.headerBorder}`}>
            <div className={`${indexStyle.headerMain}`}>
              <Flex className={`${indexStyle.headerMainList}`} vertical={false} justify={'center'} align={'center'}>
                {[
                  { url: '/Create', name: 'Create' },
                  { url: '/Tribes', target: false, name: 'Join a tribe' },
                  { url: '/Farming', target: false, name: 'Farming' },
                  // { url: '/Room', target: false, name: 'Room' },
                  { url: '/Markets', target: false, name: 'Markets' },
                  { url: 'https://blur.io/', target: true, name: 'Tribe NFT' },
                ].map((item, idx) => {
                  return (
                    <Link
                      key={idx}
                      to={
                        item.name === 'Farming'
                          ? localStorage.getItem('tribeAddr')
                            ? item.url + '?address=' + localStorage.getItem('tribeAddr')
                            : '/Tribes/Join'
                          : item.url
                      }
                      target={item.target ? '_blank' : '_self'}
                      className={`${indexStyle.navBtn} ${href.includes(item.url) ? indexStyle.activeNavBtn : ''}`}
                    >
                      <Flex vertical={false} justify={'center'} align={'center'}>
                        {item.name == 'Tribe NFT' ? (
                          <>
                            <Image
                              height={'1.25rem'}
                              width={'1.25rem'}
                              src={item.name == 'Tribe NFT' ? TribeNFTIcon : ''}
                              preview={false}
                            />
                            <Text
                              className={`${indexStyle.navBtn} ${
                                href.includes(item.url) ? indexStyle.activeNavBtn : ''
                              }`}
                              style={{ marginLeft: '0.38rem' }}
                              ellipsis={true}
                            >
                              {item.name}
                            </Text>
                          </>
                        ) : (
                          <Text
                            className={`${indexStyle.navBtn} ${href.includes(item.url) ? indexStyle.activeNavBtn : ''}`}
                            ellipsis={true}
                          >
                            {item.name}
                          </Text>
                        )}
                      </Flex>
                    </Link>
                  );
                })}
              </Flex>
            </div>

            <Flex style={{ height: '100%', width: '20rem' }} vertical={false} justify={'center'} align={'center'}>
              <Link to="https://tribenest.gitbook.io/tribefi/" target="_blank" className={`${indexStyle.socialLogo}`}>
                <Image height={'1.5rem'} width={'1.5rem'} src={docIcon} preview={false} />
              </Link>
              <Link to="" target="_blank" className={`${indexStyle.socialLogo}`}>
                <TwitterLogo size={30} color="#828282" />
              </Link>
              {/*
          <Link to="" target="_blank" className={`${indexStyle.socialLogo}`}>
            <TelegramLogo size={30} color="#828282" />
          </Link>
          */}
              <Flex
                style={{ height: '100%', padding: '0 1rem', borderLeft: '1px solid #8A8A8A' }}
                vertical={false}
                justify={'center'}
                align={'center'}
              >
                <MyWalletButton />
              </Flex>
              <button
                className={`${indexStyle.menuBox}`}
                onClick={() => {
                  setIsOpenMenu(!isOpenMenu);
                  document.body.style.overflow = isOpenMenu ? 'auto' : 'hidden';
                }}
              >
                <div className={`${indexStyle.menu} ${isOpenMenu ? indexStyle.closeMenu : ''}`}></div>
              </button>
            </Flex>
          </div>
        </div>
        {isOpenMenu ? (
          <div className={`${indexStyle.headerMainOpen}`}>
            <Flex className={`${indexStyle.headerMainListOpen}`} justify={'center'}>
              {[
                { url: '/Create', name: 'Create' },
                { url: '/Tribes', name: 'Join a tribe' },
                { url: '/Farming', name: 'Farming' },
                // { url: '/Room', name: 'Room' },
                { url: '/Markets', name: 'Markets' },
                { url: 'https://blur.io/', name: 'Tribe NFT' },
              ].map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    to={
                      item.name === 'Farming'
                        ? localStorage.getItem('tribeAddr')
                          ? item.url + '?address=' + localStorage.getItem('tribeAddr')
                          : '/Tribes/Join'
                        : item.url
                    }
                    onClick={() => {
                      setIsOpenMenu(false);
                      document.body.style.overflow = 'auto';
                    }}
                    target={item.name == 'Doc' ? '_blank' : '_self'}
                    className={`${indexStyle.navBtn} ${href.includes(item.url) ? indexStyle.activeNavBtn : ''}`}
                  >
                    <Flex vertical={false} justify={'center'} align={'center'}>
                      {item.name == 'Doc' || item.name == 'Tribe NFT' ? (
                        <>
                          <Image
                            height={'1.25rem'}
                            width={'1.25rem'}
                            src={item.name == 'Doc' ? docIcon : item.name == 'Tribe NFT' ? TribeNFTIcon : ''}
                            preview={false}
                          />
                          <Text
                            className={`${indexStyle.navBtn} ${href.includes(item.url) ? indexStyle.activeNavBtn : ''}`}
                            style={{ marginLeft: '0.38rem', width: 'auto', padding: 0 }}
                            ellipsis={true}
                          >
                            {item.name}
                          </Text>
                        </>
                      ) : (
                        <Text
                          className={`${indexStyle.navBtn} ${href.includes(item.url) ? indexStyle.activeNavBtn : ''}`}
                          style={{ width: 'auto', padding: 0 }}
                          ellipsis={true}
                        >
                          {item.name}
                        </Text>
                      )}
                    </Flex>
                  </Link>
                );
              })}
            </Flex>
          </div>
        ) : (
          <></>
        )}
      </Flex>
    </Header>
  );
};

export default MyHeader;
