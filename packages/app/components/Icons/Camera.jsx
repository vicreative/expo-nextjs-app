import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CameraPlusOutline({ stroke = colors.base.white, strokeWidth = 1.5, ...rest }) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Path
        d="M33 17.25v4.65c0 3.36 0 5.04-.654 6.324a6 6 0 01-2.622 2.622c-1.284.654-2.964.654-6.324.654H12.6c-3.36 0-5.04 0-6.324-.654a6 6 0 01-2.622-2.622C3 26.94 3 25.26 3 21.9v-7.8c0-3.36 0-5.04.654-6.324a6 6 0 012.622-2.622C7.56 4.5 9.24 4.5 12.6 4.5h6.15M28.5 12V3M24 7.5h9M24 18a6 6 0 11-12 0 6 6 0 0112 0z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CameraPlusOutline;
