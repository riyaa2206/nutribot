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
import { globalStyles, colors } from '../styles/globalStyles'; export default function SignupScreen() {
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { login } = useAuth();

    const isEmail = (input: string) => {
        return input.includes('@');
    };

    const handleSignup = async () => {
        if (!name.trim() || !emailOrPhone.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const payload: any = {
                name: name,
                password: password,
            };

            if (isEmail(emailOrPhone)) {
                payload.email = emailOrPhone;
            } else {
                payload.phone = emailOrPhone;
            }

            const response = await Raxios.post('/nuser', payload);

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
                Alert.alert('Error', 'Signup failed');
            }
        } catch (error: any) {
            console.error('Signup error:', error);
            Alert.alert('Error', error.response?.data?.msg || 'Failed to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('Login' as never);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={globalStyles.container}
        >
            <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
                <View style={globalStyles.content}>
                    <Text style={globalStyles.titleLarge}>NUTRIBOT</Text>
                    <Text style={globalStyles.subtitle}>Create your account</Text>

                    <View style={globalStyles.form}>
                        <Text style={globalStyles.label}>Name</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />

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

                        <Text style={globalStyles.label}>Confirm Password</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={[globalStyles.button, loading && globalStyles.buttonDisabled]}
                            onPress={handleSignup}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={colors.white} />
                            ) : (
                                <Text style={globalStyles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        <View style={globalStyles.linkContainer}>
                            <Text style={globalStyles.linkText}>Already have an account? </Text>
                            <TouchableOpacity onPress={navigateToLogin}>
                                <Text style={globalStyles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
