import * as React from 'react';
import colors from 'app/config/theme/colors';
import Svg, { Path } from 'react-native-svg';

export const CalendarOutlinedIcon = ({ fill = colors.gray[300], ...rest }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...rest}
  >
    <Path
      fill={fill}
      d="M8 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75Zm8 0c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75ZM8.5 14.5c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.44-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.36-.15.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29Zm3.5 0c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.44-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.36-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29Zm3.5 0c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21l-.12-.15a.757.757 0 0 1-.09-.18.636.636 0 0 1-.06-.18c-.01-.07-.02-.14-.02-.2 0-.26.11-.52.29-.71.1-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29Zm-7 3.5c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.37-.37 1.05-.37 1.42 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29Zm3.5 0c-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.37-.37 1.05-.37 1.42 0 .09.09.16.2.21.33.05.12.08.25.08.38 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29Zm3.5 0c-.26 0-.52-.11-.71-.29a.933.933 0 0 1-.21-.33.995.995 0 0 1-.08-.38c0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.23-.23.58-.34.9-.27.07.01.13.03.19.06.06.02.12.05.18.09.05.03.1.08.15.12.18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29Zm5-8.16h-17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h17c.41 0 .75.34.75.75s-.34.75-.75.75Z"
    />
    <Path
      fill={fill}
      d="M16 22.75H8c-3.65 0-5.75-2.1-5.75-5.75V8.5c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75V17c0 3.65-2.1 5.75-5.75 5.75ZM8 4.25c-2.86 0-4.25 1.39-4.25 4.25V17c0 2.86 1.39 4.25 4.25 4.25h8c2.86 0 4.25-1.39 4.25-4.25V8.5c0-2.86-1.39-4.25-4.25-4.25H8Z"
    />
  </Svg>
);

export const CalendarFilledIcon = ({ fill = colors.primary[600], ...rest }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...rest}
  >
    <Path
      fill={fill}
      d="M18.05 3.03h-.16v-.28c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.28H7.61v-.28a.749.749 0 1 0-1.5 0v.28h-.16C3.77 3.03 2 4.8 2 6.98v11.07C2 20.23 3.77 22 5.95 22h12.1c2.18 0 3.95-1.77 3.95-3.95V6.98c0-2.18-1.77-3.95-3.95-3.95ZM6 18.97c-.55 0-1-.44-1-1 0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1Zm0-3.48c-.55 0-1-.45-1-1 0-.56.45-1 1-1s1 .44 1 1c0 .55-.45 1-1 1ZM6 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm4 6.97c-.55 0-1-.44-1-1 0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1Zm0-3.48c-.55 0-1-.45-1-1 0-.56.45-1 1-1s1 .44 1 1c0 .55-.45 1-1 1ZM10 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm4 6.97c-.55 0-1-.44-1-1 0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1Zm0-3.48c-.55 0-1-.45-1-1 0-.56.45-1 1-1s1 .44 1 1c0 .55-.45 1-1 1ZM14 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm4 3.49c-.55 0-1-.45-1-1 0-.56.45-1 1-1s1 .44 1 1c0 .55-.45 1-1 1ZM18 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm2.5-4.85h-17v-.17c0-1.35 1.1-2.45 2.45-2.45h.16v.28c0 .42.34.75.75.75.42 0 .75-.33.75-.75v-.28h8.78v.28a.749.749 0 1 0 1.5 0v-.28h.16c1.35 0 2.45 1.1 2.45 2.45v.17Z"
    />
  </Svg>
);
