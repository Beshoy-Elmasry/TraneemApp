import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SoundsDisplay from '@/components/SoundComponent/SoundsDisplay'
import Header from '@/components/header/Header'

const Favorite = () => {
  return (
    <>
        <Header category_name = {"المفضلة"}/>
        <SoundsDisplay category_id={'favorite'} category_name={'المفضلة'} />
    </>
  )
}

export default Favorite

const styles = StyleSheet.create({})