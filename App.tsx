import './services/firebase';
import { getLessons } from './services/firebasedb';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import DateSlider from './components/date_slider';
import LessonList from './components/lesson_list';
import theme from './assets/themes';
import { lessonsToday } from './services/lessonsService';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [lessons, setLessons] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const colorSchema = useColorScheme();
  const themeContainer = colorSchema === 'light' ? styles.container_light 
  : styles.container_dark;
  const themeLesssonsContainer = colorSchema === 'light' ? styles.lesson_conteiner_light 
  : styles.lesson_conteiner_dark;


  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(AntDesign.font);
        await Font.loadAsync({
          eUkraineBold: require('./assets/fonts/e-Ukraine/e-Ukraine-Bold.otf'),
          eUkraineMedium: require('./assets/fonts/e-Ukraine/e-Ukraine-Medium.otf'),
          eUkraineRegular: require('./assets/fonts/e-Ukraine/e-Ukraine-Regular.otf'),
        });
        setLessons(await getLessons());
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    } 

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      setIndex(lessonsToday(lessons));
    }
  }, [appIsReady]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setLessons(await getLessons());
    setRefreshing(false);
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={[styles.container, themeContainer]} onLayout={onLayoutRootView}>
      <StatusBar style='auto'/>
      <View style={styles.today}>
        <Moment element={Text} style={ colorSchema === 'light' 
          ? styles.today_day_light 
          : styles.today_day_dark } format='D'></Moment>
        <View style={styles.today_column}>
          <Moment element={Text} style={styles.today_day_week} format='dddd'></Moment>
          <Moment element={Text} style={styles.today_month_year} format='MMMM YYYY'></Moment>
        </View>
        <TouchableOpacity style={styles.today_button_conteiner} onPress={() => { setIndex(lessonsToday(lessons)) }}>
          <Text style={styles.today_button_text}>Сьогодні</Text>
        </TouchableOpacity>
      </View>
        <View style={[styles.lesson_conteiner, themeLesssonsContainer]}>
          <DateSlider data={lessons} index={index} setIndex={setIndex} />
          <LessonList data={lessons} index={index} setIndex={setIndex} onRefresh={onRefresh} refreshing={refreshing} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1
  },
  container_light: {
    backgroundColor: '#faf9f9',
  },
  container_dark: {
    backgroundColor: theme.colors.gray2,
  },
  today: {
    margin: 20,
    flexDirection: 'row',
  },
  today_day_light: {
    ...theme.textVariants.body1,
    alignSelf: 'center',
    marginRight: 8,
    color: '#000'
  },
  today_day_dark: {
    ...theme.textVariants.body1,
    alignSelf: 'center',
    marginRight: 8,
    color: '#fff'
  },
  today_column: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  today_day_week: {
    ...theme.textVariants.body4,
    textTransform: 'capitalize',
    color: theme.colors.gray,
  },
  today_month_year: {
    ...theme.textVariants.body4,
    textTransform: 'capitalize',
    color: theme.colors.gray,
  },
  today_button_conteiner: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  today_button_text: {
    ...theme.textVariants.h1,
    color: theme.colors.blueGray,
    backgroundColor: 'rgba(52, 79, 179, 0.1)',
    borderRadius: 10,
    padding: 8,
  },
  lesson_conteiner: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
  lesson_conteiner_light: {
    backgroundColor: theme.colors.white,
  },  
  lesson_conteiner_dark: {
    backgroundColor: theme.colors.gray3,
  }
});
