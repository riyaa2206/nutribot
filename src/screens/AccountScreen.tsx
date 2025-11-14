import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../context/AuthContext';
import { globalStyles, colors } from '../styles/globalStyles';

export default function AccountScreen() {
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [userId, setUserId] = useState('');
    const { logout } = useAuth();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const storedName = await AsyncStorage.getItem('user_name');
            const storedUserId = await AsyncStorage.getItem('user_id');
            const storedPhone = await AsyncStorage.getItem('user_phone');
            const storedEmail = await AsyncStorage.getItem('user_email');

            if (storedName) setName(storedName);
            if (storedUserId) setUserId(storedUserId);
            if (storedPhone) setEmailOrPhone(storedPhone);
            else if (storedEmail) setEmailOrPhone(storedEmail);
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoadingUserData(false);
        }
    };

    const isEmail = (input: string) => {
        return input.includes('@');
    };

    const handleUpdateProfile = async () => {
        if (!name.trim() || !emailOrPhone.trim()) {
            Alert.alert('Error', 'Please fill in name and email/phone');
            return;
        }

        if (password && password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password && password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const payload: any = {
                name: name,
            };

            // Include _id if updating email or phone
            if (userId) {
                payload._id = userId;
            }

            if (isEmail(emailOrPhone)) {
                payload.email = emailOrPhone;
            } else {
                payload.phone = emailOrPhone;
            }

            // Only include password if it's being updated
            if (password) {
                payload.password = password;
            }
            const response = await Raxios.post('/nuser', payload);

            if (response.data.status === 'SUCCESS') {
                // Update stored user data
                await AsyncStorage.setItem('user_name', response.data.data.name);
                if (response.data.data.phone) {
                    await AsyncStorage.setItem('user_phone', response.data.data.phone);
                }
                if (response.data.data.email) {
                    await AsyncStorage.setItem('user_email', response.data.data.email);
                }

                Alert.alert('Success', response.data.msg);

                // Clear password fields after successful update
                setPassword('');
                setConfirmPassword('');
            } else {
                Alert.alert('Error', 'Update failed');
            }
        } catch (error: any) {
            console.error('Update error:', error);
            Alert.alert('Error', error.response?.data?.msg || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        }
                    },
                },
            ]
        );
    };

    if (loadingUserData) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={globalStyles.container}
        >
            <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
                <View style={globalStyles.content}>
                    <Text style={globalStyles.title}>Account Settings</Text>
                    <Text style={globalStyles.subtitle}>Update your profile information</Text>

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

                        <Text style={globalStyles.label}>New Password (optional)</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Enter new password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <Text style={globalStyles.label}>Confirm New Password</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={[globalStyles.button, loading && globalStyles.buttonDisabled]}
                            onPress={handleUpdateProfile}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={colors.white} />
                            ) : (
                                <Text style={globalStyles.buttonText}>Update Profile</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={globalStyles.dangerButton}
                            onPress={handleLogout}
                        >
                            <Text style={globalStyles.dangerButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
