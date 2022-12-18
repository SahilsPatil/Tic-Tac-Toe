import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import silver_x from './../images/silver_x.png';
import silver_o from './../images/silver_o.png';
import navy_x from './../images/navy_x.png';
import navy_o from './../images/navy_o.png';

export default function Home({navigation}) {
    const [imageForX, setimageForX] = useState([silver_x,navy_o])
    const [chooseXOScrollStyle, setchooseXOScrollStyle] = useState({ backgroundColor: colors.silver, width: "50%", zIndex: 0, position: 'absolute', height: "80%", alignSelf: 'center', borderRadius: 10, right: 7 })
    const chooseXO = (e) => {
        if (e == 0){
            setimageForX([navy_x,silver_o]);
            setchooseXOScrollStyle({ transition: 0.5, backgroundColor: colors.silver, width: 150, zIndex: 0, position: 'absolute', height: "80%", alignSelf: 'center', borderRadius: 10, left: 7 })
        }else{
            setimageForX([silver_x,navy_o]);
            setchooseXOScrollStyle({ backgroundColor: colors.silver, width: 150, zIndex: 0, position: 'absolute', height: "80%", alignSelf: 'center', borderRadius: 10, right: 7 })
        }
    }
    return (
        <View style={[styles.container]}>
            <StatusBar style='auto'/>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                <View style={{ display: 'flex', flexDirection: 'row', width: 70, justifyContent: 'space-between', alignItems: 'center' }} >
                    <Image style={{ width: 30, height: 30 }} source={require('./../images/x.png')} />
                    <Image style={{ width: 30, height: 30 }} source={require('./../images/o.png')} />
                </View>

                <View style={{ backgroundColor: colors.dark_navy, marginVertical: 40, borderRadius: 10, paddingBottom: 10 }}>
                    <View style={{ backgroundColor: colors.semi_dark_navy, padding: 25, borderRadius: 10, width: "90%" }}>
                        <Text style={{ textAlign: 'center', color: colors.silver_hover, fontSize: 17, fontWeight: 'bold' }}>PICK PLAYER 1'S MARK</Text>

                        <View style={{ position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, backgroundColor: colors.dark_navy, borderRadius: 10 }}>
                            <View onTouchStart={() => chooseXO(0)} style={{ zIndex: 1, width: 150, justifyContent: 'center', alignItems: 'center', height: 50, margin: 7, marginRight: 0, borderRadius: 10 }} >
                                <Image style={{ width: 30, height: 30 }} source={imageForX[0]} />
                            </View>

                            <View onTouchStart={() => chooseXO(1)} style={{ zIndex: 1, width: 150, justifyContent: 'center', alignItems: 'center', height: 50, margin: 7, marginLeft: 0, borderRadius: 10 }}>
                                <Image style={{ width: 30, height: 30 }} source={imageForX[1]} />
                            </View>

                            <View style={chooseXOScrollStyle}></View>
                        </View>

                        <Text style={{ textAlign: 'center', color: colors.silver, letterSpacing: 1 }}>REMEMBER : X GOES FIRST</Text>
                    </View>
                </View>

                <View onTouchStart={()=>navigation.navigate('Auto')} style={{ marginBottom: 20, backgroundColor: colors.light_yellow, paddingBottom: 10, borderRadius: 10, width: '90%' }}>
                    <Text style={{ backgroundColor: colors.light_yellow_hover, textAlign: 'center', fontSize: 18, fontWeight: 'bold', width: "100%", paddingVertical: 15, borderRadius: 10 }}>NEW GAME (VS CPU)</Text>
                </View>
                <View accessibilityRole='Button' onTouchStart={()=>navigation.navigate('Game')} style={{ backgroundColor: colors.light_blue, paddingBottom: 10, borderRadius: 10, width: '90%' }}>
                    <Text style={{ backgroundColor: colors.light_blue_hover, textAlign: 'center', fontSize: 18, fontWeight: 'bold', width: "100%", paddingVertical: 15, borderRadius: 10 }}>NEW GAME (VS PLAYER)</Text>
                </View>
            </View>

        </View>
    )
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