import type { GetProps } from 'antd';

import Icon from '@ant-design/icons';

type CustomIconComponentProps = GetProps<typeof Icon>;

const TelegramSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
    <path
      d="M1.47138 9.36366L15.7674 3.47347C17.1786 2.85991 21.9643 0.896507 21.9643 0.896507C21.9643 0.896507 24.1732 0.0375207 23.9891 2.12363C23.9277 2.98262 23.4369 5.98907 22.946 9.24095L21.4121 18.8739C21.4121 18.8739 21.2894 20.2851 20.2464 20.5305C19.2033 20.7759 17.4853 19.6715 17.1786 19.4261C16.9331 19.242 12.5769 16.481 10.9816 15.1311C10.5521 14.763 10.0612 14.0267 11.0429 13.1677C13.2518 11.143 15.8901 8.62739 17.4853 7.03213C18.2216 6.29585 18.9579 4.57788 15.8901 6.66399L7.23886 12.4928C7.23886 12.4928 6.25716 13.1064 4.41648 12.5542C2.57579 12.002 0.428324 11.2657 0.428324 11.2657C0.428324 11.2657 -1.04423 10.3454 1.47138 9.36366Z"
      fill="#828282"
    />
  </svg>
);
const TwitterSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <g clip-path="url(#clip0_650_882)">
      <path
        d="M11.9027 9.07392L19.3482 0.419189H17.5838L11.119 7.93397L5.95547 0.419189H0L7.8082 11.7829L0 20.8587H1.76443L8.59152 12.9228L14.0445 20.8587H20L11.9023 9.07392H11.9027ZM9.48608 11.883L8.69495 10.7514L2.40018 1.74743H5.11025L10.1902 9.01394L10.9813 10.1455L17.5847 19.5909H14.8746L9.48608 11.8834V11.883Z"
        fill="#828282"
      />
    </g>
    <defs>
      <clipPath id="clip0_650_882">
        <rect width="20" height="20.45" fill="white" transform="translate(0 0.418579)" />
      </clipPath>
    </defs>
  </svg>
);

export const TelegramLogo = (props: Partial<CustomIconComponentProps>) => <Icon component={TelegramSvg} {...props} />;

export const TwitterLogo = (props: Partial<CustomIconComponentProps>) => <Icon component={TwitterSvg} {...props} />;
