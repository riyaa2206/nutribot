import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Raxios from '../utils/axiosHelper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { globalStyles, colors } from '../styles/globalStyles'; export default function LoginScreen() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { login } = useAuth();

    const isEmail = (input: string) => {
        return input.includes('@');
    };

    const handleLogin = async () => {
        if (!emailOrPhone.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const payload: any = {
                password: password,
            };

            if (isEmail(emailOrPhone)) {
                payload.email = emailOrPhone;
            } else {
                payload.phone = emailOrPhone;
            }

            const response = await Raxios.post('/nlogin', payload);

            if (response.data.status === 'SUCCESS') {
                const { access, refresh } = response.data.data.tokens;

                // Store tokens using AuthContext
                await login(access, refresh, response.data.data._id, response.data.data.name);

                // Store phone or email separately
                if (response.data.data.phone) {
                    await AsyncStorage.setItem('user_phone', response.data.data.phone);
                }
                if (response.data.data.email) {
                    await AsyncStorage.setItem('user_email', response.data.data.email);
                }

                Alert.alert('Success', response.data.msg);

                // Navigation will automatically happen due to auth state change
            } else {
                Alert.alert('Error', 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                response: error.response?.data,
                config: error.config?.url
            });

            let errorMessage = 'Failed to login. Please try again.';

            if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                errorMessage = 'Cannot connect to server. Please check your internet connection or ensure the backend server is running.';
            } else if (error.response?.data?.msg) {
                errorMessage = error.response.data.msg;
            }

            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const navigateToSignup = () => {
        navigation.navigate('Signup' as never);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={globalStyles.container}
        >
            <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
                <View style={globalStyles.content}>
                    <Text style={globalStyles.titleLarge}>NUTRIBOT</Text>
                    <Text style={globalStyles.subtitle}>Login to your account</Text>

                    <View style={globalStyles.form}>
                        <Text style={globalStyles.label}>Email or Phone</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Enter email or phone number"
                            value={emailOrPhone}
                            onChangeText={setEmailOrPhone}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <Text style={globalStyles.label}>Password</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={[globalStyles.button, loading && globalStyles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={colors.white} />
                            ) : (
                                <Text style={globalStyles.buttonText}>Login</Text>
                            )}
                        </TouchableOpacity>

                        <View style={globalStyles.linkContainer}>
                            <Text style={globalStyles.linkText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={navigateToSignup}>
                                <Text style={globalStyles.link}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
