import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Raxios from '../utils/axiosHelper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; export default function SignupScreen() {
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
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={styles.title}>NUTRIBOT</Text>
                    <Text style={styles.subtitle}>Create your account</Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />

                        <Text style={styles.label}>Email or Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email or phone number"
                            value={emailOrPhone}
                            onChangeText={setEmailOrPhone}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleSignup}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={navigateToLogin}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3b82f6',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        color: '#374151',
    },
    button: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    loginText: {
        color: '#6b7280',
        fontSize: 14,
    },
    loginLink: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '600',
    },
});
