import React, { useEffect, useState } from 'react';

import {
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import { createShowtime } from '../services/adminService';
import { getShows } from '../services/showService';

import styles from '../styles/AdminAddShowtimeScreen.styles';
import HelperBox, { HelperText } from '../components/HelperBox';

export default function AdminAddShowtimeScreen({ navigation }) {
    const [showId, setShowId] = useState('');
    const [hall, setHall] = useState('');
    const [showDate, setShowDate] = useState('');
    const [showTime, setShowTime] = useState('');
    const [price, setPrice] = useState('');

    const [shows, setShows] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const hallsByTheatre = {
        1: ['Main Hall', 'Stage A'],
        2: ['Opera Hall']
    };

    const fetchShows = async () => {
        try {
            const result = await getShows();

            if (result.success) {
                setShows(result.data || []);
            }
        } catch (error) {
            Alert.alert(
                'Error',
                error.response?.data?.message || error.message || 'Failed to load shows for input guide'
            );
        }
    };

    useEffect(() => {
        fetchShows();
    }, []);

    const getSelectedShow = () => {
        return shows.find(show => show.show_id === Number(showId));
    };

    const validateForm = () => {
        const newErrors = {};

        const selectedShow = getSelectedShow();

        if (!showId.trim()) {
            newErrors.showId = 'Show ID is required.';
        } else if (Number.isNaN(Number(showId)) || Number(showId) <= 0) {
            newErrors.showId = 'Show ID must be a valid positive number.';
        } else if (!selectedShow) {
            newErrors.showId = 'Show ID does not exist. Check the input guide above.';
        }

        if (!hall.trim()) {
            newErrors.hall = 'Hall is required. Example: Main Hall';
        } else if (selectedShow) {
            const availableHalls = hallsByTheatre[selectedShow.theatre_id] || [];

            if (!availableHalls.includes(hall.trim())) {
                newErrors.hall = `Invalid hall for this show. Available halls: ${availableHalls.join(', ')}`;
            }
        }

        if (!showDate.trim()) {
            newErrors.showDate = 'Date is required.';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(showDate)) {
            newErrors.showDate = 'Date must use YYYY-MM-DD format. Example: 2026-06-20';
        }

        if (!showTime.trim()) {
            newErrors.showTime = 'Time is required.';
        } else if (!/^\d{2}:\d{2}(:\d{2})?$/.test(showTime)) {
            newErrors.showTime = 'Time must use HH:MM or HH:MM:SS format. Example: 20:30:00';
        }

        if (!price.trim()) {
            newErrors.price = 'Price is required.';
        } else if (Number.isNaN(Number(price)) || Number(price) <= 0) {
            newErrors.price = 'Price must be a valid positive number.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleCreateShowtime = async () => {
        if (submitting) {
            return;
        }

        try {
            const isValid = validateForm();

            if (!isValid) {
                Alert.alert('Invalid input', 'Please fix the highlighted fields.');
                return;
            }

            setSubmitting(true);

            const result = await createShowtime({
                show_id: Number(showId),
                hall: hall.trim(),
                show_date: showDate.trim(),
                show_time: showTime.length === 5 ? `${showTime}:00` : showTime.trim(),
                price: Number(price)
            });

            if (result.success) {
                Alert.alert(
                    'Success',
                    'Showtime created successfully',
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
                'Create showtime failed',
                error.response?.data?.message || error.message || 'Something went wrong'
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add Showtime</Text>
            <Text style={styles.subtitle}>Create a new performance session</Text>

            <HelperBox>
                <HelperText>Available shows:</HelperText>

                {shows.length === 0 ? (
                    <HelperText>• Loading shows...</HelperText>
                ) : (
                    shows.map(show => (
                    <HelperText key={show.show_id}>
                        • {show.show_id} - {show.title} - {show.theatre_name}
                    </HelperText>
                    ))
                )}

                <HelperText>Available theatres:</HelperText>
                <HelperText>• 1 - Royal Theatre</HelperText>
                <HelperText>• 2 - Athens Drama Hall</HelperText>

                <HelperText>Available halls:</HelperText>
                <HelperText>• Royal Theatre: Main Hall, Stage A</HelperText>
                <HelperText>• Athens Drama Hall: Opera Hall</HelperText>
            </HelperBox>

            <TextInput
                style={styles.input}
                placeholder="Show ID e.g. 1"
                placeholderTextColor="#888"
                value={showId}
                onChangeText={(value) => {
                    setShowId(value);
                    setErrors(prev => ({ ...prev, showId: null, hall: null }));
                }}
                keyboardType="numeric"
                editable={!submitting}
            />
            {errors.showId && <Text style={styles.errorText}>{errors.showId}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Hall e.g. Main Hall"
                placeholderTextColor="#888"
                value={hall}
                onChangeText={(value) => {
                    setHall(value);
                    setErrors(prev => ({ ...prev, hall: null }));
                }}
                editable={!submitting}
            />
            {errors.hall && <Text style={styles.errorText}>{errors.hall}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Date e.g. 2026-06-20"
                placeholderTextColor="#888"
                value={showDate}
                onChangeText={(value) => {
                    setShowDate(value);
                    setErrors(prev => ({ ...prev, showDate: null }));
                }}
                editable={!submitting}
            />
            {errors.showDate && <Text style={styles.errorText}>{errors.showDate}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Time e.g. 20:30:00"
                placeholderTextColor="#888"
                value={showTime}
                onChangeText={(value) => {
                    setShowTime(value);
                    setErrors(prev => ({ ...prev, showTime: null }));
                }}
                editable={!submitting}
            />
            {errors.showTime && <Text style={styles.errorText}>{errors.showTime}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Price e.g. 18"
                placeholderTextColor="#888"
                value={price}
                onChangeText={(value) => {
                    setPrice(value);
                    setErrors(prev => ({ ...prev, price: null }));
                }}
                keyboardType="numeric"
                editable={!submitting}
            />
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

            <TouchableOpacity
                style={[
                    styles.button,
                    submitting && styles.buttonDisabled
                ]}
                onPress={handleCreateShowtime}
                disabled={submitting}
            >
                <Text style={styles.buttonText}>
                    {submitting ? 'Creating...' : 'Create Showtime'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}