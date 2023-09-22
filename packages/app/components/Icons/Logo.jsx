import * as React from 'react';
import Svg, { Path, Circle, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';

export function Logo(props) {
  return (
    <Svg
      width={512}
      height={512}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 467.478S3.64 351.351 0 50.087C1.341 25.93 13.653 0 59.164 0h395.947C512 0 512 27.826 512 50.087v417.391S512 512 455.111 512H59.164C0 512 0 467.478 0 467.478z"
        fill="#fff"
      />
      <Circle cx={256} cy={254.862} r={170.667} fill="#3F3F3F" />
      <Path
        d="M198.217 295.148c56.897-31.505 59.173-36.546 113.794-63.011 54.622-26.465 111.519 0 54.622 31.506-56.898 31.505-54.622 31.505-111.519 59.23-56.897 27.726-113.795 3.781-56.897-27.725z"
        fill="url(#paint0_linear_1512_83)"
      />
      <Ellipse
        cx={162.133}
        cy={273.067}
        rx={28.4444}
        ry={28.4444}
        fill="url(#paint1_linear_1512_83)"
      />
      <Ellipse cx={126.862} cy={237.795} rx={14.2222} ry={14.2222} fill="#F2F4F5" />
      <Defs>
        <LinearGradient
          id="paint0_linear_1512_83"
          x1={282.453}
          y1={221.298}
          x2={282.453}
          y2={335.076}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#525E5F" stopOpacity={0.8} />
          <Stop offset={0.515625} stopColor="#6690A2" stopOpacity={0.682292} />
          <Stop offset={0.807292} stopColor="#C1D6D4" />
          <Stop offset={0.875} stopColor="#D9E5E8" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1512_83"
          x1={162.133}
          y1={244.622}
          x2={162.133}
          y2={301.511}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#C6BCD8" stopOpacity={0} />
          <Stop offset={0.630208} stopColor="#E2F5FB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
