import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import COLORS from '../constants/colors'
import { Ionicons } from "@expo/vector-icons"
import Checkbox from "expo-checkbox"
import Button from '../components/Button'
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker'

const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [Birthday, setBirthday] = useState()

    const [formData, setFormData] = useState({
        UserFName: '', 
        UserLName: '', 
        Age: '',
        Birthday: Birthday,
        UserEmail: '', 
        UserPassword: ''
    })

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({type}, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
    
            // Format the currentDate to 'YYYY-MM-DD'
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
    
            setDate(currentDate);
            setBirthday(formattedDate)
            toggleDatePicker()
        } else {
            toggleDatePicker()
        }
    }

    const handleSignUp = () => {
        axios.post('http://192.168.1.65:5000/api/student-user', {
            ...formData, Birthday
        })
        .then((response) => {
        console.log('SignUp successful:', response.data)
        setFormData(initialFormData)
        setDate(new Date())
        setBirthday('')
        setIsChecked(false)
        setIsPasswordShown(false)
        navigation.navigate("Login")
        })
        .catch((error) => {
        console.error('Error signing up:', error)
        })
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.black
                        }}>
                            Create Account
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                        }}>Create an account today!</Text>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>First Name</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='First Name'
                                placeholderTextColor={COLORS.black}
                                value={formData.UserFName}
                                onChangeText={(text) => setFormData({ ...formData, UserFName: text })}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Last Name</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Last Name'
                                placeholderTextColor={COLORS.black}
                                value={formData.UserFName}
                                onChangeText={(text) => setFormData({ ...formData, UserFName: text })}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Birthday</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            {showPicker && (
                                <DateTimePicker
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={onChange}
                                />
                            )}

                            {!showPicker && (
                                <Pressable
                                onPress={toggleDatePicker}
                                >
                                    <TextInput
                                        placeholder='YYYY-MM-DD'
                                        placeholderTextColor={COLORS.black}
                                        value={Birthday}
                                        onChangeText={setBirthday}
                                        editable={false}
                                        style={{
                                            width: "100%"
                                        }}
                                    />
                                </Pressable>
                            )}
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Age</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Age'
                                placeholderTextColor={COLORS.black}
                                value={formData.Age}
                                onChangeText={(text) => setFormData({ ...formData, Age: text })}
                                keyboardType='numeric'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Email address</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Enter your email address'
                                placeholderTextColor={COLORS.black}
                                value={formData.UserEmail}
                                onChangeText={(text) => setFormData({ ...formData, UserEmail: text })}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Password</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Enter your password'
                                placeholderTextColor={COLORS.black}
                                value={formData.UserPassword}
                                onChangeText={(text) => setFormData({ ...formData, UserPassword: text })}
                                secureTextEntry={isPasswordShown}
                                style={{
                                    width: "100%"
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 6
                    }}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.bg : undefined}
                        />

                        <Text>I aggree to the terms and conditions</Text>
                    </View>

                    <Button
                        title="Sign Up"
                        filled
                        onPress={handleSignUp}
                        style={{
                            marginTop: 18,
                            marginBottom: 4,
                        }}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                        <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => console.log("Pressed")}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 52,
                                borderWidth: 1,
                                borderColor: COLORS.grey,
                                marginRight: 4,
                                borderRadius: 10
                            }}
                        >
                            <Image
                                source={require("../assets/facebook.png")}
                                style={{
                                    height: 36,
                                    width: 36,
                                    marginRight: 8
                                }}
                                resizeMode='contain'
                            />

                            <Text>Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => console.log("Pressed")}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 52,
                                borderWidth: 1,
                                borderColor: COLORS.grey,
                                marginRight: 4,
                                borderRadius: 10
                            }}
                        >
                            <Image
                                source={require("../assets/google.png")}
                                style={{
                                    height: 36,
                                    width: 36,
                                    marginRight: 8
                                }}
                                resizeMode='contain'
                            />

                            <Text>Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 22
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.darkerBg,
                                fontWeight: "bold",
                                marginLeft: 6
                            }}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup