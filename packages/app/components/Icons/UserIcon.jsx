import * as React from 'react';
import colors from 'app/config/theme/colors';
import Svg, { Path } from 'react-native-svg';

export const UserOutlinedIcon = ({ stroke = colors.gray[300], strokeWidth = 1.6, ...rest }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...rest}
  >
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M12.12 12.78a.963.963 0 0 0-.24 0 3.27 3.27 0 0 1-3.16-3.27c0-1.81 1.46-3.28 3.28-3.28a3.276 3.276 0 0 1 .12 6.55Zm6.62 6.6A9.934 9.934 0 0 1 12 22c-2.6 0-4.96-.99-6.74-2.62.1-.94.7-1.86 1.77-2.58 2.74-1.82 7.22-1.82 9.94 0 1.07.72 1.67 1.64 1.77 2.58Z"
    />
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
    />
  </Svg>
);

export const UserFilledIcon = ({ fill = colors.primary[600], ...rest }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...rest}
  >
    <Path
      fill={fill}
      d="M22 12c0-5.51-4.49-10-10-10S2 6.49 2 12c0 2.9 1.25 5.51 3.23 7.34 0 .01 0 .01-.01.02.1.1.22.18.32.27.06.05.11.1.17.14.18.15.38.29.57.43l.2.14c.19.13.39.25.6.36.07.04.15.09.22.13.2.11.41.21.63.3.08.04.16.08.24.11.22.09.44.17.66.24.08.03.16.06.24.08.24.07.48.13.72.19.07.02.14.04.22.05.28.06.56.1.85.13.04 0 .08.01.12.02.34.03.68.05 1.02.05.34 0 .68-.02 1.01-.05.04 0 .08-.01.12-.02.29-.03.57-.07.85-.13.07-.01.14-.04.22-.05.24-.06.49-.11.72-.19.08-.03.16-.06.24-.08.22-.08.45-.15.66-.24.08-.03.16-.07.24-.11.21-.09.42-.19.63-.3.08-.04.15-.09.22-.13.2-.12.4-.23.6-.36.07-.04.13-.09.2-.14.2-.14.39-.28.57-.43.06-.05.11-.1.17-.14.11-.09.22-.18.32-.27 0-.01 0-.01-.01-.02C20.75 17.51 22 14.9 22 12Zm-5.06 4.97c-2.71-1.82-7.15-1.82-9.88 0-.44.29-.8.63-1.1 1A8.48 8.48 0 0 1 3.5 12c0-4.69 3.81-8.5 8.5-8.5 4.69 0 8.5 3.81 8.5 8.5 0 2.32-.94 4.43-2.46 5.97-.29-.37-.66-.71-1.1-1Z"
    />
    <Path
      fill={fill}
      d="M12 6.93c-2.07 0-3.75 1.68-3.75 3.75 0 2.03 1.59 3.68 3.7 3.74h.18a3.743 3.743 0 0 0 3.62-3.74c0-2.07-1.68-3.75-3.75-3.75Z"
    />
  </Svg>
);

export const UsersIcon = ({ stroke = colors.gray[500], strokeWidth = 1.5, ...rest }) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Path
        d="M14.706 13.01c1.142.573 2.12 1.494 2.835 2.645.142.228.213.341.237.5.05.32-.17.714-.468.841-.147.063-.313.063-.643.063m-3.53-7.426a3.53 3.53 0 000-6.325M11.57 6.471a3.53 3.53 0 11-7.06 0 3.53 3.53 0 017.06 0zm-8.973 8.97c1.25-1.877 3.223-3.088 5.443-3.088 2.22 0 4.194 1.211 5.444 3.089.274.411.411.617.395.88a.87.87 0 01-.31.578c-.21.159-.498.159-1.076.159H3.586c-.577 0-.866 0-1.076-.159a.87.87 0 01-.31-.578c-.015-.263.122-.469.396-.88z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export function UserCircle({ stroke = colors.gray[400], ...rest }) {
  return (
    <Svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Path
        d="M13.29 48.597a10.003 10.003 0 019.21-6.096h15c4.138 0 7.688 2.513 9.21 6.096M40 23.751c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10zm15 6.25c0 13.807-11.193 25-25 25s-25-11.193-25-25S16.193 5 30 5s25 11.193 25 25z"
        stroke={stroke}
        strokeWidth={5.01}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
