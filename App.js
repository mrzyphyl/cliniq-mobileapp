import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Attendance, Home, Login, Signup, Welcome, QRScanner } from './screens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet } from 'react-native'
import COLORS from './constants/colors'
import { View } from 'react-native'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabStack() {
  return(
    <Tab.Navigator 
    initialRouteName="HomeTab"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar
    }}
    >
        <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconContainer}>
              <Image
              source={require('./assets/icons8-home-96.png')}
              resizeMode='contain'
              style={styles.tabBarIcon}
              />
            </View>
          )
        }}
        />

        <Tab.Screen 
        name="QRScannerTab" 
        component={QRScanner} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.qrBarIconContainer}>
              <Image
              source={require('./assets/icons8-qr-96.png')}
              resizeMode='contain'
              style={styles.tabBarIcon}
              />
            </View>
          )
        }}
        />

        <Tab.Screen 
        name="AttendanceTab" 
        component={Attendance}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconContainer}>
              <Image
              source={require('./assets/icons8-attendance-64.png')}
              resizeMode='contain'
              style={styles.tabBarIcon}
              />
            </View>
          )
        }}
        />

    </Tab.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="QRScanner" component={QRScanner} options={{ headerShown: false }} />
      <Stack.Screen name="Attendance" component={Attendance} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check the user's login status when the app starts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData')
        if (userData) {
          // User data exists, so the user is logged in
          setUserIsLoggedIn(true)
        }
      } catch (error) {
        console.error('Error checking login status:', error)
      } finally {
        setIsLoading(false); // Mark loading as complete, whether successful or not
      }
    }

    checkLoginStatus()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userIsLoggedIn ? "HomeScreen" : "Welcome"}>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={TabStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    padding: 0,
    left: 16,
    right: 16,
    bottom: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  qrBarIconContainer:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: 70,
    width: 70,
    borderRadius: 70,
    shadowOffset: {
      height: 6,
      width: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },

  tabBarIconContainer:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },

  tabBarIcon: {
    width: 50,
    height: 50,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})