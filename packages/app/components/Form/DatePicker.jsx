import colors from 'app/config/theme/colors';
import {
  Text,
  useDisclose,
  Pressable,
  Button,
  Box,
  VStack,
  Hidden,
  Flex,
  Icon,
  HStack,
  Stack
} from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import spacing from 'app/config/theme/spacing';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'app/components/Modal';
import { CalendarOutlinedIcon } from 'app/components/Icons/CalendarIcon';
import { AntDesign } from '@expo/vector-icons';
import useDimensions from 'app/hooks/useDimensions';

let Calendar = function Calendar() {
  return <></>;
};

if (Platform.OS === 'web') {
  Calendar = require('@natscale/react-calendar').Calendar;
}

export default function DatePicker({
  variant = 'outline',
  isInvalid,
  placeholder,
  minDate = new Date(moment(new Date()).subtract(100, 'years')), // 100 YEARS AGO
  maxDate = new Date(moment(new Date()).add(50, 'years')), // 50 YEARS AFTER TODAY
  value = '',
  isDisabled,
  maxWidth,
  width = '100%',
  height = `${spacing[44]}px`,
  fontSize = `${spacing[16]}px`,
  borderRadius,
  dropdownIconSize = `${spacing[18]}px`,
  mode = 'date',
  note,
  tip,
  label,
  tipBtn,
  errorMsg,
  isRangeSelector,
  setIsFocused = () => {},
  dropdownIcon = <CalendarOutlinedIcon width={dropdownIconSize} height={dropdownIconSize} />,
  containerStyle,
  onChange = () => {},
  ...rest
}) {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const {
    screen: { width: SCREEN_WIDTH }
  } = useDimensions();

  const defaultRange = [
    new Date(moment(new Date(minDate)).add(1, 'days')),
    new Date(moment(new Date(minDate)).add(5, 'days'))
  ];

  const handleChange = useCallback(
    (e, value) => {
      setIsPickerShow(Platform.OS === 'ios');
      onChange(value);
    },
    [onChange]
  );

  useEffect(() => {
    if (isRangeSelector && isOpen && value === '') {
      handleChange('date', defaultRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRangeSelector, isOpen, value]);

  const handleOpen = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'web') {
      onOpen();
    }
    if (Platform.OS === 'android') {
      setIsPickerShow(true);
    }
  };

  const disableDates = useCallback(
    date => {
      if (new Date(date) < new Date(minDate) || new Date(date) > new Date(maxDate)) {
        return true;
      }
    },
    [maxDate, minDate]
  );

  const handleClose = () => {
    setIsFocused(false);
    onClose();
  };

  const handleClear = () => {
    if (isRangeSelector) {
      handleChange('date', defaultRange);
    } else {
      handleChange('date', '');
    }
  };

  return (
    <>
      <Box>
        {label && (
          <>
            {/* larger device(tablet & desktop) for web only */}
            <Hidden only="base">
              <Text
                fontFamily="Satoshi-Medium"
                fontSize={`${spacing[14]}px`}
                color="gray.500"
                mb="6px"
              >
                {label}
              </Text>
            </Hidden>
          </>
        )}
        {/* The button that used to trigger date picker */}
        <Pressable
          style={[styles.container(variant, isOpen, isInvalid, isDisabled), containerStyle]}
          onPress={handleOpen}
          px={14}
          isDisabled={isDisabled}
          borderRadius={
            borderRadius
              ? borderRadius
              : variant !== 'unstyled'
              ? variant === 'rounded'
                ? 'full'
                : 8
              : 0
          }
          width={width}
          height={height}
          maxWidth={maxWidth}
        >
          <Text color={value !== '' ? colors.base.black : '#a3a3a3'} fontSize={fontSize}>
            {value !== ''
              ? isRangeSelector
                ? `${moment(value[0]).format('ll')} - ${moment(value[1]).format('ll')}`
                : moment(value).format('ll')
              : placeholder}
          </Text>
          {dropdownIcon}
        </Pressable>
        {tip || isInvalid ? (
          <Text
            fontSize={14}
            color={isInvalid ? 'error.500' : 'gray.300'}
            mt={tip ? `${spacing[10]}px` : `${spacing[4]}px`}
          >
            {isInvalid ? errorMsg : tip}
            {tipBtn}
          </Text>
        ) : null}
      </Box>

      {/* Date picker for web */}
      <Hidden platform={['ios', 'android']}>
        <Modal
          bg="transparent"
          animationType="fade"
          visible={isOpen && Platform.OS === 'web'}
          onClose={handleClose}
          px={`${spacing[24]}px`}
          alignItems="center"
          justifyContent="center"
        >
          <VStack
            width="auto"
            height="auto"
            overflow="scroll"
            bg="white"
            p={`${spacing[24]}px`}
            borderTopRadius={`${spacing[20]}px`}
            borderBottomRadius={`${spacing[20]}px`}
          >
            <Flex position="absolute" top="10px" right="10px" zIndex={10000}>
              <Button variant="unstyled" size="sm" onPress={handleClose}>
                <Icon as={AntDesign} name="close" size={`${spacing[20]}px`} color="gray.300" />
              </Button>
            </Flex>
            <Box>
              <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[18]}px`}>
                {isRangeSelector ? 'Select Dates' : 'Select date'}
              </Text>

              {isRangeSelector ? (
                <HStack
                  mt={`${spacing[20]}px`}
                  space={`${spacing[10]}px`}
                  justifyContent="space-between"
                >
                  <Stack space={`${spacing[4]}px`}>
                    <Text fontSize={`${spacing[14]}px`} color="gray.300">
                      Start Date:
                    </Text>
                    <Text
                      fontFamily="Satoshi-Medium"
                      fontSize={`${spacing[18]}px`}
                      color="gray.400"
                    >
                      {value !== ''
                        ? moment(new Date(value[0])).format('ddd, MMM DD YYYY')
                        : moment(new Date(minDate)).add(1, 'days').format('ddd, MMM DD YYYY')}
                    </Text>
                  </Stack>

                  <Stack space={`${spacing[4]}px`}>
                    <Text fontSize={`${spacing[14]}px`} color="gray.300">
                      End Date:
                    </Text>
                    <Text
                      fontFamily="Satoshi-Medium"
                      fontSize={`${spacing[18]}px`}
                      color="gray.400"
                    >
                      {value !== ''
                        ? moment(new Date(value[1])).format('ddd, MMM DD YYYY')
                        : moment(new Date(minDate)).add(5, 'days').format('ddd, MMM DD YYYY')}
                    </Text>
                  </Stack>
                </HStack>
              ) : (
                <>
                  <Text fontFamily="Satoshi-Medium" fontSize={`${spacing[20]}px`} mt="4px">
                    {value !== ''
                      ? moment(new Date(value)).format('ddd MMM DD, YYYY')
                      : moment(new Date()).format('ddd MMM DD, YYYY')}
                  </Text>
                </>
              )}
            </Box>
            <VStack alignItems="center" justifyContent="center" pt={`${spacing[20]}px`}>
              <Calendar
                startOfWeek={0}
                value={value}
                onChange={val => handleChange('date', val)}
                colorPrimary={colors.primary[600]}
                colorPrimaryLight={colors.primary[50]}
                noPadRangeCell
                isDisabled={disableDates}
                isRangeSelector={isRangeSelector}
                minimumDate={{
                  year: new Date(minDate).getFullYear(),
                  month: new Date(minDate).getMonth() + 1,
                  day: new Date(minDate).getDate()
                }}
                maximumDate={{
                  year: new Date(maxDate).getFullYear(),
                  month: new Date(maxDate).getMonth() + 1,
                  day: new Date(maxDate).getDate()
                }}
                size={SCREEN_WIDTH > 400 ? 340 : SCREEN_WIDTH - 80}
                {...rest}
              />
            </VStack>

            {note && (
              <Text
                fontSize={`${spacing[12]}px`}
                pt={`${spacing[14]}px`}
                color="gray.300"
                maxWidth={SCREEN_WIDTH > 400 ? 340 : SCREEN_WIDTH - 80}
              >
                {note}
              </Text>
            )}

            {/* Buttons */}
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              w="100%"
              pt={`${spacing[30]}px`}
            >
              <Button
                variant="unstyled"
                colorScheme="secondary"
                size="md"
                isDisabled={!value}
                fontFamily="Satoshi-Medium"
                px={0}
                onPress={handleClear}
              >
                Clear
              </Button>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="md"
                fontFamily="Satoshi-Medium"
                px={`${spacing[16]}px`}
                onPress={handleClose}
              >
                Done
              </Button>
            </Flex>
          </VStack>
        </Modal>
      </Hidden>

      {/* Date picker for ios */}
      <Modal
        closeOnOverlayClick
        bg="transparent"
        animationType="fade"
        visible={isOpen && Platform.OS === 'ios'}
        onClose={handleClose}
        maxWidth={{ base: '100%', sm: '424px' }}
        px={0}
        alignItems="center"
        justifyContent={{ base: 'flex-end', sm: 'center' }}
      >
        <VStack
          width="100%"
          height={{ base: 'auto', sm: '400px' }}
          overflow="scroll"
          bg="white"
          p={`${spacing[24]}px`}
          borderTopRadius={`${spacing[20]}px`}
          borderBottomRadius={{ base: 0, sm: `${spacing[20]}px` }}
        >
          <DateTimePicker
            value={value || new Date(Date.now())}
            mode={mode}
            display={'spinner'}
            is24Hour={true}
            onChange={handleChange}
            textColor={colors.base.black}
            minimumDate={minDate}
            maximumDate={maxDate}
            {...rest}
          />
          <Button
            variant="subtle"
            colorScheme="primary"
            size="md"
            alignSelf="flex-end"
            mb={`${spacing[24]}px`}
            onPress={handleClose}
          >
            Done
          </Button>
        </VStack>
      </Modal>

      {/* Date picker for android */}
      {isPickerShow && Platform.OS === 'android' && (
        <DateTimePicker
          value={value || new Date(Date.now())}
          mode={mode}
          display={'default'}
          is24Hour={true}
          onChange={handleChange}
          minimumDate={minDate}
          maximumDate={maxDate}
          {...rest}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: (variant, isOpen, isInvalid, isDisabled) => ({
    backgroundColor: variant === 'filled' ? colors.gray[50] : colors.base.white,
    opacity: isDisabled ? 0.5 : 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: variant === 'unstyled' ? 0 : variant === 'filled' && !isOpen ? 0 : 1,
    borderColor:
      variant !== 'unstyled' && isOpen
        ? isInvalid
          ? colors.error[500]
          : colors.primary[600]
        : isInvalid
        ? colors.error[500]
        : colors.gray[100],
    border:
      variant === 'unstyled'
        ? 'none'
        : variant === 'filled' && !isOpen
        ? 'none'
        : isOpen
        ? isInvalid
          ? `1px solid ${colors.error[500]}`
          : `1px solid ${colors.primary[600]}`
        : isInvalid
        ? `1px solid ${colors.error[500]}`
        : `1px solid ${colors.gray[100]}`,
    boxShadow:
      variant !== 'unstyled' &&
      (isOpen
        ? isInvalid
          ? `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEF3F2`
          : `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F9F5FF`
        : 'none'),
    overflow: 'hidden'
  })
});
