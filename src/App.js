import React from 'react';
import './styles/styles.css';
import firebase from 'firebase';
import { message } from 'antd';
import { isEmpty } from 'lodash';
import Game from './pages/Game/Game';
import RegisterUser from './pages/RegisterUser/RegisterUser';
import LocalStorage from './utils/storage';
import CreateOrJoinRoom from './pages/CreateOrJoinRoom/CreateOrJoinRoom';
import UserInfo from './components/UserInfo';
import Header from './components/Header';
import gameManager from './utils/managers/gameManager';

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
  isLoading: true,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      currentUserId: null,
      currentRoom: null,
      gameConfig: {
        ...defaultGameState,
      },
      isLoading: true,
      appIsRunning: false,
    };
  }

  async componentDidMount() {
    await this.checkUser();

    window.addEventListener('resize', () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }

    checkUser = async () => {
      const currentUserId = await gameManager.getUserId();
      const currentRoom = await gameManager.getCurrentRoomId();

      if (currentUserId) {
        this.setState({
          currentUserId,
          isRegistered: true,
          currentRoom,
        });
      }

      if (currentRoom && currentUserId) {
        this.runGameListeners();
      }

      this.setGameLoaderVisibility(false);
    }

    registerUser = (currentUserId) => {
      this.setState({
        isLoading: true,
      });
      firebase.database().ref(`users/${currentUserId}`).once('value', (snapshot) => {
        const val = snapshot.val();

        if (!val) {
          firebase.database().ref(`users/${currentUserId}`).update({
            userActive: true,
          }).then(() => {
            LocalStorage.setItem('userId', currentUserId).then(() => {
              this.setState({
                currentUserId,
                isRegistered: true,
                currentRoom: null,
                isLoading: false,
              });
            });
          });
        } else {
          message.error('This user already exist. Please try with other username');
          this.setState({
            isLoading: false,
          });
        }
      });
    }

    checkRoom = async (currentRoom) => {
      const { currentUserId } = this.state;

      this.setGameLoaderVisibility(true);

      const databaseSnapshot = await firebase.database().ref(`rooms/${currentRoom}`).once('value', (snapshot) => snapshot);
      const databaseSnapshotValue = databaseSnapshot.val();
      const isRoomCreated = !isEmpty(databaseSnapshotValue);

      const gameConfigDefault = {
        ...defaultGameState,
        X: currentUserId,
        ownerId: currentUserId,
        nextPlayer: currentUserId,
        isLoading: true,
      };

      if (!isRoomCreated) {
        await firebase.database().ref(`rooms/${currentRoom}`).update(gameConfigDefault);
        await gameManager.setCurrentRoomId(currentRoom);
        this.setState({
          currentRoom,
          gameConfig: gameConfigDefault,
        });
        this.setGameLoaderVisibility(false);
        message.info(`Room successfully created. Share your codes for join.\nYour code: ${currentRoom} `);
        this.runGameListeners();
      } else {
        const gameConfigSnapshot = await firebase.database().ref(`rooms/${currentRoom}`).once('value', (snapshot) => snapshot.val());

        await firebase.database().ref(`rooms/${currentRoom}`).update({
          otherPlayerId: currentUserId,
          O: currentUserId,
          isLoading: false,
        });
        await gameManager.setCurrentRoomId(currentRoom);
        this.setState({
          currentRoom,
          gameConfig: gameConfigSnapshot,
        });
        this.setGameLoaderVisibility(false);
        this.runGameListeners();
        message.success('Successfully joined.');
      }
    }

    logout = async () => {
      await gameManager.clearAppStorage();

      this.setState({
        currentUserId: null,
        isRegistered: false,
        currentRoom: null,
      });
    }

    runGameListeners = async () => {
      const currentRoom = await gameManager.getCurrentRoomId();
      const currentUserId = await gameManager.getUserId();

      if (currentUserId && currentRoom) {
        this.setState({
          currentUserId,
          isRegistered: true,
          currentRoom,
        });

        firebase.database().ref(`rooms/${Number(currentRoom)}`).once('value', (gameConfigSnapshot) => {
          const gameConfig = gameConfigSnapshot.val();

          this.setState(prevState => ({
            ...prevState,
            gameConfig: {
              ...prevState.gameConfig,
              ...gameConfig,
              history: (gameConfig.history ? gameConfig.history : new Array(9).fill(null)),
            },
          }));
        });

        firebase.database().ref(`rooms/${Number(currentRoom)}`).on('child_changed', (gameConfigSnapshot) => {
          const gameConfig = gameConfigSnapshot;
          this.setState(prevState => ({
            ...prevState,
            gameConfig: {
              ...prevState.gameConfig,
              [gameConfig.key]: gameConfig.val(),
            },
          }));
        });

        firebase.database().ref(`rooms/${Number(currentRoom)}`).on('child_added', (gameConfigSnapshot) => {
          const gameConfig = gameConfigSnapshot;

          this.setState(prevState => ({
            ...prevState,
            gameConfig: {
              ...prevState.gameConfig,
              [gameConfig.key]: gameConfig.val(),
            },
          }));
        });

        firebase.database().ref(`rooms/${Number(currentRoom)}/history`).on('child_removed', () => {
          this.setState(prevState => ({
            ...prevState,
            gameConfig: {
              ...prevState.gameConfig,
              history: [],
            },
          }));
        });
      }
    }

    updateGame = async (willDispatchObject) => {
      const { currentRoom } = this.state;

      await firebase.database().ref(`rooms/${Number(currentRoom)}`).update(willDispatchObject);
    }

    setGameLoaderVisibility = (isLoading) => {
      this.setState({
        isLoading,
      });
    }

    render() {
      const {
        isRegistered,
        currentUserId,
        currentRoom,
        roomId,
        gameConfig,
        isLoading,
      } = this.state;

      if (isLoading) {
        return <Header isLoading={isLoading} />;
      }

      if (!isRegistered) {
        return <RegisterUser checkUser={this.registerUser} />;
      }

      if (!currentRoom) {
        return (
          <>
            <UserInfo
              currentUserId={currentUserId}
              logout={this.logout}
            />
            <CreateOrJoinRoom
              checkRoom={this.checkRoom}
            />
          </>
        );
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
