import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'


interface avatarProps {
    image: string,
    name: string,
    masv: string
}
export const Avatar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarFrame}>
                <Text style={styles.text}>SV</Text>
            </View>
            <View style={styles.infoFrame}>
                <Text style={styles.name}>Le Thi Kim Ngan</Text>
                <Text style={styles.maSV}>MSV: 23729131</Text>
            </View>
        </View >
    )

}

export default Avatar
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 30,
    },
    avatarFrame: {
        backgroundColor: '#DCECFB',
        borderRadius: '50%',
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#1c5990'
    },
    text: {
        color: 'hsl(208, 67%, 34%)',
        fontSize: 40,
        fontWeight: 'bold'

    },
    infoFrame: {
        margin: 20
    },
    name: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'black'
    },
    maSV: {
        fontSize: 24,
        color: '#6c6f73',

    }
})