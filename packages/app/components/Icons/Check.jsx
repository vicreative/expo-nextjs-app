import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

export const CheckSuccessFilled = props => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={20} height={20} rx={10} fill="#D1FADF" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.247 6.158l-5.966 5.759-1.584-1.692c-.291-.275-.75-.292-1.083-.058a.764.764 0 00-.217 1.008l1.875 3.05c.184.283.5.458.859.458.341 0 .666-.175.85-.458.3-.392 6.025-7.217 6.025-7.217.75-.766-.159-1.441-.759-.858v.008z"
        fill="#039855"
      />
    </Svg>
  );
};
