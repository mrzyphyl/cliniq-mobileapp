import { View, Text, Pressable, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient"
import COLORS from '../constants/colors'
import Button from '../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Attendance = ({navigation}) => {
  const [appointmentData, setAppointmentData] = useState([])

  useEffect(() => {
    // Retrieve user data from AsyncStorage when the component mounts
    const fetchUserData = async () => {
      try {
        const appointment = await AsyncStorage.getItem('appointmentData')
        console.log('appointment', appointment)
        if (appointment) {
          // If data is found, parse it as JSON
          const parsedAppointment = JSON.parse(appointment)
          console.log('parsedAppointment', parsedAppointment)
          setAppointmentData([parsedAppointment])
        } else {
          console.log('No appointment data in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching appointment data:', error)
      }
    }
    fetchUserData()
  }, [])

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      console.log('All items removed from AsyncStorage.')
      navigation.navigate('Welcome')
    } catch (error) {
      console.error(`Error clearing AsyncStorage: ${error}`)
    }
  }

    return (
    <LinearGradient
      style={{
        flex: 1
      }}
      colors={[COLORS.bg, COLORS.darkerBg]}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ 
            flex: 1, 
            paddingHorizontal: 22, 
            paddingTop: 5 ,
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: 50,
          }}>
            <Text style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
              marginTop: 12, // Adjust this margin
            }}>Your Appointments</Text>

            <View style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              marginVertical: 22,
              width: '90%', // Adjust the width as needed
              alignItems: 'center', // Center the content
            }}>
              <Text style={{
                fontSize: 16,
                color: COLORS.black,
                marginVertical: 4, 
                marginBottom: 20
              }}>This is your appointment for today</Text>
              {appointmentData && Array.isArray(appointmentData) ? (
                // Map over the appointmentData array and render the appointment information
                appointmentData.map((appointment, appointmentIndex) => (
                  // Check if the appointment is not null before rendering its details
                  appointment ? (
                    <View key={appointmentIndex} style={{ alignItems: 'center', marginBottom: 20 }}>
                      {/* Use the correct variable name for the inner map */}
                      <View key={appointmentIndex} style={{ alignItems: 'center' }}>
                        <Text style={{ color: COLORS.black }}>
                          Ticket Number:
                        </Text>
                        <Text style={{ color: COLORS.black }}>
                          {appointment.AppointmentTicketNo}
                        </Text>
                        <Text style={{ color: COLORS.black }}>
                          Full Name: {appointment.FullName}
                        </Text>
                        <Text style={{ color: COLORS.black }}>
                          Phone Number: {appointment.PhoneNo}
                        </Text>
                        <Text style={{ color: COLORS.black }}>
                          Doctor: {appointment.Doctor}
                        </Text>
                        <Text style={{ color: COLORS.black }}>
                          Services: {appointment.Services}
                        </Text>
                        <Text style={{ color: COLORS.black }}>
                          Appointment Time: {appointment.AppointmentTime}
                        </Text>
                        <Text style={{ color: COLORS.black, marginBottom: 20 }}>
                          Appointment Date: {appointment.AppointmentDate}
                        </Text>
                      </View>
                    </View>
                  ) : null
                ))
              ) : (
                // Render a message when appointmentData is undefined or not an array
                <Text style={{ color: COLORS.black }}>No appointment data available.</Text>
              )}
            </View> 
            
            <Button
              title="Log Out"
              onPress={clearStorage}
              style={{
                marginTop: 22,
                marginBottom: 100,
                width: "100%"
              }}
            />

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  }
})

export default Attendance