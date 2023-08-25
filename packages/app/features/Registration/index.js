import { Feather } from '@expo/vector-icons'
import AnimatedMultiStep from 'app/components/Form/AnimatedMultiStep'
import { Container, Image } from 'app/components/index'
import colors from 'app/config/theme/colors'
import spacing from 'app/config/theme/spacing'
import { BlurView } from 'expo-blur'
import en from 'app/i18n/index'
import {
  Box,
  Flex,
  Hidden,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
} from 'native-base'
import { NavHeader } from 'app/navigation/Header'
import { useEffect, useState } from 'react'
import { resolveAssetsUrl } from 'app/utils/index'
import { Step1, Step2, Step3, Step4, Step5, Step6 } from './components'
import { Platform } from 'react-native'

const allSteps = [
  { name: 'step 1', component: Step1 },
  { name: 'step 2', component: Step2 },
  { name: 'step 3', component: Step3 },
  { name: 'step 4', component: Step4 },
  { name: 'step 5', component: Step5 },
  { name: 'step 6', component: Step6 },
]
const Registration = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleBeforeUnload = (event) => {
        event.preventDefault()
        event.returnValue = `Are you sure you want to leave this pages? Changes you've made may not be saved` // Display a confirmation message (optional)
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [])

  const onBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  const onNext = () => {
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <Container
      pt={{ base: spacing[24], md: 0 }}
      px={{ base: spacing[24], sm: spacing[100], md: 0 }}
      maxHeight="1440px"
    >
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only={['base', 'sm']}>
        <Flex width="100%" height="100%" flexDirection="row">
          {/* left col */}
          <Flex
            height="100%"
            width={{ base: '100%', md: '50%', lg: '65%' }}
            alignItems="center"
            position="relative"
            justifyContent="center"
          >
            {/* header */}
            <NavHeader position="absolute" onlyLogo />

            {/* steps */}
            <Flex width="100%" mt="88px" maxHeight="70%" overflowY="auto">
              <Flex alignSelf="center" width="100%" maxWidth="360px">
                <AnimatedMultiStep
                  steps={allSteps}
                  onBack={onBack}
                  onNext={onNext}
                />
              </Flex>
            </Flex>
          </Flex>
          {/* right col */}
          <Flex
            alignItems="center"
            justifyContent="center"
            height="100%"
            width={{ md: '50%', lg: '35%' }}
          >
            <Image
              source={resolveAssetsUrl('soft-life-girl-illustration.png')}
              alt="hot-air-balloon"
              w="100%"
              h="100%"
              backgroundColor={colors.primary[50]}
              resizeMode="cover"
            />
            <Box
              p={20}
              width="100%"
              position="absolute"
              bottom={`${spacing[20]}px`}
            >
              <BlurView intensity={50} tint="dark" style={styles.carousel}>
                <Text fontSize={`${spacing[24]}px`} color="white">
                  {en.register.carousel[currentIndex].text}
                </Text>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="row"
                  mt={`${spacing[24]}px`}
                >
                  {/* pagination */}
                  <HStack space={`${spacing[16]}px`}>
                    {en.register.carousel.map((item, index) => (
                      <Pressable
                        key={item.id}
                        onPress={() => setCurrentIndex(index)}
                        {...styles.pagination(
                          en.register.carousel[currentIndex].id === item.id,
                        )}
                      />
                    ))}
                  </HStack>
                  {/* arrow btns */}
                  <HStack space={`${spacing[20]}px`}>
                    <IconButton
                      icon={
                        <Icon
                          as={Feather}
                          name="arrow-left"
                          size={'18px'}
                          color="white"
                        />
                      }
                      isDisabled={currentIndex === 0 ? true : false}
                      onPress={() => setCurrentIndex(currentIndex - 1)}
                      {...styles.arrowBtn}
                    />
                    <IconButton
                      icon={
                        <Icon
                          as={Feather}
                          name="arrow-right"
                          size={'18px'}
                          color="white"
                        />
                      }
                      isDisabled={currentIndex === 3 ? true : false}
                      onPress={() => setCurrentIndex(currentIndex + 1)}
                      {...styles.arrowBtn}
                    />
                  </HStack>
                </Flex>
              </BlurView>
            </Box>
          </Flex>
        </Flex>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="md">
        {/* steps */}
        <AnimatedMultiStep
          steps={allSteps}
          onBack={onBack}
          onNext={onNext}
          comeInOnNext="fadeInUpBig"
          OutOnNext="fadeOutUpBig"
          comeInOnBack="fadeInDownBig"
          OutOnBack="fadeOutDownBig"
        />
      </Hidden>
    </Container>
  )
}

export default Registration

const styles = {
  carousel: {
    borderRadius: '30px',
    maxHeight: '400px',
    overflow: 'auto',
    bg: 'rgba(16, 16, 16, 0.1)',
    padding: spacing[24],
  },
  pagination: (selected) => ({
    width: `${spacing[10]}px`,
    height: `${spacing[10]}px`,
    bg: 'white',
    opacity: selected ? 1 : 0.1,
    borderRadius: 'full',
    _hover: {
      opacity: selected ? 1 : 0.3,
    },
  }),
  arrowBtn: {
    borderRadius: 'full',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    bg: 'rgba(16, 16, 16, 0.2)',
    width: `${spacing[55]}px`,
    height: `${spacing[55]}px`,
    backdropFilter: 'blur(4px)',
    _hover: {
      bg: 'rgba(16, 16, 16, 0.3)',
      borderColor: 'rgba(255,255,255,0.5)',
    },
    _pressed: {
      bg: 'rgba(16, 16, 16, 0.4)',
      borderColor: 'rgba(255,255,255,0.5)',
    },
    _focus: {
      bg: 'rgba(16, 16, 16, 0.4)',
      borderColor: 'rgba(255,255,255,0.5)',
    },
  },
}
