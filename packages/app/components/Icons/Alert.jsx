import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const AlertCircle = ({
  fill = colors.gray[100],
  stroke = colors.gray[50],
  iconColor = colors.gray[600],
  strokeWidth = 1.66667,
  ...rest
}) => {
  return (
    <Svg
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Rect x={3} y={3} width={40} height={40} rx={20} fill={fill} />
      <G clipPath="url(#clip0_1_48467)">
        <Path
          d="M23 19.666V23m0 3.333h.008M31.333 23a8.333 8.333 0 11-16.667 0 8.333 8.333 0 0116.667 0z"
          stroke={iconColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Rect x={3} y={3} width={40} height={40} rx={20} stroke={stroke} strokeWidth={6} />
      <Defs>
        <ClipPath id="clip0_1_48467">
          <Path fill="#fff" transform="translate(13 13)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
