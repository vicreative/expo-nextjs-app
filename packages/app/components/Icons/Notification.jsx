import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

export function NotificationTextIcon({
  fill = colors.success[100],
  stroke = colors.success[600],
  strokeWidth = 1.5,
  ...rest
}) {
  return (
    <Svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Rect x={4} y={4} width={48} height={48} rx={24} fill={fill} />
      <Path
        d="M27 20h-3.2c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.311 1.311C19 22.28 19 23.12 19 24.8v7.4c0 1.68 0 2.52.327 3.162a3 3 0 001.311 1.311C21.28 37 22.12 37 23.8 37h7.4c1.68 0 2.52 0 3.162-.327a3 3 0 001.311-1.311C36 34.72 36 33.88 36 32.2V29m-7 4h-6m8-4h-8m13.121-9.121a3 3 0 11-4.242 4.242 3 3 0 014.242-4.242z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={4}
        y={4}
        width={48}
        height={48}
        rx={24}
        stroke={colors.success[50]}
        strokeWidth={8}
      />
    </Svg>
  );
}
