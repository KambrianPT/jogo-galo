import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, {useState} from 'react';
import FlatButton from '../jogo-galo/shared/button'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import "./global"

const Stack = createStackNavigator();

function App() 
{
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name='JOGO DO GALO' component={MainScreen}/>
        <Stack.Screen name='GameScreen' component={GameScreen}/>
        <Stack.Screen name='HistoryScreen' component={HistoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({navigation})
{
  return (
    <View style={stylesMainScreen.container}>
      <StatusBar style="auto" />
      
      <View style={stylesMainScreen.viewTitle}>
        <Text style={stylesMainScreen.textTitle}>JOGO DO GALO</Text>
      </View>

      <FlatButton text='COMEÇAR' onPress={() => navigation.navigate('GameScreen')}/>
      <FlatButton text='HISTÓRICO' onPress={() => navigation.navigate('HistoryScreen')}/>
    </View>
  );
}

function GameScreen()
{
  const [player, setPlayer] = useState(1);
  const [playerDisplay, setPlayerDisplay] = useState("JOGADOR X")
  const [board, setBoard] = useState([[0,0,0],[0,0,0],[0,0,0]])
  const [boardFreeze, setBoardFreeze] = useState(false)

  function initializeGame()
  {
    setPlayer(1)
    setPlayerDisplay("JOGADOR X")
    setBoardFreeze(false)
    setBoard([[0,0,0],[0,0,0],[0,0,0]])
  }

  function renderTile(num)
  {
      switch(num)
      {
        case 0: return
        case 1: return "close"
        case -1: return "circle-outline"
      }
  }

  function onClickHandler(row, col)
  {
    if (!boardFreeze) 
    {
      if (board[row][col] == 0) 
      {
        if (player == 1) 
        {
          board[row][col] = 1
          setPlayer(-1)
          setPlayerDisplay("JOGADOR O")
          checkWin()
        } 
        else 
        {
          board[row][col] = -1
          setPlayer(1)
          setPlayerDisplay("JOGADOR X")
          checkWin()
        }
      } 
    }
  }

  function checkWin()
  {
    if (!boardFreeze) 
    {
      var calc = 0;
    for (let row = 0; row < 3; row++) 
    {
      calc = 0;
      for (let column = 0; column < 3; column++) 
      {
        calc += board[row][column]
      }
      if (calc == 3) 
      {
        setPlayerDisplay("JOGADOR X GANHOU")
        global.xWins = global.xWins + 1
        setBoardFreeze(true)
        return
      } 
      else if(calc == -3)
      {
        setPlayerDisplay("JOGADOR O GANHOU")
        global.oWins = global.oWins + 1
        setBoardFreeze(true)
        return
      }
    }

    for (let column = 0; column < 3; column++) 
    {
      calc = 0;
      for (let row = 0; row < 3; row++) 
      {
        calc += board[row][column]
      }
      if (calc == 3) 
      {
        setPlayerDisplay("JOGADOR X GANHOU")
        global.xWins = global.xWins + 1
        setBoardFreeze(true)
        return
      } 
      else if(calc == -3)
      {
        setPlayerDisplay("JOGADOR O GANHOU")
        global.oWins = global.oWins + 1
        setBoardFreeze(true)
        return
      }
    }

    if (board[0][0] + board[1][1] + board[2][2] == 3) 
    {
      setPlayerDisplay("JOGADOR X GANHOU")
        global.xWins = global.xWins + 1
        setBoardFreeze(true)
      return
    }
    else if (board[0][0] + board[1][1] + board[2][2] == -3) 
    {
      setPlayerDisplay("JOGADOR O GANHOU")
      global.oWins = global.oWins + 1
      setBoardFreeze(true)
      return
    }

    if (board[0][2] + board[1][1] + board[2][0] == 3) 
    {
      setPlayerDisplay("JOGADOR X GANHOU")
      global.xWins = global.xWins + 1
      setBoardFreeze(true)
      return
    }
    else if (board[0][2] + board[1][1] + board[2][0] == -3) 
    {
      setPlayerDisplay("JOGADOR O GANHOU")
      global.oWins = global.oWins + 1
      setBoardFreeze(true)
      return
    }

    var empty = false
    for (let col = 0; col < 3; col++) 
    {
      for (let row = 0; row < 3; row++) 
      {
        if (board[row][col] == 0) 
        {
          empty = true
        }
      }
    }
    if (!empty) 
    {
      setPlayerDisplay("EMPATE")
      global.draws = global.draws + 1  
      setBoardFreeze(true)
    } 
    }
  }

  return (
    <View style={stylesGameScreen.container}>

      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onClickHandler(0,0)} style={[stylesGameScreen.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
          <Icon name={renderTile(board[0][0])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickHandler(0,1)} style={[stylesGameScreen.tile, {borderTopWidth: 0}]}>
          <Icon name={renderTile(board[0][1])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickHandler(0,2)} style={[stylesGameScreen.tile, {borderRightWidth: 0, borderTopWidth: 0}]}>
          <Icon name={renderTile(board[0][2])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>

      </View>

      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onClickHandler(1,0)} style={[stylesGameScreen.tile, {borderLeftWidth: 0}]}>
          <Icon name={renderTile(board[1][0])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickHandler(1,1)} style={stylesGameScreen.tile}>
          <Icon name={renderTile(board[1][1])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickHandler(1,2)} style={[stylesGameScreen.tile, {borderRightWidth: 0}]}>
          <Icon name={renderTile(board[1][2])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onClickHandler(2,0)} style={[stylesGameScreen.tile, {borderBottomWidth: 0, borderLeftWidth: 0}]}>
          <Icon name={renderTile(board[2][0])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickHandler(2,1)} style={[stylesGameScreen.tile, {borderBottomWidth: 0}]}>
          <Icon name={renderTile(board[2][1])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickHandler(2,2)} style={[stylesGameScreen.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
          <Icon name={renderTile(board[2][2])} style={stylesGameScreen.tileIcon}></Icon>
        </TouchableOpacity>
      </View>


      <Text style={stylesGameScreen.text}>{playerDisplay}</Text>
      <FlatButton text='Recomeçar' onPress={initializeGame}></FlatButton>
    </View>
  );
}

function HistoryScreen()
{
  return(
    <View style={stylesHistoryScreen.container}>
      <Text style={stylesHistoryScreen.text}>VITÓRIAS X: {global.xWins}</Text>
      <Text style={stylesHistoryScreen.text}>VITÓRIAS O: {global.oWins}</Text>
      <Text style={stylesHistoryScreen.text}>EMPATES: {global.draws}</Text>
    </View>
  )
}

const stylesNavBar = StyleSheet.create(
{
  bar:
  {
    backgroundColor: 'red'
  }
}
)

const stylesMainScreen = StyleSheet.create(
{
  container: 
  {
    flex: 1,
    backgroundColor: '#080051',
    justifyContent: "center",
    alignItems: "center"
  },
  viewTitle:
  {
    marginBottom: 400
  },
  textTitle:
  {
    color: '#966fd6',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36
  },
});

const stylesGameScreen = StyleSheet.create(
  {
    container: 
    {
      flex: 1,
      backgroundColor: '#080051',
      justifyContent: "center",
      alignItems: "center"
    },
    tile:
    {
      borderWidth: 10,
      borderColor: "#966fd6",
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center"
    },
    tileIcon:
    {
      color: "white",
      fontSize: 60,
    },
    text:
    {
      color: '#966fd6',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 36
    },
  }
)

const stylesHistoryScreen = StyleSheet.create(
  {
    container: 
    {
      flex: 1,
      backgroundColor: '#080051',
      justifyContent: "center",
      alignItems: "center"
    },
    text:
    {
      color: '#966fd6',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 36
    },
  }
)

export default App