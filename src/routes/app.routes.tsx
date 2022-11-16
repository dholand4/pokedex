import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { Welcome } from '../pages/Welcome';


const Stack = createNativeStackNavigator();

export function AppRoutes() {
    return <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='About' component={About} />

    </Stack.Navigator>
}