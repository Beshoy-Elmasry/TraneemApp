import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "@/constants/Theme";

const Header = (props) => {
  const category_name = props.category_name;

  return (
    <View style={styles.header_container}>
      <Image
       style={[styles.image]}
       source={require("@/assets/images/header/cross.png")} 
       />

      <Text style={styles.text}> {category_name} </Text>
      
      <Image
       style={styles.image}
       source={require("@/assets/images/header/cross.png")} 
       />
    </View>
  );
};

export default Header;

const windowWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  header_container: {
    backgroundColor: COLORS.black,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.ae_Khalid,
    fontSize: SIZES.XXLarge,
    textAlign: "center",
  },
});
