import spacing from 'app/config/theme/spacing';
import { Text } from 'native-base';

function AmountText({
  fontSize = spacing[30],
  fontFamily = 'Satoshi-Bold',
  amount = '0.00',
  ...rest
}) {
  return (
    amount && (
      <Text fontSize={`${fontSize}px`} fontFamily={fontFamily} {...rest}>
        {amount.split('.')[0]}
        <Text
          fontSize={`${fontSize / 2 + spacing[3]}px`}
          fontFamily={fontFamily}
          lineHeight={`${fontSize + spacing[8]}px`}
          {...rest}
        >
          .{amount.split('.')[1]}
        </Text>
      </Text>
    )
  );
}

export default AmountText;
