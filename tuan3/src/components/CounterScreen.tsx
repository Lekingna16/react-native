import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Button } from 'react-native'

const CounterScreen = () => {
    const [counter, setCounter] = useState(0)
    return (
        <View>
            <Text>Count: {counter}</Text>
            <Button
                title="Tang"
                onPress={() => setCounter(pre => pre + 1)}
            />
            <Button
                title="Giam"
                onPress={() => setCounter(pre => pre - 1)}
            />
        </View>

    )
}

export default CounterScreen