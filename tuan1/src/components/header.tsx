import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Smart Campus</Text>
            </View>
        )
    }
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1677D2',
        padding: 20
    },
    text: {
        fontSize: 30,
        color: 'white',
        fontWeight: '500'
    }
})