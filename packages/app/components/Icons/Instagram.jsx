import * as React from 'react';
import Svg, { G, Path, Defs, RadialGradient, Stop, ClipPath } from 'react-native-svg';

function InstagramIcon(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_2166_12926)">
        <Path
          d="M20.231 25.986L5.794 26c-3.176.003-5.777-2.593-5.78-5.769L0 5.794C-.003 2.618 2.593.017 5.769.014L20.206 0c3.176-.003 5.777 2.593 5.78 5.769L26 20.206c.004 3.177-2.593 5.777-5.769 5.78z"
          fill="url(#paint0_radial_2166_12926)"
        />
        <Path
          d="M20.231 25.986L5.794 26c-3.176.003-5.777-2.593-5.78-5.769L0 5.794C-.003 2.618 2.593.017 5.769.014L20.206 0c3.176-.003 5.777 2.593 5.78 5.769L26 20.206c.004 3.177-2.593 5.777-5.769 5.78z"
          fill="url(#paint1_radial_2166_12926)"
        />
        <Path
          d="M13 18.053A5.059 5.059 0 017.947 13 5.059 5.059 0 0113 7.948 5.059 5.059 0 0118.053 13 5.059 5.059 0 0113 18.053zm0-8.662c-1.99 0-3.609 1.62-3.609 3.61 0 1.99 1.619 3.609 3.61 3.609 1.99 0 3.608-1.62 3.608-3.61 0-1.99-1.619-3.609-3.609-3.609zM18.413 8.67a1.083 1.083 0 100-2.166 1.083 1.083 0 000 2.165z"
          fill="#fff"
        />
        <Path
          d="M17.332 22.384H8.669a5.059 5.059 0 01-5.052-5.053V8.67a5.059 5.059 0 015.052-5.053h8.663a5.059 5.059 0 015.052 5.053v8.662a5.059 5.059 0 01-5.052 5.053zM8.669 5.06c-1.99 0-3.609 1.62-3.609 3.61v8.661c0 1.99 1.62 3.61 3.61 3.61h8.662c1.99 0 3.609-1.62 3.609-3.61V8.67c0-1.99-1.62-3.609-3.61-3.609H8.67z"
          fill="#fff"
        />
      </G>
      <Defs>
        <RadialGradient
          id="paint0_radial_2166_12926"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(9.665 26.019) scale(32.4099)"
        >
          <Stop stopColor="#FD5" />
          <Stop offset={0.328} stopColor="#FF543F" />
          <Stop offset={0.348} stopColor="#FC5245" />
          <Stop offset={0.504} stopColor="#E64771" />
          <Stop offset={0.643} stopColor="#D53E91" />
          <Stop offset={0.761} stopColor="#CC39A4" />
          <Stop offset={0.841} stopColor="#C837AB" />
        </RadialGradient>
        <RadialGradient
          id="paint1_radial_2166_12926"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(21.5202 0 0 14.3389 4.184 -.325)"
        >
          <Stop stopColor="#4168C9" />
          <Stop offset={0.999} stopColor="#4168C9" stopOpacity={0} />
        </RadialGradient>
        <ClipPath id="clip0_2166_12926">
          <Path fill="#fff" d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default InstagramIcon;
