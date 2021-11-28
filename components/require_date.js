import React, { useState, useEffect} from 'react';
import { Text, View} from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';


export const Day = (Value) =>{
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    const CurrentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + Value.index);
    
    if(Value.slider){
        return <Moment element={Text} locale='uk' format='D' style={styles.day}>{CurrentDate}</Moment>
    } else{
        return <Moment element={Text} locale='uk' format='D'>{CurrentDate}</Moment>
    }
}

export const DayWeek = (value) => {
    const [date, setdayweek] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setdayweek(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    if(value.index == 1){
        const CurrentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value.minus);
        return <Moment element={Text} locale='uk' format='dd' style ={styles.today_day_week}>{CurrentDate}</Moment>;
    }

    return <Moment element={Text} locale='uk' format='dddd'>{date}</Moment>;
}

export const MonthYear = () => {
    const [monthyear, setmonthyear] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setmonthyear(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);
    return <Moment element={Text} locale='uk' format='MMMM YYYY' >{monthyear}</Moment>;
}


const styles = {
    today_day_week: {
        display: 'flex',
        color: '#BCC1CD',
        fontSize: 12,
        zIndex: 2,
      },
    day:{
        fontWeight: 'bold',
        fontSize: 15,
        zIndex: 2,
        color: 'black',
    },
}