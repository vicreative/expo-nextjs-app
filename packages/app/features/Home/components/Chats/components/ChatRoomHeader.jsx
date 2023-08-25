import { Feather } from '@expo/vector-icons';
import ButtonGroup from 'app/components/ButtonGroup';
import Touchable from 'app/components/Gestures/Touchable';
import spacing from 'app/config/theme/spacing';
import useAppContext from 'app/hooks/useAppContext';
import useDimensions from 'app/hooks/useDimensions';
import { HStack, Icon, Flex } from 'native-base';

export const HeaderRight = ({ type, isLoading }) =>
  type === 'CREATOR_CONVERSATION' || isLoading ? null : (
    <HStack space={`${spacing[14]}px`} minW={`${spacing[40]}px`} alignItems="center">
      <Touchable onPress={() => {}}>
        <Icon as={Feather} name="bell" color="gray.500" size={`${spacing[24]}px`} />
      </Touchable>
      <Touchable onPress={() => {}}>
        <Icon as={Feather} name="users" color="gray.500" size={`${spacing[24]}px`} />
      </Touchable>
    </HStack>
  );

export const ExtraHeaderComponent = ({ type, isLoading }) => {
  const { state, dispatch } = useAppContext('chat');
  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  return type === 'CREATOR_CONVERSATION' || isLoading ? null : (
    <Flex
      mx={`${-spacing[24]}px`}
      mb={-SCREEN_HEIGHT * 0.014}
      px={`${spacing[24]}px`}
      pt={`${spacing[20]}px`}
      pb={`${spacing[12]}px`}
    >
      <ButtonGroup
        data={[
          { id: 'chat', title: 'Chat' },
          { id: 'expenses', title: 'Expenses' }
        ]}
        selected={state.contentToShow}
        onChange={id => dispatch({ type: 'CONTENT_TO_SHOW', contentToShow: id })}
      />
    </Flex>
  );
};
