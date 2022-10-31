import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './config';

import Login from './screen/Login';
import SignUp from './screen/SignUp';
import HomeScreen from './screen/HomeScreen';
import Profile from './screen/Profile';
import ChatScreen from './screen/ChatScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#25D366',
  },
}

const Stack = createNativeStackNavigator();

const Navigation = () => {

  const [user, setUser] = useState('')

  useEffect(() => {
    const unRegister = onAuthStateChanged(auth, (userExist) => {
      if (userExist) {
        setUser(userExist)
        // console.log(userExist)
      }
      else setUser('')
    })
    return () => {
      unRegister()
    }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#128C7E',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25
        },
        headerTintColor: 'white',

      }}>

        {
          user ?
            <Stack.Screen name='HomeScreen' options={{
              headerTitle: 'WhatsApp',
              headerBackVisible: false,
              headerRight: () => <>
                <MaterialIcons name='search' size={30} color='white' style={{ marginRight: 8 }}/>
                <MaterialIcons name='account-circle' size={30} color='white' onPress={() => { signOut(auth) }} />
              </>
            }} >
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
            :
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
            </>
        }

        <Stack.Screen name='Profile'>
          {props => <Profile {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name='ChatScreen'
          options={
            ({ route }) => ({ title: route.params.namee })
          } >
          {props => <ChatScreen {...props} user={user} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Navigation />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#128C7E',
  },
});