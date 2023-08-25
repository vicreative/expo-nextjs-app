import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function PasscodeLockIcon({ stroke = colors.primary[700], strokeWidth = 2, ...rest }) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Path
        d="M36.667 18.333v-4.666c0-1.867 0-2.8-.364-3.514a3.333 3.333 0 00-1.456-1.456c-.713-.364-1.647-.364-3.514-.364H8.667c-1.867 0-2.8 0-3.514.364-.627.32-1.137.83-1.456 1.456-.364.713-.364 1.647-.364 3.514v6c0 1.866 0 2.8.364 3.513.32.627.83 1.137 1.456 1.457C5.866 25 6.8 25 8.667 25h9.666M20 16.667h.008m8.325 0h.009m-16.675 0h.008m20.408 11.666v-2.916a2.917 2.917 0 00-5.833 0v2.916m-5.833-11.666a.417.417 0 11-.834 0 .417.417 0 01.834 0zm8.333 0a.417.417 0 11-.833 0 .417.417 0 01.833 0zm-16.667 0a.417.417 0 11-.833 0 .417.417 0 01.833 0zM26 35h6.333c.934 0 1.4 0 1.757-.182.314-.16.569-.414.728-.728.182-.357.182-.823.182-1.757V31c0-.933 0-1.4-.182-1.757a1.667 1.667 0 00-.728-.728c-.357-.182-.823-.182-1.757-.182H26c-.933 0-1.4 0-1.757.182-.313.16-.568.415-.728.728-.182.357-.182.824-.182 1.757v1.333c0 .934 0 1.4.182 1.757.16.313.415.568.728.728C24.6 35 25.067 35 26 35z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
