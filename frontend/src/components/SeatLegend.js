import React from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function SeatLegend() {
    return (
        <View style={styles.legend}>
        <View>
            <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.availableSeat]} />
            <Text style={styles.legendText}>Available</Text>
            </View>

            <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.reservedSeat]} />
            <Text style={styles.legendText}>Reserved</Text>
            </View>
        </View>

        <View>
            <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.selectedSeat]} />
            <Text style={styles.legendText}>Selected</Text>
            </View>

            <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.premiumLegend]} />
            <Text style={styles.legendText}>Premium</Text>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 22,
        marginTop: 8
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    legendBox: {
        width: 18,
        height: 18,
        borderRadius: 5,
        marginRight: 8
    },
    legendText: {
        color: '#aaa',
        fontSize: 13
    },
    availableSeat: {
        backgroundColor: '#3a3a3a'
    },
    selectedSeat: {
        backgroundColor: '#8E44AD'
    },
    reservedSeat: {
        backgroundColor: '#8B0000'
    },
    premiumLegend: {
        backgroundColor: '#3a3a3a',
        borderWidth: 2,
        borderColor: '#D4AF37'
    }
});