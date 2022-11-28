import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../constants/colors";
import ScheduleModal from "./ScheduleModal";

export default function NewMessageOptionButtons({
  onSendPress,
  setScheduledTimestamp,
  mode = "new",
}) {
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);

  const showScheduleModal = () => {
    setScheduleModalVisible(!scheduleModalVisible);
  };

  const handleSchedule = () => {
    onSendPress(false, true);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity style={styles.sendBtn} onPress={showScheduleModal}>
          <Text style={styles.sendText}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => onSendPress(false, false)}
        >
          <Text style={styles.sendText}>
            {mode === "edit" ? "Update" : "Send"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.saveAsDraftBtn}
        onPress={() => onSendPress(true, false)}
      >
        <Text style={styles.draftText}>Save as Draft</Text>
      </TouchableOpacity>
      <ScheduleModal
        handleSchedule={handleSchedule}
        scheduleModalVisible={scheduleModalVisible}
        setScheduleModalVisible={setScheduleModalVisible}
        showScheduleModal={showScheduleModal}
        setScheduledDateTime={setScheduledTimestamp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "90%" },

  sendBtn: {
    height: 40,
    width: "48.5%",
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 17,
  },
  saveAsDraftBtn: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  sendText: {
    color: colors.white,
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
  draftText: {
    color: colors.primary,
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
});
