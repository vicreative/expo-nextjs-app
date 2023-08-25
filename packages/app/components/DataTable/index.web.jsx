import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import { Box, Flex, Spinner } from 'native-base';
import ErrorState from 'app/components/ErrorState';
import EmptyState from 'app/components/EmptyState';
import Pagination from 'app/components/Pagination';

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
  errorState = defaultErrorState,
  emptyState = defaultEmptyState
}) {
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = e => {
    if (e.target.scrollLeft > 0) {
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
            <Box className="table-wrapper" overflow="scroll" onScroll={e => handleScroll(e)}>
              <Table>
                <Thead className={isSticky ? 'show-border' : ''}>
                  <Tr className="header">
                    {tableHead?.map((item, index) => (
                      <Th className="header-item" key={`table-head-${index}`}>
                        {item}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody className={isSticky ? 'show-border' : ''}>{tableBody}</Tbody>
              </Table>
            </Box>

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
