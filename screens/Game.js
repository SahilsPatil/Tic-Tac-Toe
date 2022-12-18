import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useState from 'react-usestateref';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import x from '../images/x.png'
import o from '../images/o.png'
import navy_x from '../images/navy_x.png'
import navy_o from '../images/navy_o.png'

export default function Game({ navigation }) {
    const [positions, setpositions, ref] = useState([null, null, null, null, null, null, null, null, null])
    const [player, setplayer] = useState(0);
    const [winner, setWinner, winnerRef] = useState(null)
    const [winnerPoints, setwinnerPoints] = useState({ x: 0, o: 0, t: 0 })
    const [popupStyle, setpopupStyle] = useState('none')
    const [popupText, setPopupText] = useState(['', ''])
    const [winnerColors, setWinnerColors, winnerColorsRef] = useState([colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy,
    colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy,
    colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy, [null, null, null]])
    const winningPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],]

    function checkWin() {
        winningPos.forEach(e => {
            let positionsArray = ref.current;
            if (positionsArray[e[0]] == x && positionsArray[e[1]] == x && positionsArray[e[2]] == x) {
                winnerInfoSetter('X', 1, 0, 0, e[0], e[1], e[2], '#31c3bd', navy_x)
                setplayer(0)
            }
            else if (positionsArray[e[0]] == o && positionsArray[e[1]] == o && positionsArray[e[2]] == o) {
                winnerInfoSetter('O', 0, 1, 0, e[0], e[1], e[2], '#f2b137', navy_o)
                setplayer(1)
            }
            else {
                checkTie()
            }
        });
    }
    function userClicked(pos) {
        if (positions[pos] == null) {
            if (player == 0) {
                setpositions(
                    positions => ({ ...positions, [pos]: x })
                )
                setplayer(1)
            }
            else {
                setpositions(
                    positions => ({ ...positions, [pos]: o })
                )
                setplayer(0)
            }
        }
        checkWin()
    }
    function refresh() {
        setpositions([null, null, null, null, null, null, null, null, null])
        setWinner(null)
        setWinnerColors([colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy,
        colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy,
        colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy, [null, null, null, null, null, null, null, null, null]])
    }
    function winnerInfoSetter(winner, xp, op, tp, pos1, pos2, pos3, color, player) {
        console.log(winner);
        setWinner(winner)
        setwinnerPoints({ x: winnerPoints.x + xp, o: winnerPoints.o + op, t: winnerPoints.t + tp })
        winnerColorSetter(pos1, pos2, pos3, color, player)
        setpopupStyle('flex')
        setPopupText(['PLAYER ' + winner + ' WINS!', 'TAKES THE ROUND', color])
    }
    function winnerColorSetter(pos1, pos2, pos3, color, player) {
        let colors = winnerColorsRef.current
        colors[pos2] = color;
        colors[pos3] = color;
        colors[pos1] = color;
        colors[9][pos1] = player;
        colors[9][pos2] = player;
        colors[9][pos3] = player;
        setWinnerColors(colors)
    }
    function checkTie() {
        let positionsArray = ref.current;
        let all = 0
        for (let i = 0; i < 9; i++) {
            if (positionsArray[i] != null) {
                all = all + 1
            }
        }
        if (all == 9 && winnerRef.current == null) {
            winnerInfoSetter(null, 0, 0, 1, null, null, null, null, null)
        }
    }
    function nextRound() {
        setpopupStyle('none')
        setWinner(null)
        setpositions([null, null, null, null, null, null, null, null, null])
        setWinnerColors([colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy,
        colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy,
        colors.semi_dark_navy, colors.semi_dark_navy, colors.semi_dark_navy, [null, null, null, null, null, null, null, null, null]])
    }
    function popupImageSetter() {
        if (winnerRef.current == 'X') return (popupData('PLAYER X WINS !', x, 'TAKES THE ROUND', '#31c3bd'))
        else if (winnerRef.current == 'O') return (popupData('PLAYER X WINS !', o, 'TAKES THE ROUND', '#f2b137'))
        else return (
            <View style={{ backgroundColor: colors.semi_dark_navy, display: popupStyle, justifyContent: 'center', alignItems: 'center', width: '100%', height: 250, position: 'absolute' }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 24, color: '#a8bfc9', fontWeight: 'bold', letterSpacing: 1, textAlign: 'center', marginVertical: 25 }}>ROUND TIED</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View onTouchStart={() => navigation.navigate('Home')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.silver, borderRadius: 10, paddingBottom: 5, marginRight: 15 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15, borderRadius: 10, backgroundColor: colors.silver_hover, paddingVertical: 10, paddingHorizontal: 20 }}>QUIT</Text>
                    </View>
                    <View onTouchStart={nextRound} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light_yellow, borderRadius: 10, paddingBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15, borderRadius: 10, backgroundColor: colors.light_yellow_hover, paddingVertical: 10, paddingHorizontal: 20 }}>NEXT ROUND</Text>
                    </View>
                </View>
            </View>
        )
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
        console.log(1);
    })
    function popupData(winnerText, winnerImg, text, winnerCol) {
        return (
            <View style={{ backgroundColor: colors.semi_dark_navy, display: popupStyle, justifyContent: 'center', alignItems: 'center', width: '100%', height: 250, position: 'absolute' }}>
                <Text style={{ color: colors.silver_hover, fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15 }}>{winnerText}</Text>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image style={{ width: 40, height: 40, marginRight: 15 }} source={winnerImg} />
                    <Text style={{ fontSize: 24, color: winnerCol, fontWeight: 'bold', letterSpacing: 1, textAlign: 'center', marginVertical: 25 }}>{text}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View onTouchStart={() => navigation.navigate('Home')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.silver, borderRadius: 10, paddingBottom: 5, marginRight: 15 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15, borderRadius: 10, backgroundColor: colors.silver_hover, paddingVertical: 10, paddingHorizontal: 20 }}>QUIT</Text>
                    </View>
                    <View onTouchStart={nextRound} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light_yellow, borderRadius: 10, paddingBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15, borderRadius: 10, backgroundColor: colors.light_yellow_hover, paddingVertical: 10, paddingHorizontal: 20 }}>NEXT ROUND</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container]}>
            <StatusBar style='auto' />
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>

                    <View style={{ display: 'flex', flexDirection: 'row', width: 65, justifyContent: 'space-between', alignItems: 'center' }} >
                        <Image style={{ width: 30, height: 30 }} source={require('./../images/x.png')} />
                        <Image style={{ width: 30, height: 30 }} source={require('./../images/o.png')} />
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, backgroundColor: colors.semi_dark_navy, paddingVertical: 15, width: 140, paddingHorizontal: 35, borderBottomColor: colors.dark_navy, borderBottomWidth: 6 }}>
                        <Image style={{ width: 20, height: 20 }} source={player ? require('./../images/silver_o.png') : require('./../images/silver_x.png')} />
                        <Text style={{ color: colors.silver, fontWeight: 'bold', letterSpacing: 0.9 }}>TURN</Text>
                    </View>

                    <View onTouchStart={refresh} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: colors.silver, paddingVertical: 0, width: 45, height: 45, paddingHorizontal: 0, }}>
                        <MaterialCommunityIcons style={{ zIndex: 2 }} name='refresh' size={35} color={colors.dark_navy} />
                    </View>

                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'center', marginTop: 15 }}>
                        <View style={{ backgroundColor: winnerColors[0], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(0)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][0] ? winnerColors[9][0] : positions[0]} /></View>
                        <View style={{ backgroundColor: winnerColors[1], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(1)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][1] ? winnerColors[9][1] : positions[1]} /></View>
                        <View style={{ backgroundColor: winnerColors[2], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(2)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][2] ? winnerColors[9][2] : positions[2]} /></View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'center', marginTop: 15 }}>
                        <View style={{ backgroundColor: winnerColors[3], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(3)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][3] ? winnerColors[9][3] : positions[3]} /></View>
                        <View style={{ backgroundColor: winnerColors[4], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(4)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][4] ? winnerColors[9][4] : positions[4]} /></View>
                        <View style={{ backgroundColor: winnerColors[5], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(5)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][5] ? winnerColors[9][5] : positions[5]} /></View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '85%', justifyContent: 'center', marginTop: 15 }}>
                        <View style={{ backgroundColor: winnerColors[6], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(6)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][6] ? winnerColors[9][6] : positions[6]} /></View>
                        <View style={{ backgroundColor: winnerColors[7], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(7)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][7] ? winnerColors[9][7] : positions[7]} /></View>
                        <View style={{ backgroundColor: winnerColors[8], borderBottomColor: colors.dark_navy, borderBottomWidth: winnerRef.current ? 0 : 13, borderRadius: 10, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }} onTouchStart={() => userClicked(8)}><Image style={{ width: 50, height: 50 }} source={winnerRef.current && winnerColors[9][8] ? winnerColors[9][8] : positions[8]} /></View>
                    </View>
                </View>

                <View style={{
                    display: 'flex', flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center', marginTop: 35
                }}>
                    <View style={{ backgroundColor: colors.light_blue, borderRadius: 10, width: 107, height: 55, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.dark_navy, fontWeight: '700', letterSpacing: 1 }}>X (YOU)</Text>
                        <Text style={{ color: colors.dark_navy, fontWeight: 'bold', fontSize: 20 }}>{winnerPoints.x}</Text>
                    </View>
                    <View style={{ backgroundColor: colors.silver, borderRadius: 10, width: 107, height: 55, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.dark_navy, fontWeight: '700', letterSpacing: 1 }}>TIES</Text>
                        <Text style={{ color: colors.dark_navy, fontWeight: 'bold', fontSize: 20 }}>{winnerPoints.t}</Text>
                    </View>
                    <View style={{ backgroundColor: colors.light_yellow, borderRadius: 10, width: 107, height: 55, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.dark_navy, fontWeight: '700', letterSpacing: 1 }}>O (Other)</Text>
                        <Text style={{ color: colors.dark_navy, fontWeight: 'bold', fontSize: 20 }}>{winnerPoints.o}</Text>
                    </View>
                </View>

            </View>
            <View style={{ display: popupStyle, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5 }}></View>
            {popupImageSetter()}
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


// for (let i = 0; i < winningPos.length; i++) {
//     let positionsArray = ref.current;
//     if (positionsArray[winningPos[i][0]] == x && positionsArray[winningPos[i][1]] == x && positionsArray[winningPos[i][2]] == x) {
//         winnerInfoSetter('X', 1, 0, 0, winningPos[i][0], winningPos[i][1], winningPos[i][2], '#31c3bd', navy_x)
//         setplayer(0)
//     }
//     else if (positionsArray[winningPos[i][0]] == o && positionsArray[winningPos[i][1]] == o && positionsArray[winningPos[i][2]] == o) {
//         winnerInfoSetter('O', 0, 1, 0, winningPos[i][0], winningPos[i][1], winningPos[i][2], '#f2b137', navy_o)
//         setplayer(1)
//     }
//     else {
//         checkTie()
//     }
// }

// function checkWin() {
//     let positionsArray = ref.current;
//     if (positionsArray[0] == x & positionsArray[1] == x & positionsArray[2] == x) {
//         console.log('x');
//         setWinner('X')
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//         let colors = winnerColorsRef.current
//         colors[1] = '#31c3bd';
//         colors[2] = '#31c3bd';
//         colors[0] = '#31c3bd';
//         colors[9][0] = navy_x;
//         colors[9][1] = navy_x;
//         colors[9][2] = navy_x;
//         setWinnerColors(colors)
//     }
//     if (positionsArray[3] == x & positionsArray[4] == x & positionsArray[5] == x) {
//         console.log('x');
//         setWinner('X');
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//     }
//     if (positionsArray[6] == x & positionsArray[7] == x & positionsArray[8] == x) {
//         console.log('x');
//         setWinner('X');
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//     }
//     if (positionsArray[0] == x & positionsArray[3] == x & positionsArray[6] == x) {
//         console.log('x');
//         setWinner('X');
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//     }
//     if (positionsArray[1] == x & positionsArray[4] == x & positionsArray[7] == x) {
//         console.log('x');
//         setWinner('X');
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//     }
//     if (positionsArray[2] == x & positionsArray[5] == x & positionsArray[8] == x) {
//         console.log('x');
//         setWinner('X');
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//     }
//     if (positionsArray[0] == x & positionsArray[4] == x & positionsArray[8] == x) {
//         console.log('x');
//         setWinner('X');
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//         let colors = winnerColorsRef.current
//         colors[0] = '#31c3bd';
//         colors[4] = '#31c3bd';
//         colors[8] = '#31c3bd';
//         colors[9][0] = navy_x;
//         colors[9][4] = navy_x;
//         colors[9][8] = navy_x;
//         setWinnerColors(colors)
//     }
//     if (positionsArray[2] == x & positionsArray[4] == x & positionsArray[6] == x) {
//         console.log('x');
//         setWinner('X');
//         setwinnerPoints({ x: winnerPoints.x + 1, o: winnerPoints.o, t: winnerPoints.t })
//     }

//     if (positionsArray[0] == o & positionsArray[1] == o & positionsArray[2] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 0, 1, 2, '#f2b137', navy_o)

//     }
//     if (positionsArray[3] == o & positionsArray[4] == o & positionsArray[5] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 3, 4, 5, '#f2b137', navy_o)

//     }
//     if (positionsArray[6] == o & positionsArray[7] == o & positionsArray[8] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 6, 7, 8, '#f2b137', navy_o)

//     }
//     if (positionsArray[0] == o & positionsArray[3] == o & positionsArray[6] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 0, 3, 6, '#f2b137', navy_o)

//     }
//     if (positionsArray[1] == o & positionsArray[4] == o & positionsArray[7] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 1, 4, 7, '#f2b137', navy_o)

//     }
//     if (positionsArray[2] == o & positionsArray[5] == o & positionsArray[8] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 2, 5, 8, '#f2b137', navy_o)

//     }
//     if (positionsArray[0] == o & positionsArray[4] == o & positionsArray[8] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 0, 4, 8, '#f2b137', navy_o)

//     }
//     if (positionsArray[2] == o & positionsArray[4] == o & positionsArray[6] == o) {
//         winnerInfoSetter('O', 0, 1, 0, 2, 4, 6, '#f2b137', navy_o)
//     }
//     checkTie()
// }

{/* <View style={{ backgroundColor: colors.semi_dark_navy, display: popupStyle, justifyContent: 'center', alignItems: 'center', width: '100%', height: 250, position: 'absolute' }}>
                <Text style={{ color: colors.silver_hover, fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15 }}>{popupText[0]}</Text>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 24, color: popupText[2], fontWeight: 'bold', letterSpacing: 1, textAlign: 'center', marginVertical: 25 }}>{popupText[1]}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View onTouchStart={() => navigation.navigate('Home')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.silver, borderRadius: 10, paddingBottom: 5, marginRight: 15 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15, borderRadius: 10, backgroundColor: colors.silver_hover, paddingVertical: 10, paddingHorizontal: 20 }}>QUIT</Text>
                    </View>
                    <View onTouchStart={nextRound} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light_yellow, borderRadius: 10, paddingBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.9, fontSize: 15, borderRadius: 10, backgroundColor: colors.light_yellow_hover, paddingVertical: 10, paddingHorizontal: 20 }}>NEXT ROUND</Text>
                    </View>
                </View>
            </View> */}