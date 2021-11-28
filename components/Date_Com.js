import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DataSlider = (props) => {
    const isSelect = props.select;
    return (

        <View style={[isSelect ? styles.date_slider_select_day : styles.date_slider_day]}>
            <Text style={[isSelect ? styles.date_slider_select_day_week : styles.date_slider_day_week]}>{props.day_week}</Text>
            <Text style={[isSelect ? styles.date_slider_select_day_number : styles.date_slider_day_number]}>{props.day_number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    date_slider_day: {
        alignItems: 'center',
        flex: 1,
    },
    date_slider_select_day: {
        backgroundColor: '#FF7648',
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
    },
    date_slider_day_week: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 12,
        color: '#BCC1CD'
    },
    date_slider_day_number: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
    },
    date_slider_select_day_week: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 12,
        color: '#ffff',
    },
    date_slider_select_day_number: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: '#ffff',
    },
});

export default DataSlider;