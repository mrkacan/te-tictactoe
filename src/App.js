import React from 'react';
import './styles/styles.css';
import * as firebase from "firebase/app";
import Game from "./pages/Game/Game";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import LocalStorage from "./utils/storage";
import CreateOrJoinRoom from "./pages/CreateOrJoinRoom/CreateOrJoinRoom";
import UserInfo from "./components/UserInfo";
import {Spin} from "antd";

const firebaseConfig = {
    apiKey: "AIzaSyDQtpaeFhvUUeUtUUxA4xlDaEzDiSo7fHc",
    authDomain: "te-tictactoe.firebaseapp.com",
    databaseURL: "https://te-tictactoe.firebaseio.com",
    projectId: "te-tictactoe",
    storageBucket: "te-tictactoe.appspot.com",
    messagingSenderId: "478023561910",
    appId: "1:478023561910:web:81e0297885e6397316ec17",
    measurementId: "G-LB8CWZC46J"
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            currentUserId: null,
            currentRoom: null,
            gameConfig: null,
            isLoading: true
        }
    }

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
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


        //TODO: check user on firebase if not exist create if yes login!


        LocalStorage.getItem('userId').then((currentUserId) => {
            LocalStorage.getItem('currentRoom').then((currentRoom) => {
                if (currentUserId) {
                    this.setState({
                        currentUserId,
                        isRegistered: true,
                        currentRoom,
                    })
                }

                this.setState({
                    isLoading: false
                })
            })

        })
    }

    checkRoom = (currentRoom) => {


        //TODO: check room on firebase if not exist create if yes exist join!


        LocalStorage.setItem('currentRoom', currentRoom).then(() => {
            if (currentRoom) {
                this.setState({
                    currentRoom,
                })
            }

            this.setState({
                isLoading: false
            })
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


    render() {
        const {
            isRegistered,
            currentUserId,
            currentRoom,
            roomId,
            gameConfig,
            isLoading
        } = this.state;

        console.log('this.state', this.state)

        if (isLoading) {
            return <Spin/>
        }

        if (!isRegistered) {
            return <RegisterUser checkUser={this.checkUser}/>
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
                />
            </>
        );
    }
}

export default App;
