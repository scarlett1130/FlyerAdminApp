import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

import Button from "../Button";
import FilterPicker from "./FilterPicker";
import { ModalCard } from "../ModalCard";
import colors from "../../constants/colors";
import { setFilterUnitId } from "../../redux/actions/chat";
import {
  resetDistrictFilter,
  resetSchoolFilter,
  setDistrictFilter,
  setResetGroups,
  setResetSchools,
  setSchoolFilter,
} from "../../redux/actions/filters";

function FilterModal({
  onFilterPress,
  filterModal,
  onFilterIconPress,
  setFilterUnitId,
  setSchoolFilter,
  setDistrictFilter,
  setResetSchools,
  setResetGroups,
  clearSchools,
}) {
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [selectedDis, setSelectedDis] = useState("--");
  const [selectedSch, setSelectedSch] = useState("--");
  const [selectedGrp, setSelectedGrp] = useState("--");

  const onSelectItemD = (item) => {
    setSelectedUnitId(item && item.id ? item.id : "");
    setSelectedDis(item.name);
    setSelectedGrp("--");
    setSelectedSch("--");
    if (item && item.id) {
      setDistrictFilter(item.id);
      setResetSchools(true);
    }
  };
  const onSelectItemS = (item) => {
    setSelectedUnitId(item && item.id ? item.id : "");
    setSelectedSch(item.name);
    setSelectedGrp("--");
    if (item && item.id) {
      setSchoolFilter(item.id);
      setResetGroups(true);
    }
  };
  const onSelectItemG = (item) => {
    setSelectedUnitId(item && item.id ? item.id : "");
    setSelectedGrp(item.name);
  };
  const onFilterButtonPress = () => {
    setFilterUnitId(selectedUnitId);
    onFilterPress();
  };

  const onFilterClosePress = () => {
    setFilterUnitId(null);
    onFilterIconPress();
    setDistrictFilter(null);
    setSchoolFilter(null);
    setSelectedGrp("--");
    setSelectedSch("--");
    setSelectedDis("--");
    setSelectedUnitId("");
  };

  return (
    <ModalCard
      title="Filter By"
      visible={filterModal}
      onPressClose={onFilterClosePress}
      scrollable={false}
    >
      <View style={styles.modalFilterSection}>
        <Text style={styles.modalSectionTitle}>District</Text>
        <FilterPicker
          org="d"
          onSelectItem={onSelectItemD}
          selectedItem={selectedDis}
          showEmpty={true}
        />
      </View>
      <View style={styles.modalFilterSection}>
        <Text style={styles.modalSectionTitle}>School</Text>
        <FilterPicker
          org="s"
          onSelectItem={onSelectItemS}
          selectedItem={selectedSch}
          showEmpty={true}
        />
      </View>
      <View style={styles.modalFilterSection}>
        <Text style={styles.modalSectionTitle}>Group</Text>
        <FilterPicker
          org="g"
          onSelectItem={onSelectItemG}
          selectedItem={selectedGrp}
          showEmpty={true}
        />
      </View>

      <Button title="Filter" width="50%" onPress={onFilterButtonPress} />
    </ModalCard>
  );
}

const styles = StyleSheet.create({
  modalSectionTitle: {
    height: 23,
    color: colors.textPrimary,
    fontFamily: "Lato-Regular",
    fontSize: 16,
    letterSpacing: 0,
  },
  modalFilterSection: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const mapDispatchToProps = (dispatch) => ({
  setFilterUnitId: (unit_id) => dispatch(setFilterUnitId(unit_id)),
  setDistrictFilter: (id) => dispatch(setDistrictFilter(id)),
  resetDistrictFilter: () => dispatch(resetDistrictFilter()),
  setSchoolFilter: (id) => dispatch(setSchoolFilter(id)),
  resetSchoolFilter: () => dispatch(resetSchoolFilter()),
  clearSchools: () => dispatch(clearSchools()),
  setResetSchools: (flag) => dispatch(setResetSchools(flag)),
  setResetGroups: (flag) => dispatch(setResetGroups(flag)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
