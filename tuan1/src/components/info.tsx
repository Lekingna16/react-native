import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Info() {
    return (
        <View style={styles.container}>
            <h2>Thông tin sinh viên</h2>
            <p style={styles.content}>Email: minhanh@sv.edu.vn</p>
            <p style={styles.content}>Lop: CNTT-K24</p>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        backgroundColor: "#92c5f144",
        borderRadius: 10,
        fontSize: 15
    },
    content: {
        color: 'gray'
    }
})