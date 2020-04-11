import React from 'react';
import {calculateWinner} from "../../utils/helper";
import Board from "../../components/Board";
import {Spin} from "antd";
import Header from "../../components/Header";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            gameConfig: {
                X: '',
                Y: '',
                ownerId: '',
                otherPlayerId: '',
                Winner: '',
                ownerWin: 0,
                otherPlayerWin: 0,
                nextPlayer: ''
            },
            isLoading: true,
        };
    }

    componentDidMount() {

    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        }, () => {
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);
            if (!!winner) {
                alert('vuhu!', winner)
                console.log('winner', winner)
            }
        });
    }

    render() {
        const {isLoading, history, stepNumber} = this.state
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <>
                <div className="game">
                    {
                        !isLoading ? <div className="game-board">
                            <Board
                                squares={current.squares}
                                onClick={i => this.handleClick(i)}
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
            </>
        );
    }
}

export default Game;
