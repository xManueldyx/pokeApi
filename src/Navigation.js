import { View,Text,Image } from "react-native";
import react from "react";
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Principal from './screens/Principal';
import About from './screens/About';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Navigation(){
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator >
                <Tab.Screen name="Home" component={Home} options={{ tabBarBadge: 3, tabBarIcon:({ focused, color, size })=>{
                    return <Ionicons name={'home'} size={size} color={color} />;
                },tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray'}}/>
                <Tab.Screen name="Principal" component={Principal} options={{ tabBarIcon:({ focused, color, size })=>{
                    return <Image source={require('./assets/R.png')} style={{
                        width:75,
                        height:75,
                        bottom:22
                    }}></Image>;
                },tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray'}}/>
                <Tab.Screen name="About" component={About} options={{ tabBarBadge: 3, tabBarIcon:({ focused, color, size })=>{
                    return <Ionicons name={'help'} size={size} color={color} />;
                },tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray'}}/>
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}