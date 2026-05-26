import React, { useState } from 'react';

import {
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import { createShow } from '../services/adminService';
import styles from '../styles/AdminAddShowScreen.styles';
import HelperBox, { HelperText } from '../components/HelperBox';

export default function AdminAddShowScreen({ navigation }) {
    const [theatreId, setTheatreId] = useState('1');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [ageRating, setAgeRating] = useState('');

    const [submitting, setSubmitting] = useState(false);

    const handleCreateShow = async () => {
        if (submitting) {
        return;
        }

        try {
        if (!theatreId || !title || !duration) {
            Alert.alert('Error', 'Theatre ID, title and duration are required');
            return;
        }

        setSubmitting(true);

        const result = await createShow({
            theatre_id: Number(theatreId),
            title,
            description,
            duration: Number(duration),
            age_rating: ageRating
        });

        if (result.success) {
            Alert.alert(
            'Success',
            'Show created successfully',
            [
                {
                text: 'OK',
                onPress: () => navigation.goBack()
                }
            ]
            );
        }

        } catch (error) {
        Alert.alert(
            'Create show failed',
            error.response?.data?.message || error.message || 'Something went wrong'
        );

        } finally {
        setSubmitting(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Add Show</Text>
        <Text style={styles.subtitle}>Create a new theatre performance</Text>
        
        <HelperBox>
            <HelperText>Theatre ID: Use an existing theatre ID.</HelperText>
            <HelperText>1 - Royal Theatre</HelperText>
            <HelperText>2 - Athens Drama Hall</HelperText>
            <HelperText>Royal Theatre: Main Hall, Stage A</HelperText>
            <HelperText>Athens Drama Hall: Opera Hall</HelperText>
        </HelperBox>

        <TextInput
            style={styles.input}
            placeholder="Theatre ID (1 or 2)"
            placeholderTextColor="#888"
            value={theatreId}
            onChangeText={setTheatreId}
            keyboardType="numeric"
            editable={!submitting}
        />

        <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
            editable={!submitting}
        />

        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
            editable={!submitting}
        />

        <TextInput
            style={styles.input}
            placeholder="Duration in minutes"
            placeholderTextColor="#888"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            editable={!submitting}
        />

        <TextInput
            style={styles.input}
            placeholder="Age Rating e.g. 12+"
            placeholderTextColor="#888"
            value={ageRating}
            onChangeText={setAgeRating}
            editable={!submitting}
        />

        <TouchableOpacity
            style={[
            styles.button,
            submitting && styles.buttonDisabled
            ]}
            onPress={handleCreateShow}
            disabled={submitting}
        >
            <Text style={styles.buttonText}>
            {submitting ? 'Creating...' : 'Create Show'}
            </Text>
        </TouchableOpacity>
        </ScrollView>
    );
}