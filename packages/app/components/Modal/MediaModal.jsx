import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'app/components';
import useAppContext from 'app/hooks/useAppContext';
import MyCarousel from 'app/components/Carousel';
import { Box, FlatList, Flex, HStack, Heading, Icon, Pressable, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import { resolveFileUrl } from 'app/utils/index';
import { Media } from 'app/components/Media';
import getDeviceOS from 'app/utils/deviceOs.web';
import Modal from './index';
import useDimensions from 'app/hooks/useDimensions';
import { Feather } from '@expo/vector-icons';
import { STATUS_BAR_HEIGHT } from 'app/constants/index';
import ButtonGroup from 'app/components/ButtonGroup';

const MediaModal = ({ visible, animationType = 'fade', onClose = () => {} }) => {
  const {
    window: { width: WIDTH },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const { state, dispatch } = useAppContext('user');

  const [showHeader, setShowHeader] = useState(true);
  const [selected, setSelected] = useState('media');
  const [currentIndex, setCurrentIndex] = useState(state.modal.options.media.currentIndex);

  const deviceOs = getDeviceOS();
  const isMobile = deviceOs === 'iOS' || deviceOs === 'Android';

  const data = state.modal.options.media.data;

  useEffect(() => {
    if (state.modal.modalToShow === 'singleMedia' && showHeader) {
      let timer = setTimeout(() => {
        setShowHeader(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [state.modal.modalToShow, showHeader]);

  const handleChange = useCallback(
    ({ modalToShow, canGoBack }) => {
      dispatch({
        ...state,
        modal: {
          modalToShow: modalToShow,
          options: {
            canGoBack: canGoBack,
            media: {
              showBtnGroup: state.modal.options.media.showBtnGroup,
              currentIndex: currentIndex,
              data: state.modal.options.media.data
            },
            share: state.modal.options.share
          }
        }
      });
    },
    [currentIndex, dispatch, state]
  );

  const handleGoBack = () => {
    if (state.modal.options.canGoBack) {
      handleChange({
        modalToShow: state.modal.modalToShow === 'singleMedia' ? 'allMedia' : 'singleMedia',
        canGoBack: false
      });
    } else {
      onClose();
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Box
          width={{ base: WIDTH, sm: `${spacing[100] * 4}px` }}
          _web={{ height: SCREEN_HEIGHT * 0.5 }}
          justifyContent="center"
          height={
            item.mediaType === 'application' || item.mediaType === 'audio' ? SCREEN_HEIGHT : 'auto'
          }
        >
          {item.mediaType === 'audio' ? (
            <Box
              bg="white"
              mx={`${spacing[24]}px`}
              px={`${spacing[14]}px`}
              py={`${spacing[8]}px`}
              borderRadius={`${spacing[8]}px`}
            >
              <Media source={{ uri: resolveFileUrl(item.uri) }} type={item.mediaType} />
            </Box>
          ) : (
            <Media
              width="100%"
              height="100%"
              source={{
                uri: resolveFileUrl(item.uri)
              }}
              alt={item.title}
              type={item.mediaType}
              resizeMode="contain"
              backgroundColor="transparent"
              borderRadius={0}
              useNativeControls
              hasLoadingIndicator
              loadingIndicatorSize="large"
              preview={true}
            />
          )}
        </Box>
      );
    },
    [SCREEN_HEIGHT, WIDTH]
  );

  const renderAllMediaFiles = useCallback(
    ({ item }) => {
      const handlePress = () => {
        const activeIndex = data.findIndex(
          media => (media.uuid || media.id) === (item.uuid || item.id)
        );
        setCurrentIndex(activeIndex);
        handleChange({
          modalToShow: 'singleMedia',
          canGoBack: false
        });
      };

      return (
        <Pressable
          onPress={handlePress}
          mb={spacing[6]}
          width={WIDTH * 0.22}
          height={WIDTH * 0.22}
          bg="primary.50"
          // justifyContent="center"
          // alignItems="center"
        >
          <Media
            width="100%"
            height="100%"
            source={{
              uri: resolveFileUrl(item.uri)
            }}
            alt={item.title}
            type={item.mediaType}
            preload="metadata"
            resizeMode="cover"
            borderRadius={0}
            useNativeControls
            hasLoadingIndicator
            shouldPlay={false}
            loop={false}
            loadingIndicatorSize="small"
            preview={false}
            iconSize={spacing[40]}
          />
        </Pressable>
      );
    },
    [WIDTH, data, handleChange]
  );

  const Header = () => (
    <Flex
      width={WIDTH}
      bg={'#1F1F1F'}
      pt={STATUS_BAR_HEIGHT + SCREEN_HEIGHT * 0.01}
      pb={SCREEN_HEIGHT * 0.014}
      px={spacing[20]}
      zIndex={1000}
      minHeight={`${SCREEN_HEIGHT * 0.1117}px`}
      justifyContent="center"
      _web={{
        position: 'fixed',
        top: 0,
        pt: SCREEN_HEIGHT * 0.014,
        pb: SCREEN_HEIGHT * 0.014
      }}
    >
      <HStack alignItems="center" justifyContent="space-between" width="100%">
        <Button onPress={handleGoBack} p={0} size="sm" variant="unstyled">
          <Icon as={Feather} name={'x'} size={`${spacing[24]}px`} color={'white'} />
        </Button>

        <HStack
          alignItems="center"
          width={state.modal.modalToShow === 'singleMedia' ? 'auto' : '100%'}
          maxWidth={
            state.modal.modalToShow === 'singleMedia'
              ? `${WIDTH * 0.65}px`
              : { base: `${WIDTH * 0.45}px`, sm: '200px' }
          }
        >
          {state.modal.modalToShow === 'singleMedia' ? (
            <Heading fontSize={`${spacing[16]}px`} color={'white'} noOfLines={1}>
              {`${(currentIndex + 1).toString()}/${data?.length.toString()}`}
            </Heading>
          ) : state.modal.options.media.showBtnGroup ? (
            <ButtonGroup
              padding={`${spacing[2]}px`}
              fontSize={`${spacing[10]}px`}
              data={[
                { id: 'media', title: 'Media' },
                { id: 'audio', title: 'Audio' },
                { id: 'docs', title: 'Docs' }
              ]}
              selected={selected}
              onChange={id => setSelected(id)}
            />
          ) : null}
        </HStack>

        <Flex minW={`${spacing[24]}px`} minH={`${spacing[20]}px`}>
          {state.modal.modalToShow === 'singleMedia' ? (
            <Button
              variant="unstyled"
              p={0}
              size="md"
              colorScheme="secondary"
              _text={{ color: 'white' }}
              onPress={() =>
                handleChange({
                  modalToShow: 'allMedia',
                  canGoBack: true
                })
              }
            >
              All Media
            </Button>
          ) : (
            <Text> </Text>
          )}
        </Flex>
      </HStack>
    </Flex>
  );

  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onClose={onClose}
      bg="gray.600"
      px={0}
      pt={0}
      hidePaddingTop
      alignItems="center"
      justifyContent="center"
      overflow="scroll"
      maxW="100%"
    >
      {state.modal.modalToShow === 'singleMedia' ? (
        <>
          <Flex alignItems="center" justifyContent="center" w="100%" h="100%">
            <MyCarousel
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              data={data}
              renderItem={renderItem}
              width={WIDTH}
              borderRadius={0}
              hasCustomPagination
              hideArrowBtns={isMobile ? true : false}
              onPress={() => setShowHeader(!showHeader)}
            />
            {showHeader && (
              <Box width="100%" position="absolute" top={0}>
                <Header />
              </Box>
            )}
          </Flex>
        </>
      ) : state.modal.modalToShow === 'allMedia' ? (
        <Flex alignItems="center" justifyContent="center" w="100%" height="100%">
          <Box
            width="100%"
            mb={`${spacing[10]}px`}
            _web={{ mb: `${SCREEN_HEIGHT * 0.1117 + spacing[10]}px` }}
          >
            <Header />
          </Box>
          <FlatList
            horizontal={false}
            numColumns={4}
            data={data?.filter(media =>
              state.modal.modalToShow === 'singleMedia'
                ? media
                : selected === 'audio'
                ? media.mediaType === 'audio'
                : selected === 'docs'
                ? media.mediaType === 'application'
                : media.mediaType === 'image' || media.mediaType === 'video'
            )}
            renderItem={renderAllMediaFiles}
            keyExtractor={item => item.id || item.uuid}
            columnWrapperStyle={{
              gap: spacing[6],
              flexDirection: 'row',
              alignItems: 'flex-start',
              flexWrap: 'wrap'
            }}
          />
        </Flex>
      ) : null}
    </Modal>
  );
};

export default MediaModal;
