import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SuccessIcon(props) {
  return (
    <Svg
      width={87}
      height={87}
      viewBox="0 0 87 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.5 87C67.524 87 87 67.524 87 43.5S67.524 0 43.5 0 0 19.476 0 43.5 19.476 87 43.5 87z"
        fill="#ECFDF3"
      />
      <Path
        d="M66.912 41.36v2.153a23.41 23.41 0 11-13.883-21.398m13.883 2.656L43.5 48.206l-7.023-7.024"
        stroke="#039855"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SuccessIcon;
