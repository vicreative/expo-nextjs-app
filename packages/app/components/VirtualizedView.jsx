import { Box, FlatList } from 'native-base';
import React, { forwardRef } from 'react';
import { Platform } from 'react-native';

const VirtualizedView = forwardRef(({ children, ...rest }, ref) => {
  if (Platform.OS === 'web') {
    return <Box ref={ref}>{children}</Box>;
  }
  return (
    <FlatList
      data={[]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ref={ref}
      ListHeaderComponent={() => <React.Fragment>{children}</React.Fragment>}
      {...rest}
    />
  );
});
export default VirtualizedView;
