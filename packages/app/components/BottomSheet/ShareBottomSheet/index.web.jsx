import { Feather } from '@expo/vector-icons';
import colors from 'app/config/theme/colors';
import spacing from 'app/config/theme/spacing';
import { Icon } from 'native-base';
import React from 'react';
import { RWebShare } from 'react-web-share';

const ShareBottomSheet = ({
  btnType,
  btnTitle,
  iconName = 'share-2',
  btnVariant = 'outline',
  btnWidth = '224px',
  btnHeight = `${spacing[48]}px`,
  btnSize = `${spacing[40]}px`,
  uri = '', // takes the current browser location url when invite link is not provided (i.e inviteLink = '')
  text = '',
  title = '',
  onSuccess = () => {}
}) => {
  const onSharedSuccessfully = () => {
    onSuccess();
  };
  return (
    <div>
      <RWebShare
        data={{
          text: text,
          url: uri,
          title: title
        }}
        onClick={onSharedSuccessfully}
      >
        {btnType === 'icon' ? (
          <button style={styles.iconBtn(btnSize)}>
            <Icon as={Feather} name={iconName} size="18px" color="gray.500" />
          </button>
        ) : (
          <button style={styles.btn(btnWidth, btnHeight, btnVariant)}>
            <Icon
              as={Feather}
              name={iconName}
              size={{ base: '18px', sm: '20px' }}
              color={
                btnVariant === 'subtle'
                  ? 'primary.700'
                  : btnVariant === 'solid'
                  ? 'white'
                  : 'gray.500'
              }
              mr="8px"
            />
            {btnTitle}
          </button>
        )}
      </RWebShare>
    </div>
  );
};

export default ShareBottomSheet;

const styles = {
  iconBtn: size => ({
    width: size,
    height: size,
    borderRadius: '100%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white'
  }),
  btn: (btnWidth, btnHeight, btnVariant) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: btnHeight,
    width: btnWidth,
    background:
      btnVariant === 'subtle'
        ? colors.primary[100]
        : btnVariant === 'solid'
        ? colors.gray[500]
        : 'white',
    borderRadius: '8px',
    border: btnVariant === 'subtle' ? 'none' : `1px solid ${colors.gray[500]}`,
    color:
      btnVariant === 'subtle'
        ? colors.primary[700]
        : btnVariant === 'solid'
        ? 'white'
        : colors.gray[500],
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: `'Satoshi-Medium', 'DM Sans', sans-serif`
  })
};
