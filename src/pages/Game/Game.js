import React from 'react';
import {calculateWinner} from "../../utils/helper";
import Board from "../../components/Board";
import Header from "../../components/Header";
import {Button} from "antd";

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
            isLoading: false,
            xWantPlay: true,
            yWantPlay: true
        };
    }

    static getDerivedStateFromProps(props, state) {
        const {gameConfig: {history}, updateGame, xWantPlay, yWantPlay} = props
        const newGameConfig = {...props.gameConfig}

        const winner = calculateWinner(history);
        if (!!winner) {
            updateGame({
                xWantPlay: false,
                yWantPlay: false
            })
        }

        return newGameConfig
    }

    componentDidMount() {
        const {gameConfig} = this.props

        this.setState({
            ...this.state,
            ...gameConfig
        })
    }

    handleClick(i) {
        const {history} = this.state
        const {updateGame, gameConfig: {X}, currentUserId} = this.props

        console.log('history', history)
        console.log('this.isMyTurn()', this.isMyTurn())
        let newSquares = {...history}

        if (!this.isMyTurn() || (calculateWinner(history) || history[i])) {
            return;
        }
        newSquares[i] = X === currentUserId ? "X" : "O";
        this.setState({
            history: newSquares,
        }, () => {
            updateGame({
                history: newSquares,
                nextPlayer: this.getOtherPlayer()
            })
        });
    }

    isMyTurn = () => {
        const {currentUserId} = this.props;
        const {gameConfig: {nextPlayer}} = this.props;

        return nextPlayer === currentUserId
    }

    isItMyRoom = () => {
        const {currentUserId} = this.props;
        const {gameConfig: {ownerId}} = this.props;

        return ownerId === currentUserId
    }

    getOtherPlayer = () => {
        const {currentUserId} = this.props;
        const {gameConfig: {ownerId, otherPlayerId}} = this.props;
        let otherPlayer = ''

        if (currentUserId !== ownerId) {
            otherPlayer = ownerId
        }

        if (currentUserId !== otherPlayerId) {
            otherPlayer = otherPlayerId
        }

        return otherPlayer
    }


    getNextPlayer = () => {
        const {gameConfig: {nextPlayer}} = this.props;

        return nextPlayer ? nextPlayer : ''
    }

    getWinnerName = (state) => {
        const {gameConfig: {X, O}} = this.props;

        return state === 'X' ? X : O
    }

    isGameFineshed = () => {
        const { history } = this.state

        return history.length === 9
    }

    render() {
        const {isLoading, history, ownerWin} = this.state
        const {gameConfig, currentUserId, roomId, updateGame} = this.props

        const winner = calculateWinner(history);
        const isMyTurn = this.isMyTurn()
        const isItMyRoom = this.isItMyRoom()
        const nextPlayer = this.getNextPlayer()
        const isGameFineshed = winner || this.isGameFineshed()

        if (!gameConfig) {
            return <Header isLoading={true}/>
        }

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + nextPlayer;
        }

        if(isGameFineshed){
            status = "Game has finished. Waiting for room owner for start game."
        }

        return (
            <>
                <div className="game">
                    {
                        !isLoading ? <div className="game-board">
                            <Board
                                squares={history}
                                onClick={i => this.handleClick(i)}
                                isMyTurn={isMyTurn}
                            />
                        </div> : <Header isLoading={true}/>
                    }
                </div>
                <div>
                    {
                        !isLoading ? <div className="game-info">
                            <div>{status}</div>
                        </div> : null
                    }
                </div>
                { !isGameFineshed &&
                    <h3 className="m-4 text-center">
                        {isMyTurn ? 'Your Turn!' : 'Waiting opponent.'}
                    </h3>
                }
                {
                    isItMyRoom && <Button onClick={() => updateGame({history: []})}>
                        Start Again
                    </Button>
                }
                {
                    winner && <h1>
                        {`WINNER ${this.getWinnerName(winner)}!`}
                    </h1>
                }
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
        nextPlayer: ''
    }
}

export default Game;
