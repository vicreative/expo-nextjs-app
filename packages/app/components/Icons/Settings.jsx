import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import colors from 'app/config/theme/colors';

function FilterIcon({ stroke = colors.gray[500], strokeWidth = 1.5, ...rest }) {
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
        d="M3 8h12m0 0a3 3 0 106 0 3 3 0 00-6 0zm-6 8h12M9 16a3 3 0 11-6 0 3 3 0 016 0z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FilterIcon;
