import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function TrippleStar({ stroke = colors.gray[500], strokeWidth = 1.5, ...rest }) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Path
        d="M3.578 16.5v-3.75m0-7.5V1.5M1.59 3.375h3.976M1.59 14.625h3.976M10.337 2.25L8.958 5.632c-.224.55-.336.825-.51 1.056a2.323 2.323 0 01-.562.53c-.245.164-.537.27-1.12.481L3.181 9l3.585 1.3c.583.212.875.318 1.12.482.217.146.407.325.562.53.174.232.286.506.51 1.056l1.38 3.382 1.378-3.382c.225-.55.337-.825.511-1.056.155-.205.345-.384.562-.53.245-.164.537-.27 1.12-.481L17.494 9l-3.585-1.3c-.584-.212-.875-.318-1.12-.482a2.325 2.325 0 01-.562-.53c-.174-.231-.286-.506-.51-1.056l-1.38-3.382z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
