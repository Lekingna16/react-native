import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { Component, useState } from 'react'
import Header from './src/components/header'
import Avatar from './src/components/avatar'
import Info from './src/components/info'


const App = () => {
  const [isDisable, setDisable] = useState(false)
  return (
    <SafeAreaView style={styles.container} >
      <View >
        <Header />
        <Avatar />
        <input placeholder='Tim kiem thong tin' style={styles.input} />
        <Info />
        <Pressable
          hitSlop={{ top: 48, left: 48, bottom: 48, right: 48 }}
          style={({ pressed }) =>
            [styles.button, isDisable ? styles.inavailableButton : (pressed ? styles.buttonPressed : styles.buttonNormal)]}
        >Luu ho so</Pressable>
      </View>
    </SafeAreaView >
  )
}


export default App

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },
  input: {
    margin: 20,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  button: {
    width: "50%",
    color: "white",
    fontSize: 20,
    marginLeft: 100,
    cursor: 'pointer',
    padding: 10,
    borderRadius: 10,
    alignItems: "center"

  },
  buttonPressed: {
    backgroundColor: "#0d395f",

  },
  buttonNormal: {
    backgroundColor: "#0875d4",

  },
  inavailableButton: {
    backgroundColor: 'gray'
  }
})