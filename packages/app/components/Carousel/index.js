import { useRef, useState } from 'react';
import spacing from 'app/config/theme/spacing';
import { Box, FlatList, HStack, Pressable, ScrollView } from 'native-base';
import useDimensions from 'app/hooks/useDimensions';

export default function MyCarousel({
  currentIndex,
  setCurrentIndex = () => {},
  data,
  renderItem,
  width,
  hasCustomPagination,
  borderRadius = spacing[10],
  onPress = () => {}
}) {
  const flatListRef = useRef(null);
  const {
    window: { height }
  } = useDimensions();

  const onScroll = ({ nativeEvent }) => {
    let pageNum = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    setCurrentIndex(pageNum);
  };

  const handlePaginationChange = index => {
    if (currentIndex === index) {
      return;
    }
    if (flatListRef.current) {
      flatListRef.current._listRef._scrollRef.scrollTo({
        x: width * index,
        y: 0,
        animated: true
      });
    }
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        horizontal
        data={data}
        renderItem={({ item, index }) => (
          <Pressable onPress={onPress}>{renderItem({ item, index })}</Pressable>
        )}
        keyExtractor={item => item.id || item.uuid}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        decelerationRate="fast"
        removeClippedSubviews
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        disableIntervalMomentum
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index
        })}
        borderRadius={borderRadius}
      />
      {/* pagination */}
      {!hasCustomPagination && (
        <HStack space={height * 0.005} justifyContent="center" mt={height * 0.035}>
          {data.map((item, index) => (
            <Pressable
              key={item.id || item.uuid}
              alignItems="center"
              justifyContent="center"
              width={5}
              height={5}
              onPress={() => handlePaginationChange(index)}
            >
              <Box
                width={2}
                height={2}
                borderRadius="full"
                bg="primary.600"
                opacity={currentIndex === index ? 1 : 0.5}
              />
            </Pressable>
          ))}
        </HStack>
      )}
    </>
  );
}

export const NestedImageCarousel = ({
  data,
  renderItem,
  tag,
  width,
  hidePagination = false,
  scrollEnabled = true,
  borderRadius = spacing[10],
  paginationContainerStyle = {},
  onSlideChange = () => {}
}) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = ({ nativeEvent }) => {
    let pageNum = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    setCurrentIndex(pageNum);
    onSlideChange(pageNum);
  };

  const handlePaginationChange = index => {
    if (currentIndex === index) {
      return;
    }
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width * index,
        y: 0,
        animated: true
      });
    }
  };

  const renderPagination = () => (
    <HStack {...styles.paginationContainer} {...paginationContainerStyle}>
      {data?.map((item, index) => (
        <Pressable
          key={item.id || item.uuid}
          onPress={() => handlePaginationChange(index)}
          {...styles.pagination}
        >
          <Box {...styles.paginationDot(currentIndex === index)} />
        </Pressable>
      ))}
    </HStack>
  );

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        pagingEnabled
        onScroll={onScroll}
        decelerationRate="fast"
        removeClippedSubviews
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        disableIntervalMomentum
        scrollEventThrottle={1}
        horizontal
        borderRadius={borderRadius}
      >
        {data.map((item, index) => renderItem({ item, index }))}
      </ScrollView>

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
      {!hidePagination && renderPagination()}
    </>
  );
};

const styles = {
  paginationContainer: {
    position: 'absolute',
    bottom: '6px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    space: `${spacing[2]}px`
  },
  pagination: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 3,
    height: 3
  },
  paginationDot: selected => ({
    bg: 'white',
    width: 2,
    height: 2,
    opacity: selected ? 1 : 0.4,
    borderRadius: 'full',
    _web: {
      cursor: 'pointer'
    },
    boxShadow: '0px 0px 20px rgb(0 0 0 / 20%)'
  })
};
