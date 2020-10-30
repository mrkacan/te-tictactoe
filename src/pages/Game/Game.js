import React from 'react';
import { Button, Spin, Modal } from 'antd';
import { calculateWinner } from '../../utils/helper';
import Board from '../../components/Board';
import Header from '../../components/Header';
import click from '../../assets/click.mp3';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      X: '',
      Y: '',
      ownerId: '',
      otherPlayerId: '',
      Winner: '',
      ownerWin: 0,
      otherPlayerWin: 0,
      nextPlayer: '',
      history: new Array(9).fill(null),
      stepNumber: 0,
      xIsNext: true,
      isLoading: true,
      xWantPlay: true,
      yWantPlay: true,
    };
  }

  static getDerivedStateFromProps(props, state) {

    return {
      ...props.gameConfig,
      isLoading: !props.gameConfig.nextPlayer,
    };
  }

  componentDidMount() {
    const { gameConfig } = this.props;

    this.setState({
      ...this.state,
      ...gameConfig,
    });
  }

  handleClick(i) {
    const { history } = this.state;
    const {
      updateGame, gameConfig: { X, ownerId }, currentUserId, gameConfig,
    } = this.props;

    const newSquares = { ...history };

    if (!this.isMyTurn() || (calculateWinner(history) || history[i])) {
      return;
    }

    navigator.vibrate([20]);
    this.click.play();

    newSquares[i] = X === currentUserId ? 'X' : 'O';
    this.setState({
      history: newSquares,
    }, () => {
      updateGame({
        history: newSquares,
        nextPlayer: this.getOtherPlayer(),
      });
    });

    if (calculateWinner(newSquares)) {
      const willWin = this.getWinnerName(calculateWinner(newSquares));

      const willIncreaseCountPlayer = ownerId === willWin ? 'ownerWin' : 'otherPlayerWin';
      updateGame({
        [willIncreaseCountPlayer]: gameConfig[willIncreaseCountPlayer] + 1,
      });
    }

    if (this.isGameFineshed() || !!calculateWinner(newSquares)) {
      setTimeout(() => {
        this.setState({
          isLoading: true,
        });
        updateGame({
          isLoading: true,
        });

        setTimeout(() => {
          updateGame({
            history: [],
            nextPlayer: this.getRandomPlayer(),
          });
        }, 1500);
      }, 2000);
    }
  }

    isMyTurn = () => {
      const { currentUserId } = this.props;
      const { gameConfig: { nextPlayer } } = this.props;

      return nextPlayer === currentUserId;
    }

    getOtherPlayer = () => {
      const { currentUserId } = this.props;
      const { gameConfig: { ownerId, otherPlayerId } } = this.props;
      let otherPlayer = '';

      if (currentUserId === ownerId) {
        otherPlayer = otherPlayerId;
      }

      if (currentUserId === otherPlayerId) {
        otherPlayer = ownerId;
      }

      return otherPlayer;
    }

    getWinnerName = (state) => {
      const { gameConfig: { X, O } } = this.props;

      return state === 'X' ? X : O;
    }

    isGameFineshed = () => {
      const { history } = this.state;

      const newHistory = (history && history.length) ? history.filter(i => i) : [];

      if (newHistory && newHistory.length === 9) {
        return true;
      }

      return false;
    }

    getRandomPlayer = () => {
      const { currentUserId } = this.props;
      const otherPlayer = this.getOtherPlayer();
      const isZeroOrOne = (Math.random() > 0.5) ? 1 : 0;

      return isZeroOrOne === 1 ? currentUserId : otherPlayer;
    }

    checkAllSquareIsNull = () => {
      const { history } = this.state;
      let allOfNull = true;

      if (history) {
        history.forEach(i => {
          if (allOfNull && i) {
            allOfNull = false;
          }
        });
      }

      return !allOfNull;
    }

    render() {
      const {
        isLoading, history, ownerWin, otherPlayerWin, ownerId, otherPlayerId,
      } = this.state;
      const {
        gameConfig,
      } = this.props;

      const winner = calculateWinner(history);
      const isMyTurn = this.isMyTurn();
      const isGameFineshed = winner || (this.isGameFineshed() && this.checkAllSquareIsNull());
      const canPlay = !!(ownerId && otherPlayerId);

      if (!gameConfig) {
        return <Header isLoading />;
      }

      const gameLoading = isLoading || !canPlay;

      return (
        <>
          <audio ref={(click) => {
            this.click = click;
          }}
          >
            <source src={click} type="audio/mpeg" />
          </audio>
          <div className="game">
            <div className="game-board">
              <Board
                squares={history}
                onClick={i => !isLoading && canPlay && this.handleClick(i)}
                isMyTurn={isMyTurn}
                isLoading={gameLoading}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="text-center te-stats">
              <Spin spinning={!ownerId}>
                <div className="te-winner-stat-title">
                  {ownerId}
                </div>
              </Spin>
              <div className="te-win-stat">
                {ownerWin}
              </div>
            </div>
            <div className="text-center te-stats">
              <Spin spinning={!otherPlayerId}>
                <div className="te-winner-stat-title">
                  {otherPlayerId}
                </div>
              </Spin>
              <div className="te-win-stat">
                {otherPlayerWin}
              </div>
            </div>
          </div>
          <h3 className="m-4 text-center">
            {isGameFineshed ? 'Game completed' : isMyTurn ? 'Your Turn!' : 'Waiting opponent.'}
          </h3>
          <div className="mt-2 mb-2 text-center">
            {
                        winner && (
                        <h3>
                          {`WINNER ${this.getWinnerName(winner)}!`}
                        </h3>
                        )
                    }
          </div>
        </>
      );
    }
}

Game.defaultProps = {
  gameConfig: {
    X: '',
    Y: '',
    ownerId: '',
    otherPlayerId: '',
    Winner: '',
    ownerWin: 0,
    otherPlayerWin: 0,
    nextPlayer: '',
  },
};

export default Game;
