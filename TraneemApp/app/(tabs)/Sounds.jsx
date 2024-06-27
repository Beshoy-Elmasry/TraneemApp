import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "@/constants/Theme";
import { useLocalSearchParams } from "expo-router";
// import axios from "axios";
import SoundsDisplay from "@/components/SoundComponent/SoundsDisplay";
import Header from "@/components/header/Header";

const SoundsContainer = () => {
  // const [data , setData] = useState(null)

  const params = useLocalSearchParams();
  const category_id = params.category_id;
  const category_name = params.category_name;

  return (
    <View style={styles.body}>
      <Header category_name={category_name} />
      <SoundsDisplay category_id={category_id} category_name={category_name} />
    </View>
  );
};

export default SoundsContainer;

const styles = StyleSheet.create({
  body: {
    color: COLORS.bg,
    fontFamily: FONTS.ae_Khalid,
  },
});
