import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CreditCardOutline = ({ stroke = colors.gray[500], strokeWidth = 1.5, ...rest }) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Path
        d="M22 10H2m20 1V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C20.48 5 19.92 5 18.8 5H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C2 6.52 2 7.08 2 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C3.52 19 4.08 19 5.2 19h6.3m6.5 2s3-1.43 3-3.575v-2.502l-2.188-.782a2.41 2.41 0 00-1.626 0L15 14.923v2.502C15 19.57 18 21 18 21z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
