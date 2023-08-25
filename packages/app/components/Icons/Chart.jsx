import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

export const LineChartIcon = ({ stroke = colors.gray[500], strokeWidth = 1.5, ...rest }) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <G clipPath="url(#clip0_1293_15317)">
        <Path
          d="M15 8.333l-2.862 2.862c-.165.165-.247.248-.342.279a.416.416 0 01-.258 0c-.095-.031-.177-.114-.342-.279l-2.39-2.39c-.166-.165-.248-.248-.344-.279a.417.417 0 00-.257 0c-.095.031-.178.114-.343.279L5 11.667M18.334 10a8.333 8.333 0 11-16.667 0 8.333 8.333 0 0116.667 0z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1293_15317">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
