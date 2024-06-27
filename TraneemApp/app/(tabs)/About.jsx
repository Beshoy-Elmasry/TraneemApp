import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/header/Header'
import { COLORS, FONTS, SIZES } from "@/constants/Theme";

const About = () => {
  return (
    <View style={styles.body}>
        <Header category_name={"عن التطبيق"}/>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    body: {
        color: COLORS.bg,
        fontFamily: FONTS.ae_Khalid,
      },
})