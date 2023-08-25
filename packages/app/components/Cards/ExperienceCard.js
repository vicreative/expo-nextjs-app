import { useCallback } from 'react';
import spacing from 'app/config/theme/spacing';
import { mediaList } from 'app/constants/index';
import { Box, HStack, Pressable, Skeleton, Text } from 'native-base';
import { NestedImageCarousel } from 'app/components/Carousel';
import { resolveFileUrl } from 'app/utils/index';
import { Media } from 'app/components/Media';
import Touchable from 'app/components/Gestures/Touchable';
import AmountText from 'app/components/AmountText';
import useDimensions from 'app/hooks/useDimensions';
import en from 'app/i18n/index';

export default function ExperienceCard({
  sliderWidth,
  sliderHeight = spacing[100] * 2.28,
  borderRadius = spacing[10],
  location,
  title,
  price,
  duration,
  bookingType,
  data,
  isLoading,
  hidePagination = false,
  scrollEnabled = true,
  extraComponent,
  showOnlyCoverImage = false,
  showPriceTag = true,
  topRightTag,
  bottomLeftTag,
  isDisabled = false,
  onPress = () => {}
}) {
  const {
    window: { width }
  } = useDimensions();

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
    ({ item }) => (
      <Pressable onPress={onPress} key={item.uuid} isDisabled={isDisabled} removeMoveResponder>
        <Media
          type={item.mediaType}
          width={sliderWidth ? sliderWidth : width * 0.884}
          height={sliderHeight}
          source={{
            uri: resolveFileUrl(item.uri)
          }}
          alt={item.title}
          resizeMode="cover"
          borderRadius={0}
          isMuted
          usePoster
          posterSource={{ uri: resolveFileUrl(data.coverMediaPath) }}
          hasCustomControls
          useCustomPauseBtn
          hasLoadingIndicator
          hasErrorIndicator
          overlayColor="rgba(16, 16, 16, 0.15)"
        />
      </Pressable>
    ),
    [onPress, isDisabled, sliderWidth, width, sliderHeight, data.coverMediaPath]
  );

  return (
    <Box width="100%" mb={`${spacing[40]}px`}>
      {!isLoading ? (
        <Touchable onPress={onPress} isDisabled={isDisabled} removeMoveResponder>
          <HStack position="relative" width="100%" borderRadius={borderRadius} overflow="hidden">
            {showOnlyCoverImage ? (
              <Media
                source={{ uri: resolveFileUrl(data.coverMediaPath) }}
                alt={title}
                type={data.coverMediaType.split('/').shift()}
                width={sliderWidth}
                height={sliderHeight}
                resizeMode="cover"
                borderRadius={0}
                hasLoadingIndicator
                hasErrorIndicator
                overlayColor="rgba(16, 16, 16, 0.15)"
              />
            ) : (
              <NestedImageCarousel
                data={mediaList(data)}
                renderItem={renderItem}
                width={sliderWidth}
                hidePagination={hidePagination}
                scrollEnabled={scrollEnabled}
                borderRadius={borderRadius}
                tag={<PricePerPerson />}
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
          </HStack>

          {location && (
            <Text fontSize={`${spacing[12]}px`} noOfLines={1} pt={`${spacing[16]}px`}>
              {location?.toUpperCase()}
            </Text>
          )}
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
