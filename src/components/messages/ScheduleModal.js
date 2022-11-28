import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ModalCard } from "../ModalCard";
import SeparatorLine from "../SeparatorLine";
import colors from "../../constants/colors";

export default function ScheduleModal({
  scheduleModalVisible,
  setScheduleModalVisible,
  handleSchedule,
  showScheduleModal,
  setScheduledDateTime,
}) {
  const onSchedulePress = () => {
    setScheduleModalVisible(false);
    handleSchedule();
  };

  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === "ios");
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShowTime(true);
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  //

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDate(true);
  };

  function formatDate(date) {
    var output = date.toDateString();
    return output;
  }

  useEffect(() => {
    setScheduledDateTime(CombineDateAndTime(date, time));
  }, [date]);

  useEffect(() => {
    setScheduledDateTime(CombineDateAndTime(date, time));
  }, [time]);

  function CombineDateAndTime(date, time) {
    var hours = time.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    var minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var timeString = hours + ":" + minutes + ":00";
    var ampm = time.getHours() >= 12 ? "PM" : "AM";
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    if (month < 10) {
      month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var dateString = "" + year + "-" + month + "-" + day;
    var datec = dateString + "T" + timeString;
    // console.log('datec', datec);
    var combined = new Date(datec);
    return combined;
  }

  return (
    <ModalCard
      title="Schedule Message"
      visible={scheduleModalVisible}
      onPressClose={showScheduleModal}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker}>
          <View style={styles.rowScheduleTime}>
            <Text style={styles.rowScheduleLabel}>Date</Text>
            <Text style={styles.rowScheduleValue}>
              {formatDate(date).slice(4)}
            </Text>
          </View>
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={false}
              display="spinner"
              onChange={onChangeDate}
            />
          )}
        </TouchableOpacity>
        <SeparatorLine />
        <TouchableOpacity onPress={showTimepicker}>
          <View style={styles.rowScheduleTime}>
            <Text style={styles.rowScheduleLabel}>Time</Text>
            <Text style={styles.rowScheduleValue}>{formatAMPM(time)}</Text>
          </View>
          {showTime && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
        <SeparatorLine />
        <TouchableOpacity
          style={styles.sendBtnSchedule}
          onPress={() => onSchedulePress()}
        >
          <Text style={styles.sendBtnTextSchedule}>Schedule Message</Text>
        </TouchableOpacity>
      </View>
    </ModalCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerTextSchedule: {
    width: 267,
    color: colors.textPrimary,
    fontFamily: "Lato-Regular",
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 24,
  },
  rowScheduleTime: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  rowScheduleLabel: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.label,
    alignSelf: "center",
  },
  rowScheduleValue: {
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    color: colors.placeholderText,
    fontSize: 16,
  },
  sendBtnSchedule: {
    width: "65%",
    borderRadius: 5,
    backgroundColor: colors.primary,
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  sendBtnTextSchedule: {
    color: colors.white,
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 18,
  },
});
