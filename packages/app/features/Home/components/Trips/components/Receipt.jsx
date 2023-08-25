import React from 'react';
import en from 'app/i18n/index';
import { Box, Flex, HStack, Icon, Link, ScrollView, Stack, Text } from 'native-base';
import { resolveFileUrl } from 'app/utils/index';
import { resolvePrice } from 'app/utils/resolvePrice';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import AmountText from 'app/components/AmountText';
import { LogoWithText } from 'app/components/Icons/Logo';

function Receipt({ isTicket, data }) {
  const Card = ({ children }) => (
    <Flex
      px={{ base: `${spacing[24]}px`, sm: `${spacing[30]}px` }}
      py={{ base: `${spacing[32]}px`, sm: `${spacing[40]}px` }}
      mt={`${spacing[40]}px`}
      mb={{ base: `${spacing[24]}px`, sm: `${spacing[46]}px` }}
      alignSelf="center"
      borderWidth={1}
      borderColor="gray.100"
      borderRadius="8px"
      maxWidth="654px"
      width="100%"
    >
      {children}
    </Flex>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} px={`${spacing[24]}px`} w="100%">
      {isTicket ? (
        <Card>
          <Flex alignSelf="flex-end" mb={'35px'}>
            <LogoWithText width={`${spacing[100] * 1.33}px`} height={`${spacing[32]}px`} />
          </Flex>
          <Text
            fontSize={`${spacing[14]}px`}
            mb={{ base: `${spacing[14]}px`, sm: `${spacing[18]}px` }}
            fontFamily="Satoshi-Medium"
            textAlign="center"
            color="gray.300"
          >
            {en.profile.trips.info.ticket.amount}
          </Text>

          {data?.booking?.type === 'PRIVATE' ? (
            <AmountText
              textAlign="center"
              amount={resolvePrice(
                data.booking.currency,
                data.booking.privateGroupPrice + data.booking.serviceCharge
              )}
              fontSize={spacing[32]}
            />
          ) : (
            <AmountText
              textAlign="center"
              amount={resolvePrice(
                data.booking.currency,
                (data.booking.pricePerTicket + data.booking.serviceCharge) * data.booking.units
              )}
              fontSize={spacing[32]}
            />
          )}
          <Box
            borderWidth="1px"
            borderColor="gray.100"
            borderStyle="dashed"
            my={{ base: `${spacing[20]}px`, sm: `${spacing[40]}px` }}
          />
          <Stack space={{ base: `${spacing[28]}px`, sm: `${spacing[32]}px` }}>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.trips.info.ticket.name}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
              >
                {data.fullName}
              </Text>
            </Stack>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.trips.info.ticket.email}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
              >
                {data.email}
              </Text>
            </Stack>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.trips.info.ticket.experience}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
                isTruncated
                noOfLines={2}
              >
                {data.experience.title}
              </Text>
            </Stack>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.trips.info.ticket.bookingId}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
              >
                {data.fullName}
              </Text>
            </Stack>
            <HStack justifyContent="space-between" flexWrap="wrap">
              <Stack space={`${spacing[8]}px`}>
                <Text
                  fontSize={{
                    base: `${spacing[16]}px`,
                    sm: `${spacing[18]}px`
                  }}
                  color="gray.300"
                >
                  {en.profile.trips.info.ticket.tiketCode}
                </Text>
                <Text
                  fontSize={{
                    base: `${spacing[18]}px`,
                    sm: `${spacing[24]}px`
                  }}
                  fontFamily="Satoshi-Medium"
                  isTruncated
                  noOfLines={2}
                >
                  {data.code}
                </Text>
              </Stack>
              <Stack space={`${spacing[8]}px`}>
                <Text
                  fontSize={{
                    base: `${spacing[16]}px`,
                    sm: `${spacing[18]}px`
                  }}
                  color="gray.300"
                >
                  {en.profile.trips.info.ticket.date}
                </Text>
                <Text
                  fontSize={{
                    base: `${spacing[18]}px`,
                    sm: `${spacing[24]}px`
                  }}
                  fontFamily="Satoshi-Medium"
                >
                  {moment(data.createdAt).format('ll')}
                </Text>
              </Stack>
            </HStack>
          </Stack>
        </Card>
      ) : (
        <Card>
          <Flex alignSelf="flex-end" mb={'35px'}>
            <LogoWithText width={`${spacing[100] * 1.33}px`} height={`${spacing[32]}px`} />
          </Flex>
          <Text
            fontSize={`${spacing[14]}px`}
            mb={{ base: `${spacing[14]}px`, sm: `${spacing[18]}px` }}
            fontFamily="Satoshi-Medium"
            textAlign="center"
            color="gray.300"
          >
            {en.profile.transactions.info.receipt.amount}
          </Text>

          <AmountText
            textAlign="center"
            amount={resolvePrice(data.currency, data.amount)}
            fontSize={spacing[32]}
          />
          <Box
            borderWidth="1px"
            borderColor="gray.100"
            borderStyle="dashed"
            my={{ base: `${spacing[20]}px`, sm: `${spacing[40]}px` }}
          />
          <Stack space={{ base: `${spacing[28]}px`, sm: `${spacing[32]}px` }}>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.transactions.info.receipt.from}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
              >
                {data.senderName}
              </Text>
            </Stack>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.transactions.info.receipt.paidTo}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
              >
                {data.receiverName}
              </Text>
            </Stack>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.transactions.info.receipt.remark}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
                isTruncated
                noOfLines={2}
              >
                {data.remark}
              </Text>
            </Stack>
            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.transactions.info.receipt.reference}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
              >
                {data.reference}
              </Text>
            </Stack>

            <Stack space={`${spacing[8]}px`}>
              <Text
                fontSize={{ base: `${spacing[16]}px`, sm: `${spacing[18]}px` }}
                color="gray.300"
              >
                {en.profile.transactions.info.receipt.date}
              </Text>
              <Text
                fontSize={{ base: `${spacing[18]}px`, sm: `${spacing[24]}px` }}
                fontFamily="Satoshi-Medium"
              >
                {moment(data.createdAt).format('lll')}
              </Text>
            </Stack>
          </Stack>
        </Card>
      )}

      <Flex alignItems="center" justifyContent="center" pb={`${spacing[100]}px`}>
        <Link
          href={isTicket ? resolveFileUrl(data.ticketUrl) : resolveFileUrl(data.transactionReciept)}
          {...styles.button}
        >
          <Icon
            as={Feather}
            name="download"
            color={{ base: 'gray.500', sm: 'primary.700' }}
            size={`${spacing[20]}px`}
            mr={`${spacing[16]}px`}
          />
          {isTicket
            ? en.profile.trips.info.ticket.downloadTicket
            : en.profile.transactions.info.receipt.downloadReceipt}
        </Link>
      </Flex>
    </ScrollView>
  );
}

export default Receipt;

const styles = {
  button: {
    hrefAttrs: {
      rel: 'noreferrer',
      target: '_blank'
    },
    width: { base: '100%', sm: '240px' },
    height: `${spacing[55]}px`,
    borderColor: 'gray.500',
    borderWidth: { base: 1, sm: 0 },
    bg: { base: 'white', sm: 'primary.100' },
    borderRadius: `${spacing[8]}px`,
    _web: {
      _text: {
        whiteSpace: 'nowrap'
      }
    },
    _text: {
      color: { base: 'gray.500', sm: 'primary.700' },
      fontSize: '16px',
      fontFamily: 'Satoshi-Medium',
      textDecoration: 'none'
    },
    alignItems: 'center',
    justifyContent: 'center'
  }
};
