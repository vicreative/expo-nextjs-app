import { AntDesign, Entypo, Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import InstagramIcon from 'app/components/Icons/Instagram';
import WhatsappIcon from 'app/components/Icons/Whatsapp';
import { Button, EmptyState } from 'app/components/index';
import Modal from 'app/components/Modal';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Avatar, Box, Divider, Heading, HStack, Icon, ScrollView, Stack, Text } from 'native-base';
import useAppContext from 'app/hooks/useAppContext';
import copyToClipboard from 'app/utils/copyToClipboard';
import { useState } from 'react';
import * as Linking from 'expo-linking';
import { Alert, Platform } from 'react-native';
import checkIfPackageIsInstalled from 'app/utils/checkIfPackageIsInstalled';
import { resolveFileUrl } from 'app/utils/index';
import Touchable from 'app/components/Gestures/Touchable';
import { ComingSoonOverlay } from 'app/components/Cards/ComingSoon';
import useDimensions from 'app/hooks/useDimensions';
import { useConversationsQuery } from 'app/hooks/queries/useConversations';

let Share;

if (Platform.OS !== 'web') {
  Share = require('react-native-share').default;
}

const ShareBottomSheet = ({ visible, onClose = () => {} }) => {
  const [copied, setCopied] = useState(false);
  const { state, dispatch } = useAppContext('user');
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const { data: conversations } = useConversationsQuery('');

  const shareOptions = (otherOptions = {}) => ({
    title: state.modal.options.share.title,
    message: state.modal.options.share.text,
    url: state.modal.options.share.uri,
    failOnCancel: false,
    ...otherOptions
  });

  const shareSingle = async otherOptions => {
    try {
      await Share.shareSingle(shareOptions(otherOptions));
    } catch (error) {
      console.warn(error);
    }
  };

  const showGroups = (shouldShowGroups = false) => {
    dispatch({
      ...state,
      modal: {
        modalToShow: 'shareBottomSheet',
        options: {
          canGoBack: state.modal.options.canGoBack,
          media: state.modal.options.media,
          share: {
            showGroups: shouldShowGroups,
            uri: state.modal.options.share.uri,
            campaignName: state.modal.options.share.campaignName,
            text: state.modal.options.share.texxt,
            title: state.modal.options.share.title,
            pathname: state.modal.options.share.pathname
          }
        }
      }
    });
  };

  const shareViaWhatsapp = async () => {
    const packageSearch = Platform.OS === 'ios' ? 'whatsapp://' : 'com.whatsapp';
    const isInstalled = await checkIfPackageIsInstalled('Whatsapp', packageSearch);

    if (isInstalled) {
      shareSingle({ social: Share.Social.WHATSAPP });
    }
  };

  const shareViaInstagram = async () => {
    const packageSearch = Platform.OS === 'ios' ? 'instagram://share' : 'com.instagram.android';
    const isInstalled = await checkIfPackageIsInstalled('Instagram', packageSearch);

    if (isInstalled) {
      await Linking.openURL(
        `instagram://sharesheet?text=${state.modal.options.share.text}${state.modal.options.share.uri}`
      );
    }
  };

  const copyLink = () => {
    copyToClipboard(state.modal.options.share.uri, setCopied);
  };

  const openDefaultShareSheet = async () => {
    try {
      await Share.open(shareOptions());

      // const result = await Share.open(shareOptions());
      // if (result.success === true) {
      // } else {
      // }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Modal
      isDrawer
      closeOnOverlayClick
      animationType="fade"
      visible={visible}
      onClose={onClose}
      bg="transparent"
      statusBarBackgroundColor="transparent"
      justifyContent="flex-end"
      pt={0}
      maxWidth={{ base: '100%', sm: '400px' }}
    >
      <Box
        bg="white"
        borderTopRadius={`${spacing[20]}px`}
        height={{ base: 'auto', sm: '100%' }}
        shadow={5}
      >
        <HStack
          justifyContent="space-between"
          px={`${spacing[24]}px`}
          pt={`${spacing[38]}px`}
          pb={`${spacing[24]}px`}
          width="100%"
          borderBottomWidth={1}
          borderBottomColor="gray.100"
        >
          {state.modal.options.share.showGroups && (
            <Button onPress={() => showGroups(false)} size="sm" variant="unstyled" p={0}>
              <Icon
                as={SimpleLineIcons}
                name="arrow-left-circle"
                size={`${spacing[30]}px`}
                color={'gray.500'}
              />
            </Button>
          )}
          <Heading fontSize={`${spacing[24]}px`} width="86%">
            {state.modal.options.share.showGroups
              ? en.experiences.shareExperience.groups.heading
              : en.experiences.shareExperience.heading}
          </Heading>
          {!state.modal.options.share.showGroups && (
            <Button onPress={onClose} size="sm" variant="unstyled" p={0}>
              <Icon
                as={AntDesign}
                name="closecircleo"
                size={`${spacing[30]}px`}
                color={'gray.500'}
              />
            </Button>
          )}
        </HStack>

        <ScrollView p={`${spacing[24]}px`} maxH={SCREEN_HEIGHT * 0.5}>
          <Stack space={`${spacing[14]}px`} pb={`${spacing[40]}px`}>
            {state.modal.options.share.showGroups ? (
              conversations?.length === 0 ? (
                <EmptyState bg="white" message={en.experiences.shareExperience.groups.nodata} />
              ) : (
                conversations?.map(conversation => (
                  <Touchable
                    key={conversation.uuid}
                    onPress={() => showGroups(true)}
                    {...styles.card(false)}
                    {...styles.cardItem}
                  >
                    <HStack alignItems="center" space={`${spacing[20]}px`}>
                      <Avatar
                        bg={'primary.100'}
                        width={`${spacing[32]}px`}
                        height={`${spacing[32]}px`}
                        source={
                          conversation.imgUrl && {
                            uri: resolveFileUrl(conversation.imgUrl)
                          }
                        }
                      >
                        {conversation.name && conversation.name.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Text fontFamily="Satoshi-Medium">
                        {en.experiences.shareExperience.groups.title}
                      </Text>
                    </HStack>
                    <Icon
                      as={Entypo}
                      name="chevron-thin-right"
                      color="gray.500"
                      size={`${spacing[18]}px`}
                    />
                  </Touchable>
                ))
              )
            ) : (
              <>
                {/* Your groups */}
                <Touchable isDisabled onPress={showGroups}>
                  <ComingSoonOverlay
                    flexDirection="row"
                    size="xs"
                    shadow="none"
                    borderRadius={`${spacing[10]}px`}
                    borderWidth={0}
                    p={0}
                    // bg="transparent"
                  />
                  <HStack {...styles.card(true)} {...styles.cardItem}>
                    <Text>{en.experiences.shareExperience.groups.title}</Text>
                    <Icon
                      as={AntDesign}
                      name="arrowright"
                      color="gray.500"
                      size={`${spacing[24]}px`}
                    />
                  </HStack>
                </Touchable>

                <Box {...styles.card(false)}>
                  {/* Via whatsapp */}
                  <Touchable onPress={shareViaWhatsapp} {...styles.cardItem}>
                    <Text>{en.experiences.shareExperience.whatsapp}</Text>
                    <WhatsappIcon />
                  </Touchable>

                  {Platform.OS == 'ios' ? (
                    <>
                      <Divider bg="primary.200" thickness="1" />
                      {/* Via instagram */}
                      <Touchable onPress={shareViaInstagram} {...styles.cardItem}>
                        <Text>{en.experiences.shareExperience.instagram}</Text>
                        <InstagramIcon />
                      </Touchable>
                    </>
                  ) : null}

                  <Divider bg="primary.200" thickness="1" />
                  {/* Copy */}
                  <Touchable onPress={copyLink} {...styles.cardItem}>
                    <Text>{en.experiences.shareExperience.copy}</Text>
                    <Icon
                      as={Ionicons}
                      name="copy-outline"
                      color="gray.500"
                      size={`${spacing[24]}px`}
                    />
                  </Touchable>
                </Box>

                <Touchable
                  onPress={openDefaultShareSheet}
                  {...styles.card(false)}
                  {...styles.cardItem}
                >
                  <Text>{en.experiences.shareExperience.more}</Text>
                  <Box
                    borderColor="gray.500"
                    borderWidth={1.5}
                    borderRadius="full"
                    p={`${spacing[2]}px`}
                  >
                    <Icon
                      as={Feather}
                      name="more-horizontal"
                      color="gray.500"
                      size={`${spacing[18]}px`}
                    />
                  </Box>
                </Touchable>
                {copied && <Text textAlign="center">{en.experiences.shareExperience.copied}</Text>}
              </>
            )}
          </Stack>
        </ScrollView>
      </Box>
    </Modal>
  );
};

export default ShareBottomSheet;
const styles = {
  card: isDisabled => ({
    borderWidth: 1,
    opacity: isDisabled ? 0.5 : 1,
    borderColor: 'primary.200',
    borderRadius: `${spacing[10]}px`,
    bg: 'primary.50'
  }),
  cardItem: {
    p: `${spacing[16]}px`,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
};
