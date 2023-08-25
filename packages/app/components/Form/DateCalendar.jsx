import { AntDesign, Entypo } from '@expo/vector-icons';
import { CalendarOutlinedIcon } from 'app/components/Icons/CalendarIcon';
import Modal from 'app/components/Modal';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import { DAY_NAMES, MONTH_NAMES } from 'constants';
import moment from 'moment';
import { Box, Button, Flex, HStack, Icon, Pressable, Text, View } from 'native-base';
import { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Select from './Select';

const OLD_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 3;

const DateCalendar = ({
  variant = 'outline',
  isInvalid,
  placeholder,
  isDisabled,
  title = 'Select Date',
  dayNames,
  headerFormat = 'ddd, MMM DD',
  monthNames,
  defaultValue = new Date(),
  minDate = new Date(OLD_YEAR, 0, 1),
  maxDate = new Date(MAX_YEAR, 11, 31),
  closeText = 'Save',
  clearText = 'Clear',
  value = '',
  width = '100%',
  height = `${spacing[44]}px`,
  fontSize = `${spacing[16]}px`,
  borderRadius,
  dropdownIconSize = `${spacing[18]}px`,
  dropdownIcon = <CalendarOutlinedIcon width={dropdownIconSize} height={dropdownIconSize} />,
  onChange = () => {},
  containerStyle,
  ...rest
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [calendar, setCalendar] = useState([]);
  const [days] = useState(dayNames?.length === 7 ? dayNames : DAY_NAMES);
  const [months] = useState(monthNames?.length === 12 ? monthNames : MONTH_NAMES);
  const [selectedDate, setSelectedDate] = useState(value !== '' ? value : defaultValue);
  const [month, setMonth] = useState(new Date(selectedDate).getMonth());
  const [year, setYear] = useState(new Date(selectedDate).getFullYear());

  const changeMonth = inc => {
    let curMonth = month + inc;
    let curYear = year;

    if (curMonth === 12) {
      curMonth = 0;
      curYear++;
    } else if (curMonth === -1) {
      curMonth = 11;
      curYear--;
    }

    setMonth(curMonth);
    setYear(curYear);
  };

  const selectDate = useCallback(
    day => {
      setSelectedDate(day);
      setMonth(day.getMonth());
      setYear(day.getFullYear());

      onChange && onChange(moment(new Date(day)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
    },
    [onChange]
  );

  const getHeader = () => {
    const result = moment(selectedDate).format(headerFormat);

    return result;
  };

  const handleClear = () => {
    setSelectedDate(defaultValue);
    onChange && onChange('');
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const firstDayThisMonth = new Date(year, month, 1).getDay();
    const temp = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(year, month, i - firstDayThisMonth + 1);
      temp.push(date);
    }

    setCalendar(temp);
  }, [month, year]);

  useEffect(() => {
    if (value !== '' && value instanceof Date) {
      if (value.getTime() < minDate.getTime()) {
        setMonth(minDate.getMonth());
        setSelectedDate(minDate);
      } else {
        setMonth(value.getMonth());
        setSelectedDate(value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMonths = useCallback((monthName, index) => {
    return {
      label: monthName,
      value: index
    };
  }, []);

  const renderYears = useCallback(
    (_, index) => {
      return {
        label: maxDate.getFullYear() - index,
        value: maxDate.getFullYear() - index
      };
    },
    [maxDate]
  );

  const renderDays = useCallback(day => {
    return (
      <Flex key={day} mx={'4px'} alignItems="center" justifyContent="center" height={28} width={30}>
        <Text fontSize={'12px'} fontFamily="Satoshi-Medium">
          {day.substring(0, 3)}
        </Text>
      </Flex>
    );
  }, []);

  const renderCalendar = useCallback(
    (item, index) => {
      const isSelectedDate =
        selectedDate?.getDate() === item.getDate() &&
        selectedDate?.getMonth() === item.getMonth() &&
        selectedDate?.getYear() === item.getYear();

      const shouldDisabledDates =
        new Date(item) < new Date(minDate) || new Date(item) > new Date(maxDate);

      return (
        <Flex
          p={'8px'}
          alignItems="center"
          justifyContent="center"
          opacity={item.getMonth() === month ? 1 : 0.5}
          key={index}
        >
          <Button
            variant={isSelectedDate ? 'solid' : 'unstyled'}
            colorScheme={isSelectedDate ? 'primary' : 'secondary'}
            onPress={() => {
              selectDate(item);
            }}
            isDisabled={shouldDisabledDates}
            borderRadius="full"
            height={30}
            width={30}
            padding={0}
            size="xs"
          >
            {item.getDate()}
          </Button>
        </Flex>
      );
    },
    [minDate, maxDate, selectedDate, selectDate, month]
  );

  return (
    <>
      {/* The button that used to trigger web && android date picker */}
      <Pressable
        style={[styles.container(variant, modalVisible, isInvalid, isDisabled), containerStyle]}
        onPress={() => {
          setModalVisible(true);
        }}
        px={14}
        isDisabled={isDisabled}
        borderRadius={
          borderRadius
            ? borderRadius
            : variant !== 'unstyled'
            ? variant === 'rounded'
              ? '100%'
              : '8px'
            : '0px'
        }
        width={width}
        height={height}
        {...rest}
      >
        <Text color={value !== '' ? colors.base.black : '#a3a3a3'} fontSize={fontSize}>
          {value !== '' ? moment(value).format('ll') : placeholder}
        </Text>
        {dropdownIcon}
      </Pressable>

      {/* The date picker modal */}
      <Modal
        px="20px"
        animationType="fade"
        visible={modalVisible}
        bg="transparent"
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          borderRadius={20}
          bg="white"
          maxW={'400px'}
          _web={{ maxHeight: '80vh', overflow: 'scroll' }}
        >
          <Flex position="absolute" top="10px" right="10px" zIndex={10000}>
            <Button variant="unstyled" size="sm" onPress={handleClose}>
              <Icon as={AntDesign} name="close" size={`${spacing[20]}px`} color="gray.300" />
            </Button>
          </Flex>
          <View m={16}>
            <Text fontFamily="Satoshi-Medium" color={colors.gray[400]}>
              {title}
            </Text>
            <Text fontFamily="Satoshi-Medium" fontSize={20} mt={8} color={colors.base.black}>
              {getHeader()}
            </Text>
            <Text fontFamily="Satoshi-Medium" fontSize={16} color={colors.base.black}>
              {selectedDate ? selectedDate.getFullYear() : year}
            </Text>
          </View>

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderTopWidth={1}
            borderTopColor={colors.gray[100]}
            p={'16px'}
          >
            <HStack space={'4px'}>
              {/* Month dropdown */}
              <Select
                pl={8}
                size="sm"
                dropdownIconSize={'12px'}
                variant={'filled'}
                borderRadius={6}
                width={'86px'}
                height={22}
                fontSize={12}
                dropdownPosition={5}
                value={month}
                onChange={value => selectDate(new Date(selectedDate.setMonth(parseInt(value))))}
                options={months.map(renderMonths)}
              />

              {/* Year dropdown */}
              <Select
                pl={8}
                size="sm"
                dropdownIconSize={'12px'}
                variant={'filled'}
                borderRadius={6}
                width={'56px'}
                height={22}
                fontSize={12}
                dropdownPosition={5}
                value={year}
                onChange={value => selectDate(new Date(selectedDate.setFullYear(parseInt(value))))}
                options={Array(maxDate.getFullYear() - minDate.getFullYear() + 1)
                  .fill(0)
                  .map(renderYears)}
              />
            </HStack>

            <HStack space={'10px'}>
              {/* Previous */}
              <Button
                variant="unstyled"
                size="sm"
                padding={0}
                height={22}
                isDisabled={minDate.getFullYear() === year && minDate.getMonth() === month}
                onPress={() => changeMonth(-1)}
              >
                <Icon as={Entypo} name="chevron-left" size={'24px'} color={colors.gray[300]} />
              </Button>
              {/* Next */}
              <Button
                variant="unstyled"
                size="sm"
                padding={0}
                height={22}
                isDisabled={maxDate.getFullYear() === year && maxDate.getMonth() === month}
                onPress={() => changeMonth(+1)}
              >
                <Icon as={Entypo} name="chevron-right" size={'24px'} color={colors.gray[300]} />
              </Button>
            </HStack>
          </Flex>
          <>
            <HStack borderBottomWidth={1} borderBottomColor={colors.gray[100]}>
              <HStack mx={16} flexWrap="wrap" justifyContent="space-around" width="90%">
                {days.map(renderDays)}
              </HStack>
            </HStack>

            <HStack mx={16} flexWrap="wrap" justifyContent="space-between">
              {calendar.map(renderCalendar)}
            </HStack>
          </>

          <Flex flexDirection="row" justifyContent="space-between" py={16} px={16}>
            <Button
              variant="unstyled"
              size="md"
              isDisabled={!selectedDate}
              fontFamily="Satoshi-Medium"
              px={0}
              onPress={handleClear}
            >
              {clearText}
            </Button>
            <Button
              variant="solid"
              size="md"
              isDisabled={!selectedDate}
              fontFamily="Satoshi-Medium"
              px="20px"
              onPress={handleClose}
            >
              {closeText}
            </Button>
          </Flex>
        </Box>
      </Modal>
    </>
  );
};
export default memo(DateCalendar);

const styles = StyleSheet.create({
  container: (variant, isFocused, isInvalid, isDisabled) => ({
    display: 'flex',
    backgroundColor: variant === 'filled' ? colors.gray[50] : colors.base.white,
    opacity: isDisabled ? 0.5 : 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: variant === 'unstyled' ? 0 : variant === 'filled' && !isFocused ? 0 : 1,
    borderColor:
      variant !== 'unstyled' && isFocused
        ? isInvalid
          ? colors.error[500]
          : colors.primary[600]
        : isInvalid
        ? colors.error[500]
        : colors.gray[100],
    border:
      variant === 'unstyled'
        ? 'none'
        : variant === 'filled' && !isFocused
        ? 'none'
        : isFocused
        ? isInvalid
          ? `1px solid ${colors.error[500]}`
          : `1px solid ${colors.primary[600]}`
        : isInvalid
        ? `1px solid ${colors.error[500]}`
        : `1px solid ${colors.gray[100]}`,
    boxShadow:
      variant !== 'unstyled' &&
      (isFocused
        ? isInvalid
          ? `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEF3F2`
          : `0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F9F5FF`
        : 'none')
  })
});

// headerFormat
// D to show short day name, etc. Sun, Tue.
// DD to show day name, etc. Sunday, Monday.
// d to show date without 0.
// dd to show date with 0.
// MM to show month name, etc. January, March.
// M to show short month name, etc. Jan, Mar.
// m to show month number.
// mm to show month number with 0.
