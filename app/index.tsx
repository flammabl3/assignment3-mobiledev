import CallAPI from '../components/CallAPI';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

export default function Index() {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  type Month = {
    name: string,
    days: number
  }

  const months = [
    {name: "January", days: 31},
    {name: "February", days: 29}, // February can always be assumed to have 29 days possible
    {name: "March", days: 31},
    {name: "April", days: 30},
    {name: "May", days: 31},
    {name: "June", days: 30},
    {name: "July", days: 31},
    {name: "August", days: 31},
    {name: "September", days: 30},
    {name: "October", days: 31},
    {name: "November", days: 30},
    {name: "December", days: 31}
  ];


  /* Each Month has a different number of days. Get the number of days in the current month and generate a Picker.Item
   *  for each day in the month. 
   */
  const generatePickerDates = () => {
    
    let dayItems = [];
    let daysInThisMonth : number = months[selectedDate.getMonth()].days;

    for (let i = 1; i <= daysInThisMonth; i++) {
      dayItems.push(
        <Picker.Item key={i} label={i.toString()} value={i} />
      );
    }
    
    return dayItems;
  }

  const generatePickerMonths = () => {
    let monthItems = [];
    for (let i = 0; i < months.length; i++) {
      monthItems.push(
        <Picker.Item key={i} label={months[i].name} value={i} />
      );
    }
    
    return monthItems;
  }

  return (
    <View style={styles.container}>
      <Picker
        style={styles.monthPicker}
        selectedValue={selectedDate.getMonth()}
        onValueChange={(itemValue) => {
          /* Non-existent dates like February 31st will cause a mismatch between selectedDate and the new date. Thus rollback to the last month.
           * Modify the date of the current selectedDate. Then create a new date object with the modified date. Finally set the
             state to be a new Date() object using the old date in the constructor. Using a simple type object would be better...*/
             const newDate = new Date(selectedDate.getFullYear(), itemValue, selectedDate.getDate());
             if (newDate.getMonth() !== itemValue) {
               newDate.setDate(0); // Roll back to the last day of the previous month
             }
             setSelectedDate(newDate);
        }}>
        {generatePickerMonths()}
      </Picker>
      <Picker
        style={styles.monthPicker}
        selectedValue={selectedDate.getDate()}
        onValueChange={(itemValue) =>
          // see above picker for logic
          setSelectedDate(new Date(selectedDate.setDate(itemValue)))
        }>
        {generatePickerDates()}
      </Picker>
      <CallAPI requestDate={selectedDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthPicker: {
    height: 70, 
    width: 200 
  },
});
