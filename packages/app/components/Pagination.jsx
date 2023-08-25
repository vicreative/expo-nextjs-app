import { Entypo } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { usePagination, DOTS } from 'app/hooks/usePagination';
import { Box, Flex, HStack, Icon, Skeleton, Text } from 'native-base';
import Button from './Button';

const Pagination = props => {
  const {
    onPageChange = () => {},
    totalCount = 8,
    siblingCount = 1,
    currentPage = 1,
    pageSize = 8,
    totalPages = 1,
    px = 0,
    isLoading
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if ((currentPage === 0 || paginationRange?.length < 2) && !isLoading) {
    return null;
  }

  const onNext = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <Flex {...styles.container} mt={isLoading ? `${spacing[100]}px` : 0} px={px}>
      <Skeleton
        isLoaded={!isLoading}
        width={{
          base: `${spacing[100] * 0.46}px`,
          sm: `${spacing[100] * 0.86}px`
        }}
        height={`${spacing[19]}px`}
        borderRadius="full"
      >
        <Box>
          <Button
            onPress={onPrevious}
            leftIcon={<Icon as={Entypo} name="chevron-left" size={'16px'} />}
            isDisabled={currentPage === 1 ? true : false}
            display={{ base: 'none', sm: 'flex' }}
            {...styles.arrowBtns('outline')}
          >
            Previous
          </Button>
          <Button
            onPress={onPrevious}
            isDisabled={currentPage === 1 ? true : false}
            display={{ base: 'flex', sm: 'none' }}
            {...styles.arrowBtns('outline')}
          >
            <Icon as={Entypo} name="chevron-left" size={'16px'} />
          </Button>
        </Box>
      </Skeleton>

      <Skeleton
        isLoaded={!isLoading}
        width={{
          base: `${spacing[100] * 1.7}px`,
          sm: `${spacing[100] * 3.7}px`
        }}
        height={`${spacing[19]}px`}
        borderRadius="full"
      >
        <HStack space={`${spacing[4]}px`}>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return <Text key={index}>&#8230;</Text>;
            }

            return (
              <Button
                key={index}
                onPress={() => onPageChange(pageNumber)}
                {...styles.pageNumber(pageNumber === currentPage)}
              >
                {pageNumber}
              </Button>
            );
          })}
        </HStack>
      </Skeleton>

      <Skeleton
        isLoaded={!isLoading}
        width={{
          base: `${spacing[100] * 0.46}px`,
          sm: `${spacing[100] * 0.86}px`
        }}
        height={`${spacing[19]}px`}
        borderRadius="full"
      >
        <Box>
          <Button
            onPress={onNext}
            rightIcon={<Icon as={Entypo} name="chevron-right" size={'16px'} />}
            isDisabled={currentPage === lastPage ? true : false}
            display={{ base: 'none', sm: 'flex' }}
            {...styles.arrowBtns('outline')}
          >
            Next
          </Button>
          <Button
            onPress={onNext}
            isDisabled={currentPage === lastPage ? true : false}
            display={{ base: 'flex', sm: 'none' }}
            {...styles.arrowBtns('outline')}
          >
            <Icon as={Entypo} name="chevron-right" size={'16px'} />
          </Button>
        </Box>
      </Skeleton>
    </Flex>
  );
};

export default Pagination;

const styles = {
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: 'gray.100',
    borderTopWidth: 1,
    py: `${spacing[12]}px`,
    mt: `${spacing[20]}px`
  },
  pageNumber: selected => ({
    variant: selected ? 'subtle' : 'unstyled',
    colorScheme: selected ? 'primary' : 'secondary',
    size: 'sm',
    alignItems: 'center',
    justifyContent: 'center',
    width: { base: `${spacing[24]}px`, sm: `${spacing[36]}px` },
    height: { base: `${spacing[24]}px`, sm: `${spacing[36]}px` },
    borderRadius: `${spacing[8]}px`,
    bg: selected ? 'primary.50' : 'transparent',
    _text: {
      fontFamily: 'Satoshi-Medium'
    },
    _hover: {
      bg: selected ? 'primary.100' : 'transparent',
      _text: { color: 'primary.600' }
    },
    _pressed: {
      bg: selected ? 'primary.100' : 'transparent',
      _text: { color: 'primary.600' }
    }
  }),
  arrowBtns: variant => ({
    variant: variant,
    colorScheme: 'secondary',
    height: `${spacing[36]}px`,
    px: { base: `${spacing[8]}px`, sm: `${spacing[12]}px` },
    _text: {
      fontFamily: 'Satoshi-Medium',
      fontSize: { base: `${spacing[14]}px`, sm: `${spacing[16]}px` }
    }
  })
};
