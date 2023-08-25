import spacing from 'app/config/theme/spacing';
import { Box, Popover, Text, Tooltip as NBTooltip } from 'native-base';
import Button from './Button';

export default function Tooltip({
  label,
  children,
  width = `${spacing[16]}px`,
  height = `${spacing[16]}px`,
  btnProps = {},
  ...rest
}) {
  return (
    <>
      <Box display={{ base: 'none', xl: 'flex' }}>
        <NBTooltip label={label} {...rest}>
          <Button p={0} variant="naked" width={width} height={height} {...btnProps}>
            {children}
          </Button>
        </NBTooltip>
      </Box>

      <Box display={{ base: 'flex', xl: 'none' }}>
        <Popover
          placement="bottom right"
          offset={spacing[10]}
          trigger={triggerProps => {
            return (
              <Button
                {...triggerProps}
                p={0}
                variant="naked"
                width={width}
                height={height}
                {...btnProps}
              >
                {children}
              </Button>
            );
          }}
          {...rest}
        >
          <Popover.Content
            bg="gray.600"
            px={`${spacing[12]}px`}
            py={`${spacing[8]}px`}
            borderRadius={`${spacing[8]}px`}
            borderWidth={0}
          >
            <Text color="white">{label}</Text>
          </Popover.Content>
        </Popover>
      </Box>
    </>
  );
}
