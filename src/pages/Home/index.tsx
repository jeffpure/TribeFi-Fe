import { Button, Flex, Image, Typography } from 'antd';

import home_cases1 from '@/assets/img/home_cases1.svg';
import home_cases2 from '@/assets/img/home_cases2.svg';
import home_cases3 from '@/assets/img/home_cases3.svg';
import home_cases4 from '@/assets/img/home_cases4.svg';
import home_FEATURE1 from '@/assets/img/home_FEATURE1.svg';
import home_FEATURE1Hover from '@/assets/img/home_FEATURE1_hover.svg';
import home_FEATURE2 from '@/assets/img/home_FEATURE2.svg';
import home_FEATURE2Hover from '@/assets/img/home_FEATURE2_hover.svg';
import howitworks from '@/assets/img/howitworks.svg';

import indexStyle from './index.module.css';

const { Text } = Typography;

const HomeTitle = ({ title }: any) => {
  return (
    <div style={{ padding: '1.5rem 2.5rem', width: '100%' }}>
      <Flex
        style={{
          position: 'relative',
          padding: '0.75rem 0',
          width: '100%',
          border: '1px solid #8A8A8A',
          background: '#FAFAFA',
        }}
        vertical
        justify={'center'}
        align={'center'}
      >
        <svg
          style={{ position: 'absolute', left: 0, top: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
        >
          <path d="M13 0H0V13L13 0Z" fill="#8A8A8A" />
        </svg>
        <Text className="font1p5 colorBlack">{title}</Text>
        <svg
          style={{ position: 'absolute', right: 0, bottom: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
        >
          <path d="M0 13L13 13L13 0L0 13Z" fill="#8A8A8A" />
        </svg>
      </Flex>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <div className="pageBgDecorate" style={{ padding: '1.5rem 2.5rem' }}>
        <Flex className={`${indexStyle.topBox}`} vertical justify={'center'} align={'flex-start'}>
          <Flex className={`${indexStyle.topLined}`} vertical justify={'center'} align={'flex-start'}>
            <Text className={`${'mb2p5'} ${indexStyle.firstScreenTitle}`}>The Socialized DeFi Liquidity Protocol</Text>
          </Flex>
          <div className={`${'colorMain'} ${indexStyle.topDeckTime}`}>2077.02.02</div>
          <Flex vertical={false} justify={'flex-start'} align={'center'} className={`${indexStyle.topsDeckLogin}`}>
            <Text className={`${'colorMain mr5'} ${indexStyle.topsDeckLoginText}`}>
              The ultimate social finance, in the world of cyberpunk.
            </Text>

            <svg
              className={`${'mr5'}`}
              xmlns="http://www.w3.org/2000/svg"
              width="81"
              height="11"
              viewBox="0 0 81 11"
              fill="none"
            >
              <line x1="0.646447" y1="10.6464" x2="10.6464" y2="0.646448" stroke="#0D4CF5" />
              <line x1="40.6464" y1="10.6464" x2="50.6464" y2="0.646448" stroke="#0D4CF5" />
              <line x1="10.6464" y1="10.6464" x2="20.6464" y2="0.646448" stroke="#0D4CF5" />
              <line x1="50.6464" y1="10.6464" x2="60.6464" y2="0.646448" stroke="#0D4CF5" />
              <line x1="20.6464" y1="10.6464" x2="30.6464" y2="0.646448" stroke="#0D4CF5" />
              <line x1="60.6464" y1="10.6464" x2="70.6464" y2="0.646448" stroke="#0D4CF5" />
              <line x1="30.6464" y1="10.6464" x2="40.6464" y2="0.646448" stroke="#0D4CF5" />
              <line x1="70.6464" y1="10.6464" x2="80.6464" y2="0.646448" stroke="#0D4CF5" />
            </svg>
            <div style={{ background: '#0D4CF5', width: '10rem', height: '0.0625rem' }}></div>
          </Flex>

          <div className={`${'colorMain'} ${indexStyle.topBoxBg}`}></div>
          <Text className={`${'colorMain'} ${indexStyle.topIntroduce}`}>
            Here, you can trade anything and everything with selected tribes to your advantage. Whether you are a nomad,
            a rockerboy, a netrunner, or a corpo, you can find what you need on the TribeFi. More than just a trading
            platform, it’s a way of unleashing the value of your tribe and your skills. You can join forces with other
            tribes, form alliances and rivalries, and compete for the best deals and the most reputation.
          </Text>
          <div className={` ${indexStyle.topsDeckBlock}`}></div>
        </Flex>
      </div>
      <Flex className="pageBgDecorate" vertical justify={'flex-start'} align={'flex-start'}>
        <HomeTitle title="FEATURE" />

        <Flex className={`${indexStyle.FeatureBox}`} vertical justify={'center'} align={'flex-end'}>
          <div className={`${indexStyle.FeatureBg}`}></div>

          {[
            {
              icon: home_FEATURE1,
              iconHover: home_FEATURE1Hover,
              title1: 'Next-generation',
              title2: 'liquidity protocol',
              info: 'By capitalizing on the value of quantified miners, we aim to maximize the value of outstanding miners, promoting the healthy growth of DeFi projects while ensuring stable returns.',
            },
            {
              icon: home_FEATURE2,
              iconHover: home_FEATURE2Hover,
              title1: 'Combine people',
              title2: '& capital',
              info: 'Linking capital with the user base behind it to realize more alpha arbitrage opportunities. Obtaining opportunities for communication within high-quality private circles.',
            },
          ].map(({ icon, iconHover, title1, title2, info }, idx) => (
            <Flex
              className={`${indexStyle.FeatureItem}`}
              style={{
                marginBottom: idx != 2 ? '1.88rem' : '0',
              }}
              vertical
              justify={'center'}
              align={'flex-start'}
            >
              <svg
                style={{ position: 'absolute', left: 0, bottom: 'calc((100% - 256px) / 2)' }}
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="256"
                viewBox="0 0 5 256"
                fill="none"
              >
                <rect y="3.05176e-05" width="1" height="256" fill="black" />
                <rect x="1" y="77" width="4" height="102" fill="black" />
              </svg>
              <svg
                style={{ position: 'absolute', right: 0, bottom: 'calc((100% - 256px) / 2)' }}
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                height="256"
                viewBox="0 0 5 256"
                fill="none"
              >
                <rect width="1" height="256" transform="matrix(-1 0 0 1 5 3.05176e-05)" fill="black" />
                <rect width="4" height="102" transform="matrix(-1 0 0 1 4 77)" fill="black" />
              </svg>
              <Flex vertical={false} justify={'flex-start'} align={'flex-start'}>
                <Flex className="mr3" justify={'center'} align={'center'}>
                  <div className={`${indexStyle.FeatureIcon}`}>
                    <Image width={'3.31rem'} src={icon} preview={false} />
                  </div>
                  <div className={`${indexStyle.FeatureHoverIcon}`}>
                    <Image
                      className={`${indexStyle.FeatureHoverIcon}`}
                      width={'3.31rem'}
                      src={iconHover}
                      preview={false}
                    />
                  </div>
                </Flex>
                <Flex vertical justify={'center'} align={'flex-start'}>
                  <Text className="font1p75 colorBlack" style={{ fontWeight: '700' }}>
                    {title1}
                  </Text>
                  <Text className="font1p75 colorBlack mb1" style={{ fontWeight: '700' }}>
                    {title2}
                  </Text>
                  <Text className="font1p25 colorBlack">{info}</Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>

        <HomeTitle title="How it works" />

        <Image
          width={'100%'}
          style={{ padding: '2.44rem 2.5rem 0.94rem 2.5rem', marginBottom: '4.75rem' }}
          src={howitworks}
          preview={false}
        />

        <HomeTitle title="Use Cases" />

        <Flex
          style={{ padding: '6.59rem 2.5rem 10.34rem 2.5rem', width: '100%' }}
          vertical
          justify={'center'}
          align={'flex-start'}
        >
          <Flex
            className={`${indexStyle.FeaturesBox}`}
            style={{ width: '100%' }}
            vertical={false}
            justify={'space-between'}
            align={'stretch'}
          >
            {[
              {
                title1: 'Earning ',
                info: 'stablecoins while releasing LST liquidity without affecting users holding ETH on Blast.',
                img: home_cases1,
              },
              {
                title1: 'High-quality ',
                info: 'DeFi community enabling interaction with creators by holding certain creator slots, acquiring new knowledge, and completing investments.',
                img: home_cases2,
              },
              {
                title1: 'P2P ',
                info: 'Dex facilitating Join exchanges between users with zero slippage.',
                img: home_cases3,
              },
              {
                title1: 'Social ',
                info: 'liquidity protocol collaborating with other emerging DeFi protocols to gain returns from emerging DeFi. ',
                img: home_cases4,
              },
            ].map(({ title1, info, img }) => (
              <Flex className={`${indexStyle.FeaturesItem}`} vertical={false} justify={'flex-start'} align={'center'}>
                <Image className={`${indexStyle.FeaturesItemIcon}`} height={'100%'} src={img} preview={false} />
                <Flex
                  className={`${indexStyle.FeaturesItemBorder}`}
                  style={{ height: '100%' }}
                  vertical={false}
                  justify={'flex-start'}
                  align={'center'}
                >
                  <Text className={`${'font1p1 colorBlack ml1'} ${indexStyle.FeaturesItemText}`}>
                    <span>{title1}</span>
                    {info}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
