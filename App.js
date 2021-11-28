import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef} from 'react';
import {Day, DayWeek, MonthYear} from './Components/require_date.js';

import {
  findNodeHandle,
  View,
  StyleSheet, 
  Text, 
  Dimensions, 
  FlatList, 
  Animated,
  Image,
  interpolate,
  TouchableOpacity,
} from 'react-native';


const {width, height} = Dimensions.get('screen');

var Days = {
  0: 
    'https://cs9.pikabu.ru/post_img/big/2019/11/21/8/1574343494192231267.jpg',
  1:
    'https://i02.appmifile.com/images/2019/09/13/94491275-f85c-4da6-bbbb-3e99f948a8fc.jpg',
  2:
    'https://i02.appmifile.com/images/2019/09/13/94491275-f85c-4da6-bbbb-3e99f948a8fc.jpg',
  3:
    'https://i02.appmifile.com/images/2019/09/13/94491275-f85c-4da6-bbbb-3e99f948a8fc.jpg',
  4:
    'https://i02.appmifile.com/images/2019/09/13/94491275-f85c-4da6-bbbb-3e99f948a8fc.jpg',
  5:
    'https://i02.appmifile.com/images/2019/09/13/94491275-f85c-4da6-bbbb-3e99f948a8fc.jpg',
  6:
    'https://i02.appmifile.com/images/2019/09/13/94491275-f85c-4da6-bbbb-3e99f948a8fc.jpg'
};

var data = Object.keys(Days).map((i) => ({
  key: i,
  title: i,
  Day: Days[i],
  ref: React.createRef(),
}));

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress ={onItemPress}>
      <View ref = {ref}>
        <Text style={styles.date_slider}>
          <DayWeek index = {1} minus = {item.title - 0}/>{"\n"}
          <Day index={item.title - 0} slider={true}/>
        </Text>
      </View>
    </TouchableOpacity>
  );
});


const Indicator = ({measures, scrollX}) =>{
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style = {{
        position: 'absolute',
        height: 40,
        width: indicatorWidth,
        left: translateX,
        bottom: 15,
        borderRadius: 10,
        flex: 1,
        borderWidth: 3,
        borderColor:'#FF7648',
      }}
    />
  )
}

const Tabs = ({data, scrollX, onItemPress}) =>{
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();
  React.useEffect(()=>{
    let m = [];
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current, 
        (x, y, width, height) => {
          m.push({
            x, 
            y, 
            width, 
            height,
          });

          if(m.length === data.length){
            setMeasures(m);
          }
      }
    );
  });
}, []);

return (
  <View style ={{position: 'absolute', top: 100, width}}> 
    <View
      ref={containerRef}
      style ={styles.tabs}
    >
      {data.map((item, index) => {
        return <Tab key={item.key} item={item} ref={item.ref} onItemPress={() => onItemPress(index)}/>
      })}
    </View>
      {measures.length > 0 && (
      <Indicator measures={measures} scrollX={scrollX}/>
      )}
  </View>
  )
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width
    })
  })

  return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.today}>
          <Text style={styles.today_day}><Day index={0}></Day></Text>
          <View style={styles.today_column}>
            <Text style={styles.today_day_week}><DayWeek></DayWeek></Text>
            <Text style={styles.today_year}><MonthYear></MonthYear></Text>
          </View>
          <View style={styles.day_select_conteiner}>
            <Text style={styles.day_select_text}>Сьогодні</Text>
          </View>
        </View>
        <View style={styles.lessons}>
          <Text style={styles.lesson_text}>Час</Text>
          <Text style={styles.lesson_text}>Пари</Text>
        </View>
        <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress}/>
        <Animated.FlatList 
          ref={ref}
          data={data}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator = {false}
          pagingEnabled
          onScroll={
            Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )
          }
          renderItem={({item}) => {
            return <View style ={{width, height}}>
              <Image 
                source = {{uri: item.Day}} 
                style={{height: '80%',  top: 50}}/>
            </View>
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
  },

  lessons: {
    backgroundColor: 'white',
    display: 'flex',
    left: 20,
    flexDirection: 'row',
  },
  lesson_text: {
    top: 40,
    fontSize: 17,
    paddingRight: 50,
    color: '#BCC1CD',
  },

  tabs:{
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row',
  },

  date_slider: {
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 32,
    borderTopStartRadius: 32,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderColor: '#FAF9F9',
    color: 'black',
  },

  today: {
    backgroundColor: '#faf9f9',
    paddingBottom: 40,
    paddingLeft: 30,
    paddingTop: 20,
    alignItems: 'flex-start',
    paddingRight: 180,
    flexDirection: 'row',
    fontSize: 30,
    display: 'flex',
  },

  today_day: {
    display: 'flex',
    fontSize: 50,
    color: '#212525',
  },
  today_column: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    paddingLeft: 8,
    bottom: 4,
    fontSize: 40,
  },
  today_day_week: {
    display: 'flex',
    lineHeight: 21,
    color: '#BCC1CD',
    fontSize: 20,
    paddingTop: 10,
  },
  today_year: {
    display: 'flex',
    lineHeight: 21,
    color: '#BCC1CD',
    fontSize: 20,
  },
  day_select_text: {
    display: 'flex',
    position: 'absolute',
    fontSize: 20,
    color: '#4DC591',
    backgroundColor: 'rgba(77, 197, 145, 0.1)',
    borderRadius: 9,
    left: 50,
    top: 20,
    padding: 5,
  },
});