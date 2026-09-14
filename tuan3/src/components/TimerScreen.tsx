import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const TimerScreen = () => {
    const [seconds, setSeconds] = useState(0)
    useEffect(() => {
        const timerId = setInterval(() => {
            setSeconds(pre => pre + 1)
        }, 1000)
        return () => clearInterval(timerId)
    })
    return (
        <View>
            <Text>Thoi gian: {seconds}</Text>
        </View>
    )
}

export default TimerScreen