import { Entypo } from '@expo/vector-icons';
import { Button, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import { createRef, useState } from 'react';
import { autoCapitalizeFirstLetter } from 'app/utils/index';
import Input from './Form/Input';
import Select from './Form/Select';
import PhoneInput from './Form/PhoneInput';
import PinCodeInput from './Form/PinCodeInput';
import DatePicker from './Form/DatePicker';
import Link from './Link';

export default function DesignComponents() {
  return (
    <>
      <Text fontFamily="Satoshi-Bold" fontSize={22} pt={5} pb={2}>
        Components
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Buttons />
        <Inputs />
        <Selects />
        <PhoneInputs />
        <PinInputs />
        <DatePickers />
        <Links />
      </ScrollView>
    </>
  );
}

const Buttons = () => {
  const btns = [
    [
      {
        id: 0,
        variant: 'solid',
        colorScheme: 'primary',
        text: 'Primary Button',
        size: 'lg'
      },
      {
        id: 1,
        variant: 'solid',
        colorScheme: 'secondary',
        text: 'Secondary Button',
        size: 'lg'
      },
      {
        id: 2,
        variant: 'solid',
        text: 'Disabled Button',
        size: 'lg',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'solid',
        text: 'Loading Button',
        size: 'lg',
        isLoading: true,
        isDisabled: true
      },
      {
        id: 4,
        variant: 'solid',
        colorScheme: 'primary',
        text: 'Primary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      },
      {
        id: 5,
        variant: 'solid',
        colorScheme: 'secondary',
        text: 'Secondary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      }
    ],
    [
      {
        id: 0,
        variant: 'outline',
        colorScheme: 'primary',
        text: 'Primary Button',
        size: 'lg'
      },
      {
        id: 1,
        variant: 'outline',
        colorScheme: 'secondary',
        text: 'Secondary Button',
        size: 'lg'
      },
      {
        id: 2,
        variant: 'outline',
        text: 'Disabled Button',
        size: 'lg',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'outline',
        text: 'Loading Button',
        size: 'lg',
        isLoading: true,
        isDisabled: true
      },
      {
        id: 4,
        variant: 'outline',
        colorScheme: 'primary',
        text: 'Primary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      },
      {
        id: 5,
        variant: 'outline',
        colorScheme: 'secondary',
        text: 'Secondary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      }
    ],
    [
      {
        id: 0,
        variant: 'subtle',
        colorScheme: 'primary',
        text: 'Primary Button',
        size: 'lg'
      },
      {
        id: 1,
        variant: 'subtle',
        colorScheme: 'secondary',
        text: 'Secondary Button',
        size: 'lg'
      },
      {
        id: 2,
        variant: 'subtle',
        colorScheme: 'primary',
        text: 'Disabled Button',
        size: 'lg',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'subtle',
        text: 'Loading Button',
        size: 'lg',
        isLoading: true,
        isDisabled: true
      },
      {
        id: 4,
        variant: 'subtle',
        colorScheme: 'primary',
        text: 'Primary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      },
      {
        id: 5,
        variant: 'subtle',
        colorScheme: 'secondary',
        text: 'Secondary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      }
    ],
    [
      {
        id: 0,
        variant: 'link',
        colorScheme: 'primary',
        text: 'Primary Button',
        size: 'lg'
      },
      {
        id: 1,
        variant: 'link',
        colorScheme: 'secondary',
        text: 'Secondary Button',
        size: 'lg'
      },
      {
        id: 2,
        variant: 'link',
        colorScheme: 'primary',
        text: 'Disabled Button',
        size: 'lg',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'link',
        text: 'Loading Button',
        size: 'lg',
        isLoading: true,
        isDisabled: true
      },
      {
        id: 4,
        variant: 'link',
        colorScheme: 'primary',
        text: 'Primary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      },
      {
        id: 5,
        variant: 'link',
        colorScheme: 'secondary',
        text: 'Secondary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      }
    ],
    [
      {
        id: 0,
        variant: 'unstyled',
        colorScheme: 'primary',
        text: 'Primary Button',
        size: 'lg'
      },
      {
        id: 1,
        variant: 'unstyled',
        colorScheme: 'secondary',
        text: 'Secondary Button',
        size: 'lg'
      },
      {
        id: 2,
        variant: 'unstyled',
        colorScheme: 'primary',
        text: 'Disabled Button',
        size: 'lg',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'unstyled',
        text: 'Loading Button',
        size: 'lg',
        isLoading: true,
        isDisabled: true
      },
      {
        id: 4,
        variant: 'unstyled',
        colorScheme: 'primary',
        text: 'Primary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      },
      {
        id: 5,
        variant: 'unstyled',
        colorScheme: 'secondary',
        text: 'Secondary Icon Button',
        size: 'lg',
        leftIcon: <Icon as={Entypo} name="user" />,
        rightIcon: <Icon as={Entypo} name="user" />
      }
    ]
  ];
  return (
    <>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={18}>
        1. Button
      </Text>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={16}>
        Variants
      </Text>
      <VStack space={4} py={10} px={2}>
        {btns.map((item, index) => (
          <VStack key={index} space={1}>
            <Text fontFamily="Satoshi-Bold" fontSize={14}>
              {autoCapitalizeFirstLetter(item[0].variant)}
            </Text>
            <ScrollView horizontal width="100%" py={2}>
              <HStack space={2}>
                {item.map(btn => (
                  <Button
                    key={btn.id}
                    colorScheme={btn.colorScheme}
                    variant={btn.variant}
                    size={btn.size}
                    isDisabled={btn.isDisabled}
                    isLoading={btn.isLoading}
                    isLoadingText={btn.text}
                    leftIcon={btn.leftIcon}
                    rightIcon={btn.rightIcon}
                  >
                    {btn.text}
                  </Button>
                ))}
              </HStack>
            </ScrollView>
          </VStack>
        ))}
      </VStack>
    </>
  );
};

const Inputs = () => {
  const inputs = [
    [
      { id: 0, variant: 'filled', placeholder: 'Default', size: 'md' },
      {
        id: 1,
        variant: 'filled',
        placeholder: 'Error',
        size: 'md',
        isInvalid: true
      },
      {
        id: 2,
        variant: 'filled',
        placeholder: 'Disabled',
        size: 'md',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'filled',
        placeholder: 'With Icon',
        size: 'md',
        leftIcon: <Icon as={Entypo} name="user" size="14px" />,
        rightIcon: <Icon as={Entypo} name="user" size="14px" />
      }
    ],
    [
      {
        id: 0,
        variant: 'outline',
        placeholder: 'Default',
        size: 'md'
      },
      {
        id: 1,
        variant: 'outline',
        placeholder: 'Error',
        size: 'md',
        isInvalid: true
      },
      {
        id: 2,
        variant: 'outline',
        placeholder: 'Disabled',
        size: 'md',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'outline',
        placeholder: 'With Icon',
        size: 'md',
        leftIcon: <Icon as={Entypo} name="user" size="14px" />,
        rightIcon: <Icon as={Entypo} name="user" size="14px" />
      }
    ],
    [
      {
        id: 0,
        variant: 'rounded',
        placeholder: 'Default',
        size: 'md'
      },
      {
        id: 1,
        variant: 'rounded',
        placeholder: 'Error',
        size: 'md',
        isInvalid: true
      },
      {
        id: 2,
        variant: 'rounded',
        placeholder: 'Disabled',
        size: 'md',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'rounded',
        placeholder: 'With Icon',
        size: 'md',
        leftIcon: <Icon as={Entypo} name="user" size="14px" />,
        rightIcon: <Icon as={Entypo} name="user" size="14px" />
      }
    ],
    [
      {
        id: 0,
        variant: 'unstyled',
        placeholder: 'Default',
        size: 'md'
      },
      {
        id: 1,
        variant: 'unstyled',
        placeholder: 'Error',
        size: 'md',
        isInvalid: true
      },
      {
        id: 2,
        variant: 'unstyled',
        placeholder: 'Disabled',
        size: 'md',
        isDisabled: true
      },
      {
        id: 3,
        variant: 'unstyled',
        placeholder: 'With Icon',
        size: 'md',
        leftIcon: <Icon as={Entypo} name="user" size="14px" />,
        rightIcon: <Icon as={Entypo} name="user" size="14px" />
      }
    ]
  ];
  return (
    <>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={18}>
        2. Input
      </Text>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={16}>
        Variants
      </Text>
      <VStack space={4} py={10} px={2}>
        {inputs.map((item, index) => (
          <VStack key={index} space={1}>
            <Text fontFamily="Satoshi-Bold" fontSize={14}>
              {autoCapitalizeFirstLetter(item[0].variant)}
            </Text>
            <ScrollView horizontal width="100%" py={2}>
              <HStack space={2}>
                {item.map(input => (
                  <Input
                    key={input.id}
                    variant={input.variant}
                    size={input.size}
                    isDisabled={input.isDisabled}
                    isInvalid={input.isInvalid}
                    placeholder={input.placeholder}
                    InputLeftElement={input.leftIcon}
                    InputRightElement={input.rightIcon}
                    minWidth="150px"
                  />
                ))}
              </HStack>
            </ScrollView>
          </VStack>
        ))}
      </VStack>
    </>
  );
};

const Selects = () => {
  const [filled, setFilled] = useState('');
  const [outlined, setOutlined] = useState('');
  const [error, setError] = useState('');
  const [rounded, setRounded] = useState('');
  const [unstyled, setUnstyled] = useState('');

  return (
    <>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={18}>
        3. Select
      </Text>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={16}>
        Variants
      </Text>
      <VStack space={4} py={10} px={2}>
        <Select
          placeholder="Filled"
          value={filled}
          variant={'filled'}
          onChange={value => setFilled(value)}
          options={[
            { id: 0, label: 'UX Research', value: 'ux' },
            { id: 1, label: 'Web Development', value: 'web' },
            { id: 2, label: 'Cross Platform Development', value: 'cross' },
            { id: 3, label: 'UI Designing', value: 'ui' },
            { id: 4, label: 'Backend Development', value: 'backend' }
          ]}
        />
        <Select
          placeholder="Outline"
          value={outlined}
          variant={'outline'}
          onChange={value => setOutlined(value)}
          options={[
            { id: 0, label: 'UX Research', value: 'ux' },
            { id: 1, label: 'Web Development', value: 'web' },
            { id: 2, label: 'Cross Platform Development', value: 'cross' },
            { id: 3, label: 'UI Designing', value: 'ui' },
            { id: 4, label: 'Backend Development', value: 'backend' }
          ]}
        />
        <Select
          placeholder="Error"
          isInvalid
          variant={'outline'}
          defaultValue="Web Development"
          value={error}
          onChange={value => setError(value)}
          options={[
            { id: 0, label: 'UX Research', value: 'ux' },
            { id: 1, label: 'Web Development', value: 'web' },
            { id: 2, label: 'Cross Platform Development', value: 'cross' },
            { id: 3, label: 'UI Designing', value: 'ui' },
            { id: 4, label: 'Backend Development', value: 'backend' }
          ]}
        />
        <Select
          placeholder="Rounded"
          variant={'rounded'}
          value={rounded}
          onChange={value => setRounded(value)}
          options={[
            { id: 0, label: 'UX Research', value: 'ux' },
            { id: 1, label: 'Web Development', value: 'web' },
            { id: 2, label: 'Cross Platform Development', value: 'cross' },
            { id: 3, label: 'UI Designing', value: 'ui' },
            { id: 4, label: 'Backend Development', value: 'backend' }
          ]}
        />
        <Select
          placeholder="Unstyled"
          variant={'unstyled'}
          value={unstyled}
          onChange={value => setUnstyled(value)}
          options={[
            { id: 0, label: 'UX Research', value: 'ux' },
            { id: 1, label: 'Web Development', value: 'web' },
            { id: 2, label: 'Cross Platform Development', value: 'cross' },
            { id: 3, label: 'UI Designing', value: 'ui' },
            { id: 4, label: 'Backend Development', value: 'backend' }
          ]}
        />
        <Select
          placeholder="Disabled"
          isDisabled
          value={unstyled}
          onChange={value => setUnstyled(value)}
          options={[
            { id: 0, label: 'UX Research', value: 'ux' },
            { id: 1, label: 'Web Development', value: 'web' },
            { id: 2, label: 'Cross Platform Development', value: 'cross' },
            { id: 3, label: 'UI Designing', value: 'ui' },
            { id: 4, label: 'Backend Development', value: 'backend' }
          ]}
        />
      </VStack>
    </>
  );
};

const PhoneInputs = () => {
  return (
    <>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={18}>
        4. PhoneInput
      </Text>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={16}>
        Variants
      </Text>
      <VStack space={4} py={5} px={1}>
        <PhoneInput variant="outline" />
        <PhoneInput isInvalid />
        <PhoneInput variant="rounded" />
        <PhoneInput variant="unstyled" />
        <PhoneInput isDisabled />
      </VStack>
    </>
  );
};

const PinInputs = () => {
  const [value, setValue] = useState('');
  const pinInput = createRef();

  const checkCode = code => {
    if (code != '12345') {
      pinInput.current.shake().then(() => setValue(''));
    }
  };
  return (
    <>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={18}>
        5. PinInput
      </Text>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={16}>
        Variants
      </Text>
      <VStack space={4} py={10} px={2}>
        <PinCodeInput
          ref={pinInput}
          value={value}
          codeLength={5}
          importantForAutofill="yes"
          autoComplete={'sms-otp'}
          textContentType={'oneTimeCode'}
          onTextChange={code => setValue(code)}
          onFulfill={checkCode}
        />
        <PinCodeInput
          ref={pinInput}
          password
          placeholder="0"
          codeLength={5}
          value={value}
          onFulfill={checkCode}
          onTextChange={password => setValue(password)}
        />
      </VStack>
    </>
  );
};

const DatePickers = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={18}>
        5. DatePicker
      </Text>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={16}>
        Variants
      </Text>
      <VStack space={4} py={10} px={2}>
        <DatePicker
          variant="filled"
          placeholder="Enter your date of birth"
          value={value}
          onChange={date => setValue(date)}
          maxDate={new Date()}
        />
        <DatePicker
          variant="outline"
          placeholder="Enter your date of birth"
          value={value}
          onChange={date => setValue(date)}
          maxDate={new Date()}
        />
        <DatePicker
          variant="outline"
          isInvalid
          placeholder="Enter your date of birth"
          value={value}
          onChange={date => setValue(date)}
          maxDate={new Date()}
        />
        <DatePicker
          variant="rounded"
          placeholder="Enter your date of birth"
          value={value}
          onChange={date => setValue(date)}
          maxDate={new Date()}
        />
        <DatePicker
          variant="unstyled"
          placeholder="Enter your date of birth"
          value={value}
          onChange={date => setValue(date)}
          maxDate={new Date()}
        />
        <DatePicker
          variant="outline"
          isDisabled
          placeholder="Enter your date of birth"
          value={value}
          onChange={date => setValue(date)}
          maxDate={new Date()}
        />
      </VStack>
    </>
  );
};

const Links = () => {
  return (
    <>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={18}>
        6. Link
      </Text>
      <Text fontFamily="Satoshi-Bold" pt={20} fontSize={16}>
        Variants
      </Text>
      <VStack space={4} py={10} px={2} mb={100}>
        <Link href="https://expitra.com">Click me to open Expitra website.</Link>

        <Link href="/register">Clich here to go to registration screen</Link>
      </VStack>
    </>
  );
};
