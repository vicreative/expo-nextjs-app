import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { Text } from 'native-base';
import colors from 'app/config/theme/colors';

export default function PinInput({ value, setValue = () => {}, cellCount, hideCode, ...rest }) {
  const CELL_COUNT = cellCount;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [enableMask] = useState(true);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask && hideCode ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[
          {
            width: 64,
            height: 64,
            fontSize: 30,
            borderWidth: 1,
            borderColor: colors.gray[100],
            borderRadius: 8,
            textAlign: 'center',
            justifyContent: 'center',
            lineHeight: 60
          },
          isFocused && {
            borderColor: colors.primary[600],
            borderWidth: 2
          }
        ]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  return (
    <CodeField
      ref={ref}
      {...props}
      {...rest}
      caretHidden={false}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={{ marginTop: 20, marginBottom: 20 }}
      keyboardType="number-pad"
      renderCell={renderCell}
    />
  );
}

// const styles = StyleSheet.create({});
