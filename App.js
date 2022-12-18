import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Auto from './screens/Auto';
import Game from './screens/Game';
import Home from './screens/Home';

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ title: 'Start Game', headerStyle: { backgroundColor: colors.semi_dark_navy }, headerTitleStyle: { color: colors.silver_hover } }}
				/>
				<Stack.Screen
					name="Game"
					component={Game}
					options={{headerTitle:'',  headerStyle: { backgroundColor: colors.semi_dark_navy}, headerTitleStyle: { color: colors.silver_hover } }}
				/>
				<Stack.Screen
					name="Auto"
					component={Auto}
					options={{headerTitle:'',  headerStyle: { backgroundColor: colors.semi_dark_navy}, headerTitleStyle: { color: colors.silver_hover } }}
				/>
			</Stack.Navigator>

		</NavigationContainer>
	);
}

const colors = {
	dark_navy: "#1a2a33",
	semi_dark_navy: "#1f3641",
	silver: "#a8bfc9",
	silver_hover: "#dbe8ed",
	light_blue: "#31c3bd",
	light_blue_hover: "#65e9e4",
	light_yellow: "#f2b137",
	light_yellow_hover: "#ffc860",
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.dark_navy,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: "auto",
		width: "100%",
		opacity: 0.98
	},
});
