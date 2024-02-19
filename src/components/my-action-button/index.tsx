import type { ButtonProps } from 'antd';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Flex, Modal } from 'antd';
import React, { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

export const MyActionButton = ({
  title,
  balance,
  tokenType,
  total,
  disabled,
  onClick,
  loading,
  ...rest
}: ButtonProps) => {
  const { isConnected } = useAccount(); // 连接
  //const { balance } = useBalance(); // 余额
  //const [type, seType] = useState(type); Evolve  Dissolve
  // total

  const { openConnectModal } = useConnectModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isConnected ? (
        title ? (
          <Button className="btn" type="primary" size="large" disabled={disabled} block>
            {title}
          </Button>
        ) : !tokenType ? (
          <Button className="btn disableBtn" type="primary" size="large" block disabled>
            Select Token
          </Button>
        ) : total < balance ? (
          <>
            <Button
              className="btn"
              style={
                loading
                  ? {
                      background: '#463122',
                      color: '#F27C14',
                      border: '1px solid  #463122',
                    }
                  : {}
              }
              type="primary"
              size="large"
              disabled={disabled}
              loading={loading}
              onClick={e => {
                e.stopPropagation();
                onClick?.(e as any);
                //showModal();
              }}
              block
            >
              Transfer
            </Button>
            <Button
              className="btn subBtn"
              style={{ margin: '1rem 0' }}
              type="primary"
              size="large"
              disabled={disabled}
              block
            >
              Add Liquidity
            </Button>
          </>
        ) : (
          <Button className="btn disableBtn" type="primary" size="large" block disabled>
            Insufficient ETH balance
          </Button>
        )
      ) : (
        <Button className="btn" type="primary" size="large" block onClick={openConnectModal}>
          Connect Wallet
        </Button>
      )}
      <Modal
        title=""
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => <></>}
      >
        <div style={{ width: '100%', height: '3.5rem' }}></div>
        <Flex
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          vertical
          justify={'center'}
          align={'center'}
        >
          {modalStatus == 0 ? (
            <>
              <div className="rotateAni mb0p75" style={{ width: '5.875rem', height: '5.875rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 106" fill="none">
                  <g filter="url(#filter0_d_1_3409)">
                    <path
                      d="M91.0738 24.9268C94.0892 29.0899 96.4677 33.8225 98.0254 39.0254C105.47 63.8922 91.3472 90.086 66.4803 97.531C41.6135 104.976 15.4197 90.8528 7.97469 65.986C0.529724 41.1192 14.6529 14.9253 39.5197 7.48032C43.6661 6.23892 47.8494 5.59719 51.9765 5.50494"
                      stroke="#F27C14"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1_3409"
                      x="0.487305"
                      y="0.00494385"
                      width="105.026"
                      height="105.013"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.94902 0 0 0 0 0.486275 0 0 0 0 0.0784314 0 0 0 1 0"
                      />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3409" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3409" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="font1 colorW">Waiting for confirmation...</div>
              <div className="font1 colorW mb0p38">Swapping 0.01 ETH for 19.1106 DAI</div>
              <div className="font0p75 colorGrey mb2p5">Confirm this transaction in vour wallet</div>
            </>
          ) : modalStatus == 1 || modalStatus == 2 ? (
            <>
              <div className="mb0p75" style={{ width: '5.875rem', height: '5.875rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <g filter="url(#filter0_d_1_3555)">
                    <path
                      d="M38.3333 46.1111L50 34.4444M50 34.4444L61.6666 46.1111M50 34.4444L50 65.5556M50 15C69.3299 15 85 30.67 85 50C85 69.33 69.3299 85 50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15Z"
                      stroke="url(#paint0_linear_1_3555)"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1_3555"
                      x="9.49996"
                      y="9.5"
                      width="81"
                      height="81"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.94902 0 0 0 0 0.486275 0 0 0 0 0.0784314 0 0 0 1 0"
                      />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3555" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3555" result="shape" />
                    </filter>
                    <linearGradient
                      id="paint0_linear_1_3555"
                      x1="50"
                      y1="15"
                      x2="50"
                      y2="85"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F27C14" />
                      <stop offset="1" stop-color="#F5B277" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="font1 colorO mb0p5" style={{ textShadow: '0px 0px 4px #F27C14' }}>
                Transaction submitted
              </div>
              {modalStatus == 1 ? (
                <>
                  <Button
                    className="btn subBtn font0p75 mb0p75"
                    style={{ width: 'auto', padding: '0.75rem 1rem', fontSize: '0.75rem' }}
                    type="primary"
                    size="large"
                    block
                  >
                    Added Token
                  </Button>
                  <Button
                    className="btn font1 mb0p75"
                    style={{
                      width: '90%',
                      padding: '0.75rem 1rem',
                      margin: '1rem',
                      boxShadow: '0px 0px 4px 0px #F27C14',
                    }}
                    type="primary"
                    size="large"
                    block
                  >
                    CONFIRM
                  </Button>
                </>
              ) : modalStatus == 2 ? (
                <>
                  <Button
                    className="btn subBtn colorGrey font0p75 mb0p75"
                    style={{
                      width: 'auto',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      color: '#828282',
                      border: '1.358px solid #828282',
                    }}
                    type="primary"
                    size="large"
                    block={false}
                  >
                    Added Token
                    <div style={{ width: '1.25rem', height: '1.25rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="none">
                        <path
                          d="M7.66667 10.5L9.22222 12.0556L12.3333 8.94444M17 10.5C17 14.366 13.866 17.5 10 17.5C6.13401 17.5 3 14.366 3 10.5C3 6.63401 6.13401 3.5 10 3.5C13.866 3.5 17 6.63401 17 10.5Z"
                          stroke="#4F4F4F"
                          stroke-width="1.67"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </Button>
                  <Button
                    className="btn font1 mb0p75"
                    style={{
                      width: '90%',
                      padding: '0.75rem 1rem',
                      margin: '1rem',
                      boxShadow: '0px 0px 4px 0px #F27C14',
                    }}
                    type="primary"
                    size="large"
                    block
                  >
                    Confirm
                  </Button>
                </>
              ) : (
                <></>
              )}

              <div
                className="font0p75 colorGrey mb2p5"
                style={{ textDecoration: 'underline', userSelect: 'none', cursor: 'pointer' }}
              >
                View on Block Explorer
              </div>
            </>
          ) : (
            <></>
          )}
        </Flex>
      </Modal>
    </>
  );
};
