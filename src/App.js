import React from 'react';
import './styles/styles.css';
import firebase from "firebase";
import Game from "./pages/Game/Game";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import LocalStorage from "./utils/storage";
import CreateOrJoinRoom from "./pages/CreateOrJoinRoom/CreateOrJoinRoom";
import UserInfo from "./components/UserInfo";
import {message} from "antd";
import Header from "./components/Header";

const defaultGameState = {
    X: '',
    O: '',
    ownerId: '',
    otherPlayerId: '',
    Winner: '',
    ownerWin: 0,
    otherPlayerWin: 0,
    nextPlayer: '',
    history: new Array(9).fill(null),
    stepNumber: 0,
    xIsNext: true,
    xWantPlay: true,
    yWantPlay: true,
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            currentUserId: null,
            currentRoom: null,
            gameConfig: {
                ...defaultGameState
            },
            isLoading: true,
            appIsRunning: false
        }
    }

    componentDidMount() {
        setTimeout(function () {
            this.checkUser()
        }.bind(this), 1500)

        window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });


    }

    checkUser = () => {
        LocalStorage.getItem('userId').then((currentUserId) => {
            LocalStorage.getItem('currentRoom').then((currentRoom) => {
                if (currentUserId) {
                    this.setState({
                        currentUserId,
                        isRegistered: true,
                        currentRoom,
                    })
                }

                if (currentRoom && currentUserId) {
                    this.runGameListeners()
                }

                this.setState({
                    isLoading: false
                })
            })
        })
    }

    registerUser = (currentUserId) => {
        this.setState({
            isLoading: true
        })
        firebase.database().ref(`users/${currentUserId}`).once('value', (snapshot) => {
            let val = snapshot.val()

            if (!val) {
                firebase.database().ref(`users/${currentUserId}`).update({
                    userActive: true
                }).then(() => {
                    LocalStorage.setItem('userId', currentUserId).then(() => {
                        this.setState({
                            currentUserId,
                            isRegistered: true,
                            currentRoom: null,
                            isLoading: false
                        })
                    })
                })
            } else {
                message.error('This user already exist. Please try with other username')
                this.setState({
                    isLoading: false,
                })
            }
        })
    }

    checkRoom = (currentRoom) => {
        const {currentUserId} = this.state

        this.setState({
            isLoading: true
        })

        firebase.database().ref(`rooms/${currentRoom}`).once('value', (snapshot) => {
            let val = snapshot.val()
            const gameConfigDefault = {
                ...defaultGameState,
                X: currentUserId,
                ownerId: currentUserId,
                nextPlayer: currentUserId
            }

            if (!val) {
                firebase.database().ref(`rooms/${currentRoom}`).update(gameConfigDefault).then(() => {
                    LocalStorage.setItem('currentRoom', currentRoom).then(() => {
                        this.setState({
                            currentRoom,
                            gameConfig: gameConfigDefault,
                            isLoading: false,
                        })
                        message.info('Room successfully created. Share your codes for join.\n' + `Your code: ${currentRoom}`)
                    })
                })
            } else {
                firebase.database().ref(`rooms/${currentRoom}`).once('value', (gameConfigSnapshot) => {
                    firebase.database().ref(`rooms/${currentRoom}`).update({
                        otherPlayerId: currentUserId,
                        O: currentUserId
                    }).then(()=> {
                        LocalStorage.setItem('currentRoom', currentRoom).then(() => {
                            this.setState({
                                currentRoom,
                                gameConfig:gameConfigSnapshot.val(),
                                isLoading: false,
                            })
                            message.success('Successfully joined.')
                        })
                    })
                })
            }
        })
    }

    logout = () => {
        LocalStorage.removeItem('userId').then(() => {
            LocalStorage.removeItem('currentRoom').then(() => {
                this.setState({
                    currentUserId: null,
                    isRegistered: false,
                    currentRoom: null,
                })
            })

        })
    }

    runGameListeners = () => {
        LocalStorage.getItem('userId').then((currentUserId) => {
            LocalStorage.getItem('currentRoom').then((currentRoom) => {
                if (currentUserId && currentRoom) {
                    this.setState({
                        currentUserId,
                        isRegistered: true,
                        currentRoom,
                    })

                    firebase.database().ref(`rooms/${currentRoom}`).once('value', (gameConfigSnapshot) => {
                        const gameConfig = gameConfigSnapshot.val()

                        this.setState(prevState => ({
                            ...prevState,
                            gameConfig: {
                                ...prevState.gameConfig,
                                ...gameConfig,
                                history: (gameConfig.history ? gameConfig.history : new Array(9).fill(null))
                            }
                        }))
                    })

                    firebase.database().ref(`rooms/${currentRoom}`).on('child_changed', (gameConfigSnapshot) => {
                        const gameConfig = gameConfigSnapshot
                        console.log('gameConfig',gameConfig)
                        this.setState(prevState => ({
                            ...prevState,
                            gameConfig: {
                                ...prevState.gameConfig,
                                [gameConfig.key]: gameConfig.val()
                            }
                        }))
                    })

                    firebase.database().ref(`rooms/${currentRoom}`).on('child_added', (gameConfigSnapshot) => {
                        const gameConfig = gameConfigSnapshot

                        this.setState(prevState => ({
                            ...prevState,
                            gameConfig: {
                                ...prevState.gameConfig,
                                [gameConfig.key]: gameConfig.val()
                            }
                        }))
                    })

                    firebase.database().ref(`rooms/${currentRoom}/history`).on('child_removed', (gameConfigSnapshot) => {

                        this.setState(prevState => ({
                            ...prevState,
                            gameConfig: {
                                ...prevState.gameConfig,
                                history: []
                            }
                        }))
                    })

                }
            })
        })
    }

    updateGame = (willDispatchObject) => {
        const {currentRoom} = this.state

        firebase.database().ref(`rooms/${currentRoom}`).update(willDispatchObject)
    }

    render() {
        const {
            isRegistered,
            currentUserId,
            currentRoom,
            roomId,
            gameConfig,
            isLoading
        } = this.state;

        if (isLoading) {
            return <Header isLoading={isLoading}/>
        }

        if (!isRegistered) {
            return <RegisterUser checkUser={this.registerUser}/>
        }


        if (!currentRoom) {
            return <>
                <UserInfo
                    currentUserId={currentUserId}
                    logout={this.logout}
                />
                <CreateOrJoinRoom
                    checkRoom={this.checkRoom}/>
            </>
        }


        return (
            <>
                <UserInfo
                    currentUserId={currentUserId}
                    currentRoom={currentRoom}
                    logout={this.logout}
                />
                <Game
                    currentUserId={currentUserId}
                    roomId={roomId}
                    gameConfig={gameConfig}
                    isRoomOwner={gameConfig && gameConfig.ownerId === currentUserId}
                    updateGame={this.updateGame}
                />
            </>
        );
    }
}

export default App;
