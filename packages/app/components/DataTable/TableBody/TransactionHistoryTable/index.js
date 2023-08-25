import { Cell } from 'app/components/DataTable/cell';
import { Table, TableWrapper } from 'app/components/DataTable/table';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import moment from 'moment';
import { Avatar, HStack, ScrollView, Text, VStack, Icon, Link, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { resolveFileUrl } from 'app/utils/index';
import { resolvePrice } from 'app/utils/resolvePrice';
import useDimensions from 'app/hooks/useDimensions';

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
  const {
    window: { width: WIDTH }
  } = useDimensions();

  const tableData = data.map(transaction => {
    const isCredit =
      userId !== transaction.sendingUserId ||
      transaction.sendingUserId === transaction.receivingUserId;

    const isDebit =
      userId === transaction.sendingUserId &&
      transaction.sendingUserId !== transaction.receivingUserId;

    return [
      moment(transaction.createdAt).format('ll'),
      {
        receiverName: transaction.receiverName,
        receiverProfileImage: transaction.receiverProfileImage
      },
      {
        amount: `${isCredit ? '+' : isDebit ? '-' : ''} ${resolvePrice(
          transaction.currency,
          transaction.amount
        )}`,
        isCredit,
        isDebit
      },
      {
        senderName: transaction.senderName,
        senderProfileImage: transaction.senderProfileImage
      },
      transaction.remark,
      transaction.transactionReciept
    ];
  });

  const receiver = transaction => {
    return (
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
        <Text fontSize={spacing[14]} isTruncated maxW={WIDTH * 0.32 - 30}>
          {transaction.receiverName}
        </Text>
      </HStack>
    );
  };

  const amount = transaction => {
    return (
      <Text
        isTruncated
        maxW={WIDTH * 0.4}
        fontFamily="Satoshi-Medium"
        fontSize={spacing[14]}
        color={transaction.isCredit ? 'success.600' : 'gray.500'}
      >
        {transaction.amount}
      </Text>
    );
  };

  const sender = transaction => {
    return (
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
        <Text fontSize={spacing[14]} isTruncated maxW={WIDTH * 0.32 - 30}>
          {transaction.senderName}
        </Text>
      </HStack>
    );
  };

  const remark = transaction => {
    return (
      <Text fontSize={spacing[14]} isTruncated maxW={WIDTH * 0.4 - 30}>
        {transaction}
      </Text>
    );
  };

  const downloadReceipt = transaction => {
    return (
      <Link
        href={resolveFileUrl(transaction)}
        hrefAttrs={{
          rel: 'noreferrer',
          target: '_blank'
        }}
        _web={{
          _text: {
            whiteSpace: 'nowrap'
          }
        }}
        _text={{
          color: 'primary.600',
          fontSize: '14px',
          fontFamily: 'Satoshi-Medium',
          textDecoration: 'none'
        }}
        alignItems="center"
      >
        <Icon as={Feather} name="download" color="primary.600" size="16px" mr="10px" />
        {en.profile.transactions.info.receipt.downloadReceipt}
      </Link>
    );
  };

  return (
    <ScrollView style={styles.dataWrapper} bounces={false}>
      <Table>
        {tableData.map((rowData, index) => (
          <Pressable key={index} onPress={() => onRowPress(data[index].uuid, index)}>
            <TableWrapper style={styles.row(index)}>
              {rowData.map((transaction, cellIndex) => (
                <Cell
                  key={cellIndex}
                  width={
                    cellIndex === 0 ? WIDTH * 0.32 : cellIndex === 2 ? WIDTH * 0.38 : WIDTH * 0.4
                  }
                  data={
                    cellIndex === 1
                      ? receiver(transaction, index)
                      : cellIndex === 2
                      ? amount(transaction, index)
                      : cellIndex === 3
                      ? sender(transaction, index)
                      : cellIndex === 4
                      ? remark(transaction, index)
                      : cellIndex === 5
                      ? downloadReceipt(transaction, index)
                      : transaction
                  }
                  style={styles.cell(index)}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          </Pressable>
        ))}
      </Table>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: spacing[14], fontFamily: 'Satoshi-Regular' },
  dataWrapper: { marginTop: -1 },
  row: index => ({
    flexDirection: 'row',
    paddingHorizontal: spacing[12],
    backgroundColor: index % 2 ? '#f9fafb' : 'white'
  }),
  cell: index => ({
    minWidth: 120,
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[12],
    height: spacing[55],
    backgroundColor: index % 2 ? '#f9fafb' : 'white'
  })
});
