import React, { forwardRef } from 'react';
import { Platform } from 'react-native';
import { FlatList } from 'native-base';

let SHFlashList;

if (Platform.OS !== 'web') {
  SHFlashList = require('@shopify/flash-list').FlashList;
}

const FlashList = forwardRef(({ data, ...rest }, ref) => {
  if (Platform.OS === 'web') {
    return <FlatList data={data} ref={ref} {...rest} />;
  }
  return <SHFlashList data={data} ref={ref} {...rest} />;
});
export default FlashList;
