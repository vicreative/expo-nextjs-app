import React from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import moment from 'moment';
import { Avatar, HStack, Icon, Link, Text, VStack } from 'native-base';
import en from 'app/i18n/index';
import { resolveFileUrl } from 'app/utils/index';
import { Feather } from '@expo/vector-icons';
import { resolvePrice } from 'app/utils/resolvePrice';
import Touchable from 'app/components/Gestures/Touchable';

export const transactionsTableHead = ['Date Created', 'Paid To', 'Amount', 'From', 'Remark', ' '];
export const transactionsColWidth = WIDTH => [
  WIDTH * 0.32,
  WIDTH * 0.4,
  WIDTH * 0.38,
  WIDTH * 0.4,
  WIDTH * 0.4,
  WIDTH * 0.4
];

export const TransactionsTableCaption = () => (
  <VStack
    space="4px"
    align="flex-start"
    p="20px 24px"
    borderBottomWidth={1}
    borderBottomColor="gray.100"
  >
    <Text fontSize="18px" fontFamily="Satoshi-Medium">
      {en.profile.transactions.info.table.caption}
    </Text>
  </VStack>
);

export const Transactions = ({ data, userId, onRowPress = () => {} }) => {
  return (
    <>
      {data?.map((transaction, index) => {
        const isLastItemInBatch = index === data?.length - 1;
        const isCredit =
          userId !== transaction.sendingUserId ||
          transaction.sendingUserId === transaction.receivingUserId;
        const isDebit =
          userId === transaction.sendingUserId &&
          transaction.sendingUserId !== transaction.receivingUserId;

        return (
          <Tr
            className="row"
            onClick={() => onRowPress(transaction.uuid, index)}
            style={{ cursor: 'pointer' }}
            key={transaction.id || transaction.uuid}
          >
            {/* Date Created */}
            <Td className={`column`}>{moment(transaction.createdAt).format('ll')}</Td>

            {/* Paid To */}
            <Td className={`column`}>
              <HStack space="12px" alignItems="center">
                <Avatar
                  bg="primary.100"
                  width={'32px'}
                  height={'32px'}
                  source={
                    transaction.receiverProfileImage && {
                      uri: resolveFileUrl(transaction.receiverProfileImage)
                    }
                  }
                >
                  {transaction.receiverName && transaction.receiverName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Text isTruncated maxW="160px" fontSize="14px">
                  {transaction.receiverName}
                </Text>
              </HStack>
            </Td>

            {/* Amount */}
            <Td className={`column ${isCredit ? 'plus' : isDebit ? 'minus' : ''}`}>
              {`${isCredit ? '+' : isDebit ? '-' : ''} ${resolvePrice(
                transaction.currency,
                transaction.amount
              )}`}
            </Td>

            {/* From */}
            <Td className={'column'}>
              <HStack space="12px" alignItems="center">
                <Avatar
                  bg="primary.100"
                  width={'32px'}
                  height={'32px'}
                  source={
                    transaction.senderProfileImage && {
                      uri: resolveFileUrl(transaction.senderProfileImage)
                    }
                  }
                >
                  {transaction.senderName && transaction.senderName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Text isTruncated maxW="160px" fontSize="14px">
                  {transaction.senderName}
                </Text>
              </HStack>
            </Td>

            {/* Remark */}
            <Td className={'column'}>
              <Text isTruncated maxW="160px" fontSize="14px">
                {transaction.remark}
              </Text>
            </Td>

            {/* Receipt */}
            <Td className={`column ${isLastItemInBatch ? 'last-child' : ''}`}>
              <Touchable onPress={() => {}}>
                <Link
                  href={resolveFileUrl(transaction.transactionReciept)}
                  hrefAttrs={{
                    rel: 'noreferrer',
                    target: '_blank'
                  }}
                  _text={{
                    color: 'primary.600',
                    fontSize: '14px',
                    fontFamily: 'Satoshi-Medium',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  _hover={{
                    _text: {
                      textDecoration: 'underline',
                      textDecorationLine: 'underline'
                    }
                  }}
                  alignItems="center"
                >
                  <Icon as={Feather} name="download" color="primary.600" size="16px" mr="10px" />
                  {en.profile.transactions.info.receipt.downloadReceipt}
                </Link>
              </Touchable>
            </Td>
          </Tr>
        );
      })}
    </>
  );
};
