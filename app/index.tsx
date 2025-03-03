import CallAPI from "../components/CallAPI";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ModalSelector from "react-native-modal-selector";

type MonthOption = { key: number; label: string };

export default function Index() {
  const [selectedMonth, setSelectedMonth] = useState<MonthOption | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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
      <Text style={styles.title}>Select a Date</Text>

      <ModalSelector
        data={months}
        initValue={selectedMonth ? selectedMonth.label : "Select a Month"}
        onChange={(option: MonthOption) => {
          setSelectedMonth(option);
          setSelectedDay(null);
        }}
        style={styles.selector}
        selectStyle={styles.selectBox}
        selectTextStyle={styles.selectText}
        initValueTextStyle={styles.initText} // Darker placeholder text
      />

      <ModalSelector
        data={generateDayOptions()}
        initValue={selectedDay ? selectedDay.toString() : "Select a Day"}
        onChange={(option: MonthOption) => setSelectedDay(option.key)}
        style={styles.selector}
        selectStyle={styles.selectBox}
        selectTextStyle={styles.selectText}
        initValueTextStyle={styles.initText} 
      />

      {selectedMonth && selectedDay && (
        <View style={styles.apiContainer}>
          <CallAPI
            requestDate={new Date(
              new Date().getFullYear(),
              selectedMonth.key,
              selectedDay
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  selector: {
    marginBottom: 15,
    width: 220,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  initText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  apiContainer: {
    marginTop: 20,
    padding: 15,
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});
