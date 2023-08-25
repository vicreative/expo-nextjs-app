import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import Button from '../Button';
import { Box, Flex, HStack, Icon, Pressable } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { Entypo } from '@expo/vector-icons';

export default function MyCarousel(props) {
  const {
    data,
    hasCustomPagination,
    children,
    borderRadius = 10,
    renderItem,
    hideArrowBtns = false,
    currentIndex,
    setCurrentIndex = () => {},
    onPress = () => {},
    width = '393px',
    showArrows = false,
    pagination = false,
    ...rest
  } = props;
  const carouselRef = useRef();

  const renderPagination = () => (
    <HStack space={'5px'} justifyContent="center" mt="35px">
      {new Array(data?.length).fill().map((_, index) => (
        <Box
          key={index}
          onClick={e => {
            e.stopPropagation();
            setCurrentIndex(index);
            carouselRef.current.goTo(index);
          }}
          bg="primary.600"
          borderRadius={100}
          width={'10px'}
          height={'10px'}
          cursor="pointer"
          opacity={currentIndex === index ? 1 : 0.5}
        />
      ))}
    </HStack>
  );

  const renderArrowButtons = () => (
    <Flex {...styles.carousel.arrowBtns}>
      <Button
        isDisabled={currentIndex === 0}
        onPress={e => {
          e.stopPropagation();
          setCurrentIndex(currentIndex - 1);
          carouselRef.current.slidePrev();
        }}
        {...styles.carousel.arrowBtn}
      >
        <Icon as={Entypo} name="chevron-left" size="20px" color="black" />
      </Button>

      <Button
        isDisabled={currentIndex === carouselRef.current?.state?.pages?.length - 1}
        onPress={e => {
          e.stopPropagation();
          setCurrentIndex(currentIndex + 1);
          carouselRef.current.slideNext();
        }}
        {...styles.carousel.arrowBtn}
      >
        <Icon as={Entypo} name="chevron-right" size="20px" color="black" />
      </Button>
    </Flex>
  );

  return (
    <>
      <Pressable
        width="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        onPress={onPress}
        cursor="default"
      >
        <Carousel
          ref={carouselRef}
          showArrows={showArrows}
          pagination={pagination}
          className={`br-${borderRadius}`}
          onChange={(_, pageIndex) => setCurrentIndex(pageIndex)}
          itemsToShow={1}
          itemsToScroll={1}
          initialActiveIndex={currentIndex}
          {...rest}
        >
          {children
            ? children
            : data.map((item, index) => (
                <Flex key={item.id || item.uuid} {...styles.carousel.card(width)}>
                  {renderItem({ item, index })}
                </Flex>
              ))}
        </Carousel>
        {!hideArrowBtns && renderArrowButtons()}
        {/* pagination */}
        {!hasCustomPagination && renderPagination()}
      </Pressable>
    </>
  );
}

MyCarousel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  data: PropTypes.array.isRequired
};

export const NestedImageCarousel = props => {
  const {
    data,
    tag,
    renderItem,
    children,
    hidePagination = false,
    hideArrowBtns = false,
    showPaginationOnHover = false,
    borderRadius = 10,
    paginationContainerStyle = {},
    onSlideChange = () => {},
    showArrows = false,
    enableMouseSwipe = true,
    enableSwipe = true,
    pagination = false,
    imgHeight = {
      base: '240px',
      sm: '260px',
      md: '380px',
      xl: '428px'
    },
    ...rest
  } = props;
  const nestedCarouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const renderArrowButtons = () => (
    <Flex {...styles.nestedCarousel.arrowBtns}>
      <Button
        isDisabled={currentIndex === 0}
        onPress={e => {
          e.stopPropagation();
          setCurrentIndex(currentIndex - 1);
          nestedCarouselRef.current.slidePrev();
        }}
        {...styles.nestedCarousel.arrowBtn}
      >
        <Icon as={Entypo} name="chevron-left" size="14px" color="black" />
      </Button>

      <Button
        isDisabled={currentIndex === nestedCarouselRef.current?.state?.pages?.length - 1}
        onPress={e => {
          e.stopPropagation();
          setCurrentIndex(currentIndex + 1);
          nestedCarouselRef.current.slideNext();
        }}
        {...styles.nestedCarousel.arrowBtn}
      >
        <Icon as={Entypo} name="chevron-right" size="14px" color="black" />
      </Button>
    </Flex>
  );

  const renderPagination = () => (
    <HStack {...styles.paginationContainer} {...paginationContainerStyle}>
      {new Array(data?.length).fill().map((_, index) => (
        <Box
          key={index}
          onClick={e => {
            e.stopPropagation();
            setCurrentIndex(index);
            nestedCarouselRef.current.goTo(index);
          }}
          {...styles.pagination(currentIndex === index)}
        />
      ))}
    </HStack>
  );

  return (
    <Flex onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
      <Carousel
        ref={nestedCarouselRef}
        showArrows={showArrows}
        enableMouseSwipe={enableMouseSwipe}
        enableSwipe={enableSwipe}
        pagination={pagination}
        width="100%"
        className={`br-${borderRadius}`}
        initialActiveIndex={currentIndex}
        onChange={(_, pageIndex) => {
          setCurrentIndex(pageIndex);
          onSlideChange(pageIndex);
        }}
        {...rest}
      >
        {children
          ? children
          : data.map((item, index) => (
              <Flex
                key={item.id || item.uuid}
                height={imgHeight}
                {...styles.nestedCarousel.imgContainer}
              >
                {renderItem({ item, index })}
              </Flex>
            ))}
      </Carousel>
      {tag && (
        <HStack
          py={`${spacing[6]}px`}
          px={`${spacing[10]}px`}
          bg="white"
          borderRadius="full"
          position="absolute"
          left={`${spacing[14]}px`}
          bottom={hidePagination ? `${spacing[14]}px` : `${spacing[20]}px`}
        >
          {tag}
        </HStack>
      )}
      {!hidePagination &&
        (showPaginationOnHover ? showControls && renderPagination() : renderPagination())}
      {showControls && !hideArrowBtns && renderArrowButtons()}
    </Flex>
  );
};

NestedImageCarousel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  data: PropTypes.array.isRequired
};

const styles = {
  carousel: {
    card: width => ({
      direction: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // marginTop: { base: '40px', md: '64px' },
      width: width,
      height: '100%',
      marginX: '20px'
    }),
    cardTitle: {
      textStyle: 'bold.8',
      color: 'secondary',
      marginTop: { base: '20px', md: '32px' }
    },
    arrowBtns: {
      flexDirection: 'row',
      width: '100%',
      paddingX: '24px',
      justify: 'space-between',

      position: 'absolute',
      align: 'center',
      top: '50%'
    },
    arrowBtn: {
      colorScheme: 'secondary',
      variant: 'outline',
      size: 'sm',
      p: 0,
      bg: 'white',
      minW: '34px',
      minH: '34px',
      borderRadius: '100%',
      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    }
  },
  nestedCarousel: {
    imgContainer: {
      position: 'relative',
      direction: 'column',
      width: '100%',
      align: 'center'
    },
    arrowBtns: {
      flexDirection: 'row',
      width: '100%',
      paddingX: '6px',
      justify: 'space-between',
      position: 'absolute',
      align: 'center',
      top: '50%'
    },
    arrowBtn: {
      mode: 'secondary',
      variant: 'solid',
      borderRadius: '100%',
      width: '24px',
      height: '24px',
      p: 0,
      bg: 'white',
      _hover: {
        bg: 'gray.25'
      },
      _disabled: {
        opacity: 0
      },
      _pressed: {
        bg: 'white'
      },
      _focus: {
        bg: 'white'
      },
      boxShadow: '0px 0px 20px rgb(0 0 0 / 30%)'
    },
    tag: {
      bg: 'white',
      position: 'absolute',
      bottom: { base: '24px', md: '34px' },
      left: '20px',
      borderRadius: '100px',
      padding: { base: '10px', md: '12px' }
    }
  },
  paginationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    space: '4px',
    position: 'absolute',
    bottom: '6px'
  },
  pagination: selected => ({
    bg: 'white',
    width: { base: '10px', md: '8px' },
    height: { base: '10px', md: '8px' },
    opacity: selected ? 1 : 0.4,
    borderRadius: '100%',
    cursor: 'pointer',
    boxShadow: '0px 0px 20px rgb(0 0 0 / 20%)'
  })
};
