import React, { useState } from 'react';
import { Box, Flex, ScrollView, Spinner, View, Text } from 'native-base';
import ErrorState from 'app/components/ErrorState';
import EmptyState from 'app/components/EmptyState';
import Pagination from 'app/components/Pagination';
import spacing from 'app/config/theme/spacing';
import { StyleSheet } from 'react-native';
import { Table } from './table';
import { Row } from './rows';
import moment from 'moment';

const defaultEmptyState = {
  heading: 'There are no history available'
};

const noResult = {
  heading: 'No results found!'
};

const defaultErrorState = {
  title: 'Ooops... an error occurred!',
  text: null
};

export default function DataTable({
  tableHead,
  data,
  tableBody,
  isLoading,
  noResultFound = false,
  tableCaption,
  colWidth = [120, 120, 120, 120, 120, 120],
  errorState = defaultErrorState,
  emptyState = defaultEmptyState
}) {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.x > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  return (
    <>
      <Box
        borderWidth={data.totalCount !== 0 && !noResultFound ? 1 : 0}
        borderColor="gray.100"
        borderRadius="8px"
        _web={{
          boxShadow:
            data.totalCount !== 0 && noResultFound
              ? '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
              : 'none'
        }}
      >
        {data.totalCount > 0 && tableCaption}
        {isLoading ? (
          <Flex py="100px" justify="center" align="center">
            <Spinner color="purple.500" size="lg" />
          </Flex>
        ) : data.totalCount === 0 ? (
          <Flex py="60px" justify="center" align="center">
            <EmptyState bg="white" {...(noResultFound ? noResult : emptyState)} />
          </Flex>
        ) : data.totalCount === undefined ? (
          <Flex py="60px" justify="center" align="center">
            <ErrorState isModal={false} {...errorState} />
          </Flex>
        ) : (
          <>
            <ScrollView scrollEventThrottle={16} horizontal={true} onScroll={handleScroll}>
              <View>
                <Table style={{ backgroundColor: '#f9fafb' }}>
                  <Row
                    data={tableHead}
                    widthArr={colWidth}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>
                {tableBody}
              </View>
            </ScrollView>
            {isSticky ? (
              <Box position="absolute" top={tableCaption ? 68 : 0} left={0} bg="white" shadow={3}>
                <Flex justifyContent="center" height="55px" bg="#f9fafb" px={spacing[24]}>
                  <Text fontSize={spacing[12]} fontFamily="Satoshi-Medium">
                    {tableHead[0]}
                  </Text>
                </Flex>
                {data.data.map((item, index) => (
                  <Flex
                    key={index}
                    justifyContent="center"
                    bg={index % 2 ? '#f9fafb' : 'white'}
                    px={spacing[24]}
                    py={spacing[12]}
                    height={spacing[55]}
                  >
                    <Text fontSize={spacing[14]}>{moment(item.createdAt).format('ll')}</Text>
                  </Flex>
                ))}
              </Box>
            ) : null}
            {data.totalCount > data.pageSize && (
              <Pagination
                px="20px"
                currentPage={data.currentPage}
                totalCount={data.totalCount}
                totalPages={data.totalPages}
                pageSize={data.pageSize}
                onPageChange={data.onPageChange}
              />
            )}
          </>
        )}
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing[12],
    height: spacing[55]
  },
  text: {
    fontSize: spacing[12],
    fontFamily: 'Satoshi-Medium',
    paddingHorizontal: spacing[12]
  }
});
