import AmountText from 'app/components/AmountText';
import { NestedImageCarousel } from 'app/components/Carousel';
import Touchable from 'app/components/Gestures/Touchable';
import { Media } from 'app/components/Media';
import spacing from 'app/config/theme/spacing';
import { mediaList } from 'app/constants/index';
import en from 'app/i18n/index';
import { Box, HStack, Skeleton, Text } from 'native-base';
import { useCallback } from 'react';
import { resolveFileUrl } from 'app/utils/index';

export default function ExperienceCard({
  location,
  isLoading,
  title,
  price,
  duration,
  bookingType,
  data,
  sliderWidth = { base: '100%', sm: '48.5%', md: '32%', lg: '23.5%' },
  sliderHeight = {
    base: `${spacing[100] * 2.28}px`,
    sm: '260px',
    md: '380px',
    xl: '428px'
  },
  borderRadius = spacing[10],
  hidePagination = false,
  showPaginationOnHover = true,
  scrollEnabled = true,
  extraComponent,
  showOnlyCoverImage = false,
  showPriceTag = true,
  topRightTag,
  bottomLeftTag,
  isDisabled = false,
  onPress = () => {}
}) {
  const PricePerPerson = () => (
    <>
      <AmountText amount={price} fontSize={spacing[14]} />
      {bookingType !== 'PRIVATE' && (
        <Text fontSize={`${spacing[14]}px`} color="gray.300">
          {en.experiences.details.selectDate.price}
        </Text>
      )}
    </>
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Media
          key={item.uuid}
          source={{ uri: resolveFileUrl(item.uri) }}
          alt={item.title}
          type={item.mediaType}
          width={'100%'}
          height={'100%'}
          preload="none"
          borderRadius={0}
          usePoster
          posterSource={{ uri: resolveFileUrl(data.coverMediaPath) }}
          hasCustomControls
          useCustomPauseBtn
          isMuted
          overlayColor="rgba(16, 16, 16, 0.15)"
        />
      );
    },
    [data.coverMediaPath]
  );

  return (
    <Box width={sliderWidth} mb={`${spacing[40]}px`}>
      {!isLoading ? (
        <Touchable onPress={onPress} isDisabled={isDisabled}>
          <Box
            position="relative"
            width="100%"
            borderRadius={borderRadius}
            overflow="hidden"
            backgroundColor="primary.50"
            height={sliderHeight}
          >
            {showOnlyCoverImage ? (
              <Media
                source={{ uri: resolveFileUrl(data.coverMediaPath) }}
                alt={'title'}
                type={data.coverMediaType.split('/').shift()}
                width={'100%'}
                height={'100%'}
                borderRadius={0}
                overlayColor="rgba(16, 16, 16, 0.15)"
              />
            ) : (
              <NestedImageCarousel
                data={mediaList(data)}
                renderItem={renderItem}
                tag={<PricePerPerson />}
                imgHeight={sliderHeight}
                hidePagination={hidePagination}
                showPaginationOnHover={showPaginationOnHover}
                enableSwipe={scrollEnabled}
                borderRadius={borderRadius}
              />
            )}
            {topRightTag && topRightTag}
            {(bottomLeftTag || (showOnlyCoverImage && showPriceTag)) && (
              <HStack
                py={`${spacing[6]}px`}
                px={`${spacing[10]}px`}
                bg="white"
                borderRadius="full"
                position="absolute"
                left={`${spacing[14]}px`}
                bottom={
                  hidePagination || showOnlyCoverImage ? `${spacing[14]}px` : `${spacing[20]}px`
                }
              >
                {showOnlyCoverImage && showPriceTag ? <PricePerPerson /> : bottomLeftTag}
              </HStack>
            )}
          </Box>

          <Text fontSize={`${spacing[12]}px`} noOfLines={1} pt={`${spacing[16]}px`}>
            {location?.toUpperCase()}
          </Text>
          <Text
            fontSize={`${spacing[18]}px`}
            noOfLines={2}
            fontFamily="Satoshi-Medium"
            pt={`${spacing[4]}px`}
          >
            {title}
          </Text>
          {duration && (
            <Text fontSize={`${spacing[14]}px`} color="gray.300" pt={`${spacing[8]}px`}>
              {duration}
            </Text>
          )}
          {extraComponent}
        </Touchable>
      ) : (
        <>
          <Box width="100%">
            <Skeleton
              height={sliderHeight}
              borderRadius={`${borderRadius}px`}
              position="relative"
              isLoaded={!isLoading}
            />
            <Skeleton.Text
              maxW="160px"
              position="absolute"
              left={`${spacing[14]}px`}
              bottom={`${spacing[14]}px`}
              _line={{
                height: `${spacing[30]}px`
              }}
              lines={1}
              isLoaded={!isLoading}
            />
          </Box>
          <Skeleton.Text mt={`${spacing[16]}px`} maxW="115px" lines={1} isLoaded={!isLoading} />
          <Skeleton.Text mt={`${spacing[4]}px`} maxW="225px" lines={1} isLoaded={!isLoading} />
          <Skeleton.Text mt={`${spacing[8]}px`} maxW="175px" lines={1} isLoaded={!isLoading} />
        </>
      )}
    </Box>
  );
}
