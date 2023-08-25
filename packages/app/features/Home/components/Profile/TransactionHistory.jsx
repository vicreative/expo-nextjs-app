import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Hidden, HStack, ScrollView, Text } from 'native-base';
import AccountLayout from 'app/components/Layout/AccountLayout';
import { Button, Container, LoadingState, SearchInput } from 'app/components/index';
import en from 'app/i18n/index';
import {
  useTransactionQuery,
  useUserTransactionsTableQuery
} from 'app/hooks/queries/useUserProfile';
import useAppContext from 'app/hooks/useAppContext';
import spacing from 'app/config/theme/spacing';
import DataTable from 'app/components/DataTable/index';
import Breadcrumb from 'app/components/Breadcrumb';
import Receipt from '../Trips/components/Receipt';
import ReceiptModal from 'app/components/Modal/ReceiptModal';
import ErrorState from 'app/components/ErrorState';
import { useRouter } from 'solito/router';
import useDimensions from 'app/hooks/useDimensions';
import getFlagEmoji from 'app/utils/getFlagEmoji';
import AmountText from 'app/components/AmountText';
import { resolvePrice } from 'app/utils/resolvePrice';
import {
  Transactions,
  transactionsColWidth,
  TransactionsTableCaption,
  transactionsTableHead
} from 'app/components/DataTable/TableBody/TransactionHistoryTable';
import { Platform } from 'react-native';

const initialState = {
  pageParam: 1,
  limit: 10,
  showMore: false,
  shouldSearch: true,
  searchQuery: '',
  transactionId: ''
};

function TransactionHistory() {
  const [state, setState] = useState(initialState);
  const { state: userState, dispatch } = useAppContext('user');
  const { back } = useRouter();
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  useEffect(() => {
    const isStripePaymentSuccessful =
      Platform.OS === 'web' ? (window?.location?.search === '?success=true' ? true : false) : false;
    if (isStripePaymentSuccessful) {
      fundWallet();
    }
  }, []);

  const {
    data: transactions,
    isLoading,
    refetch
  } = useUserTransactionsTableQuery(
    state.pageParam,
    state.limit,
    state.shouldSearch && state.searchQuery !== '' ? `&q=${state.searchQuery}` : '',
    {
      enabled: state.shouldSearch ? true : false
    }
  );

  const {
    data: transaction,
    isLoading: isLoadingTransaction,
    isError,
    refetch: refetchTransaction
  } = useTransactionQuery(state.transactionId, {
    enabled: state.transactionId !== '' ? true : false
  });

  const data = {
    data: transactions?.pages[0]?.records,
    currentPage: transactions?.pages[0]?.currentPage,
    totalCount: transactions?.pages[0]?.count,
    totalPages: transactions?.pages[0]?.totalPages,
    pageSize: state.limit,
    onPageChange: page => setState({ ...state, pageParam: page })
  };

  const TransactionHistoryTable = () => (
    <DataTable
      isLoading={isLoading && state.shouldSearch}
      tableHead={transactionsTableHead}
      data={data}
      tableCaption={<TransactionsTableCaption />}
      colWidth={transactionsColWidth(WIDTH)}
      noResultFound={
        state.shouldSearch && state.searchQuery !== '' && transactions?.pages[0]?.count === 0
      }
      errorState={{
        title: en.profile.transactions.info.table.error.heading,
        text: en.profile.transactions.info.table.error.message,
        btnText: en.profile.transactions.info.table.error.linkText,
        onDismiss: refetch
      }}
      tableBody={
        <Transactions
          data={transactions?.pages[0]?.records}
          userId={userState.user?.id}
          onRowPress={id => setState({ ...state, transactionId: id })}
        />
      }
    />
  );

  const fundWallet = () => {
    dispatch({
      ...userState,
      modal: {
        modalToShow: 'fundWallet',
        options: userState.modal.options
      }
    });
  };

  const handleSearch = () => {
    setState({ ...state, shouldSearch: true });
    refetch();
  };
  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <AccountLayout>
          {isError ? (
            <Flex h="100%" _web={{ h: '70vh' }} justifyContent="center" alignItems="center">
              <ErrorState
                isModal={false}
                title={en.profile.transactions.info.error.heading}
                text={en.profile.transactions.info.error.message}
                btnText={en.profile.transactions.info.error.linkText}
                onGoBack={back}
                onDismiss={() => {
                  refetchTransaction();
                }}
              />
            </Flex>
          ) : isLoading || (state.transactionId !== '' && isLoadingTransaction) ? (
            <Flex mt={`${spacing[100] * 1.5}`}>
              <LoadingState />
            </Flex>
          ) : state.transactionId !== '' && !isLoadingTransaction ? (
            <Box mt="46px">
              <Breadcrumb
                as="button"
                variant="accent"
                data={[
                  {
                    id: 0,
                    name: en.profile.transactions.headerTitle,
                    onPress: () => setState({ ...state, transactionId: '' })
                  },
                  {
                    id: 2,
                    name: en.profile.transactions.info.receipt.heading,
                    onPress: () => {}
                  }
                ]}
              />
              <Receipt data={transaction} />
            </Box>
          ) : (
            <Box mt="46px">
              {userState.user && (
                <HStack>
                  <HStack
                    borderWidth={1}
                    borderColor="gray.100"
                    borderRadius={`${spacing[20]}px`}
                    px={`${spacing[40]}px`}
                    py={`${spacing[44]}px`}
                    mb={`${spacing[40]}px`}
                    shadow={5}
                    bg="white"
                    minW="458px"
                    space={`${spacing[24]}px`}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <HStack
                        w="auto"
                        bg="gray.50"
                        alignItems="center"
                        p={`${spacing[8]}px`}
                        space={`${spacing[12]}px`}
                        borderRadius={`${spacing[48]}px`}
                        maxW="110px"
                        mb={`${spacing[16]}px`}
                      >
                        <Heading
                          px={`${spacing[8]}px`}
                          py={`${spacing[4]}px`}
                          bg="white"
                          borderRadius="full"
                          fontSize={`${spacing[24]}px`}
                        >
                          {getFlagEmoji(userState.user?.wallets[0]?.currencyCode)}
                        </Heading>
                        <Heading fontSize={`${spacing[16]}px`}>
                          {userState.user?.wallets[0]?.currency}
                        </Heading>
                      </HStack>
                      <AmountText
                        fontSize={spacing[36]}
                        amount={resolvePrice(
                          userState.user?.wallets[0]?.currency,
                          userState.user?.wallets[0]?.balance
                        )}
                      />
                      <Text
                        fontFamily="Satoshi-Medium"
                        fontSize={`${spacing[14]}px`}
                        pt={`${spacing[8]}px`}
                        color="gray.300"
                      >
                        {en.profile.settings.wallet.heading}
                      </Text>
                    </Box>

                    <Button
                      fontFamily="Satoshi-Medium"
                      colorScheme="secondary"
                      size="md"
                      onPress={fundWallet}
                    >
                      {en.profile.settings.wallet.fundWalletBtn}
                    </Button>
                  </HStack>
                </HStack>
              )}
              <HStack
                justifyContent="space-between"
                alignItems="flex-end"
                flexWrap="wrap"
                space="12px"
                mb="32px"
              >
                <Heading fontSize="24px">{en.profile.transactions.info.title}</Heading>
                <Box maxW="320px" w="100%">
                  <SearchInput
                    id="search-payments"
                    placeholder={en.profile.transactions.info.search.placeholder}
                    w="100%"
                    returnKeyType="search"
                    value={state.searchQuery}
                    onSearchChange={value =>
                      setState({
                        ...state,
                        searchQuery: value,
                        shouldSearch: false
                      })
                    }
                    onClear={() => setState({ ...state, searchQuery: '' })}
                    onSearch={handleSearch}
                    onEndEditing={handleSearch}
                    onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                      if (keyValue === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </Box>
              </HStack>
              <TransactionHistoryTable />
            </Box>
          )}
        </AccountLayout>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container px={0} headerTitle={en.profile.transactions.headerTitle}>
          <Box>
            {isError ? (
              <Flex h="100%" _web={{ h: '70vh' }} justifyContent="center" alignItems="center">
                <ErrorState
                  isModal={false}
                  title={en.profile.transactions.info.error.heading}
                  text={en.profile.transactions.info.error.message}
                  btnText={en.profile.transactions.info.error.linkText}
                  onGoBack={back}
                  onDismiss={() => {
                    refetchTransaction();
                  }}
                />
              </Flex>
            ) : isLoading || (state.transactionId !== '' && isLoadingTransaction) ? (
              <Flex
                _web={{ pt: '25vh' }}
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
              >
                <LoadingState />
              </Flex>
            ) : (
              <>
                <Box
                  pt={`${spacing[8]}px`}
                  px={`${spacing[24]}px`}
                  pb={`${spacing[10]}px`}
                  _web={{
                    position: 'fixed',
                    bg: 'white',
                    top: 0,
                    pt: SCREEN_HEIGHT * 0.1117 + 24,
                    zIndex: 1000,
                    width: '100%'
                  }}
                >
                  <SearchInput
                    id="search-payments"
                    width="100%"
                    returnKeyType="search"
                    placeholder={en.profile.transactions.info.search.placeholder}
                    value={state.searchQuery}
                    onSearchChange={value =>
                      setState({
                        ...state,
                        searchQuery: value,
                        shouldSearch: false
                      })
                    }
                    onClear={() => setState({ ...state, searchQuery: '' })}
                    onSearch={handleSearch}
                    onEndEditing={handleSearch}
                    onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                      if (keyValue === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </Box>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Box
                    px={`${spacing[24]}px`}
                    pt={`${spacing[20]}px`}
                    pb={`${spacing[100] * 1.2}px`}
                    _web={{ mt: SCREEN_HEIGHT * 0.07 }}
                  >
                    <TransactionHistoryTable />
                  </Box>
                </ScrollView>
              </>
            )}

            {state.transactionId !== '' && !isLoadingTransaction && (
              <ReceiptModal
                data={transaction}
                visible
                onClose={() => setState({ ...state, transactionId: '' })}
              />
            )}
          </Box>
        </Container>
      </Hidden>
    </>
  );
}

export default TransactionHistory;
