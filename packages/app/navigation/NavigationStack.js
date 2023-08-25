import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, OnBoarding, Registration, ForgotPassword, Home } from 'app/features';
import {
  AccountSettings,
  BookExperience,
  ChatRoom,
  CreateGroupChat,
  ExperienceDetails,
  Experiences,
  VerifyProfile,
  WithdrawalBank,
  TripDetails,
  TransactionHistory,
  Security
} from 'app/features/Home/components/index';
import useAsyncStorage from 'app/hooks/useAsyncStorage';
import { LoadingState, ProtectedRoute } from 'app/components/index';
import { ExperienceProvider } from 'app/context/ExperienceContext';
import { ChatProvider } from 'app/context/ChatContext';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const screensWithoutHeader = [
  {
    name: 'Onboarding',
    component: props => <OnBoarding {...props} />,
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'vertical'
    }
  },
  {
    name: 'Register',
    component: props => <Registration {...props} />,
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'vertical'
    }
  },
  {
    name: 'Login',
    component: props => <Login {...props} />,
    options: {
      gestureEnabled: false,
      animationEnabled: true,
      gestureDirection: 'vertical'
    }
  },
  {
    name: 'ForgotPassword',
    component: props => <ForgotPassword {...props} />,
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'Home',
    component: props => <Home {...props} />,
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'vertical'
    }
  },
  {
    name: 'Experiences',
    component: props => <Experiences {...props} />,
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'ExperienceDetails',
    component: props => (
      <ExperienceProvider>
        <ExperienceDetails {...props} />
      </ExperienceProvider>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'vertical'
    }
  },
  {
    name: 'BookExperience',
    component: props => (
      <ProtectedRoute
        currentRoute={`/experiences/${props.route?.params?.id}/schedule/${props.route?.params?.scheduleId}`}
      >
        <ExperienceProvider>
          <BookExperience {...props} />
        </ExperienceProvider>
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'TripDetails',
    component: props => (
      <ProtectedRoute currentRoute={`/trips/${props.route?.params?.id}`}>
        <ExperienceProvider>
          <TripDetails {...props} />
        </ExperienceProvider>
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'CreateGroupChat',
    component: props => (
      <ProtectedRoute currentRoute="/chats/create-group">
        <ChatProvider>
          <CreateGroupChat {...props} />
        </ChatProvider>
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'ChatRoom',
    component: props => (
      <ProtectedRoute currentRoute={`/chats/${props.route?.params?.referenceId}`}>
        <ChatProvider>
          <ChatRoom {...props} />
        </ChatProvider>
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'AccountSettings',
    component: props => (
      <ProtectedRoute currentRoute={`/profile/account`}>
        <AccountSettings {...props} />
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'TransactionHistory',
    component: props => (
      <ProtectedRoute currentRoute={`/profile/transactions`}>
        <TransactionHistory {...props} />
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'WithdrawalBank',
    component: props => (
      <ProtectedRoute currentRoute={`/profile/withdrawal-bank`}>
        <WithdrawalBank {...props} />
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'Security',
    component: props => (
      <ProtectedRoute currentRoute={`/profile/security`}>
        <Security {...props} />
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  },
  {
    name: 'VerifyProfile',
    component: props => (
      <ProtectedRoute currentRoute={`/profile/verify`}>
        <VerifyProfile {...props} />
      </ProtectedRoute>
    ),
    options: {
      gestureEnabled: true,
      animationEnabled: true,
      gestureDirection: 'horizontal'
    }
  }
];

const NavigationStack = () => {
  const { isLoading, isLoggedIn, token } = useAsyncStorage();

  const isLoggedOut = !isLoading && (isLoggedIn !== 'true' || token === null);

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <Stack.Navigator initialRouteName={isLoggedOut ? 'Onboarding' : 'Home'}>
      <Stack.Group
        screenOptions={{
          headerShown: false
        }}
      >
        {screensWithoutHeader.map(screen => (
          <Stack.Screen name={screen.name} options={screen.options} key={screen.name}>
            {gestureHandlerRootHOC(screen.component)}
          </Stack.Screen>
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NavigationStack;
