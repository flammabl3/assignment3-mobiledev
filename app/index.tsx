import CallAPI from "../components/CallAPI";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import ModalSelector from "react-native-modal-selector";

type MonthOption = { key: number; label: string };

export default function Index() {
  const [selectedMonth, setSelectedMonth] = useState<MonthOption | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Example months array
  const months = [
    { key: 0, label: "January", days: 31 },
    { key: 1, label: "February", days: 29 },
    { key: 2, label: "March", days: 31 },
    { key: 3, label: "April", days: 30 },
    { key: 4, label: "May", days: 31 },
    { key: 5, label: "June", days: 30 },
    { key: 6, label: "July", days: 31 },
    { key: 7, label: "August", days: 31 },
    { key: 8, label: "September", days: 30 },
    { key: 9, label: "October", days: 31 },
    { key: 10, label: "November", days: 30 },
    { key: 11, label: "December", days: 31 },
  ];

  // Generate day options based on the current month
  const generateDayOptions = (): MonthOption[] => {
    if (!selectedMonth) return [];
    const daysArray = [];
    for (let i = 1; i <= months[selectedMonth.key].days; i++) {
      daysArray.push({ key: i, label: i.toString() });
    }
    return daysArray;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a date:</Text>

      {/* Month selection drop-down */}
      <ModalSelector
        data={months}
        initValue="Select a month"
        onChange={(option: MonthOption) => {
          setSelectedMonth(option);
          // auto-set day to null or first day, if you prefer
          setSelectedDay(null);
        }}
        style={styles.selector}
        selectStyle={styles.selectBox}
        selectTextStyle={styles.selectText}
      />

      {/* Day selection drop-down (only shows days for selected month) */}
      <ModalSelector
        data={generateDayOptions()}
        initValue="Select a day"
        onChange={(option: MonthOption) => {
          setSelectedDay(option.key);
        }}
        style={styles.selector}
        selectStyle={styles.selectBox}
        selectTextStyle={styles.selectText}
      />

      {/* Example usage: pass selected data to CallAPI */}
      {selectedMonth && selectedDay && (
        <CallAPI
          requestDate={
            new Date(new Date().getFullYear(), selectedMonth.key, selectedDay)
          }
        />
      )}

      <View style={styles.infoContainer}>
        <Text>Selected Month: {selectedMonth?.label || "None"}</Text>
        <Text>Selected Day: {selectedDay || "None"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  selector: {
    marginBottom: 15,
    width: 200,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
