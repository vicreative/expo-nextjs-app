import colors from 'app/config/theme/colors';
import * as React from 'react';
import Svg, { G, Path, Defs, LinearGradient, Stop, Rect, ClipPath } from 'react-native-svg';

export function TransparentHalfGlobe(props) {
  return (
    <Svg
      width={215}
      height={142}
      viewBox="0 0 215 142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G opacity={0.1}>
        <Path
          d="M100.5 3c33.45 22.3 43.739 70.156 44.6 111.5-.861 41.344-11.15 89.2-44.6 111.5-33.45-22.3-43.739-70.156-44.6-111.5.861-41.344 11.15-89.2 44.6-111.5z"
          fill="url(#paint0_linear_1978_12195)"
        />
        <Path
          d="M100.5 226c61.58 0 111.5-49.92 111.5-111.5S162.08 3 100.5 3-11 52.92-11 114.5 38.92 226 100.5 226z"
          fill="url(#paint1_linear_1978_12195)"
        />
        <Path
          d="M212 114.5c-22.3 33.45-70.156 43.739-111.5 44.6-41.344-.861-89.2-11.15-111.5-44.6 22.3-33.45 70.156-43.739 111.5-44.6 41.344.861 89.2 11.15 111.5 44.6z"
          fill="url(#paint2_linear_1978_12195)"
        />
        <Path
          d="M100.5 3c33.45 22.3 43.739 70.156 44.6 111.5-.861 41.344-11.15 89.2-44.6 111.5m0-223C67.05 25.3 56.761 73.156 55.9 114.5c.861 41.344 11.15 89.2 44.6 111.5m0-223C38.92 3-11 52.92-11 114.5M100.5 3C162.08 3 212 52.92 212 114.5M100.5 226c61.58 0 111.5-49.92 111.5-111.5M100.5 226C38.92 226-11 176.08-11 114.5m223 0c-22.3 33.45-70.156 43.739-111.5 44.6-41.344-.861-89.2-11.15-111.5-44.6m223 0c-22.3-33.45-70.156-43.739-111.5-44.6-41.344.861-89.2 11.15-111.5 44.6"
          stroke="#F9F5FF"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1978_12195"
          x1={100.5}
          y1={3}
          x2={100.5}
          y2={226}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F3EAFF" stopOpacity={0} />
          <Stop offset={0.765625} stopColor="#E9D9FD" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1978_12195"
          x1={100.5}
          y1={3}
          x2={100.5}
          y2={226}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F3EAFF" stopOpacity={0} />
          <Stop offset={0.765625} stopColor="#E9D9FD" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1978_12195"
          x1={100.5}
          y1={3}
          x2={100.5}
          y2={226}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F3EAFF" stopOpacity={0} />
          <Stop offset={0.765625} stopColor="#E9D9FD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export function Globe({ stroke = colors.gray[500], strokeWidth = 1.5, ...rest }) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <G clipPath="url(#clip0_3353_5800)">
        <Path
          d="M11.25 1.843a7.5 7.5 0 104.355 3.601M12.75 4.314h.004M7.875 16.416v-1.652c0-.09.032-.176.09-.244l1.865-2.175a.375.375 0 00-.099-.57L7.59 10.55a.375.375 0 01-.14-.14L6.053 7.964a.375.375 0 00-.36-.188l-4.145.37M15.75 4.5c0 1.657-1.5 3-3 4.5-1.5-1.5-3-2.843-3-4.5a3 3 0 116 0zm-2.813-.188a.187.187 0 11-.374 0 .187.187 0 01.374 0z"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3353_5800">
          <Rect width={18} height={18} rx={8} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
