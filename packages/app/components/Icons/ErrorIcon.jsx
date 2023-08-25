import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ErrorIcon(props) {
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
        fill="#FEF3F2"
      />
      <Path
        d="M50.523 36.477L36.477 50.523m0-14.047l14.047 14.047M66.912 43.5c0 12.93-10.482 23.411-23.412 23.411S20.09 56.43 20.09 43.5c0-12.93 10.481-23.412 23.411-23.412 12.93 0 23.412 10.482 23.412 23.412z"
        stroke="#D92D20"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ErrorIcon;
