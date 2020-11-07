import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import classNames from 'classnames';
import Square from './Square';

const Board = ({
  onClick,
  squares,
  isMyTurn,
  isLoading,
}) => {
  const renderSquare = (index) => (
    <Square
      isMyTurn={isMyTurn}
      value={squares[index]}
      onClick={() => onClick(index)}
      index={index}
    />
  );

  const isLoadingClassNames = classNames({
    'board-loading': isLoading,
  });

  return (
    <div className={isLoadingClassNames}>
      {
                isLoading && (
                <div className="board-spinner">
                  <Spin />
                </div>
                )
    }
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

Board.propTypes = {
  onClick: PropTypes.func,
  squares: PropTypes.array,
  isMyTurn: PropTypes.bool,
  isLoading: PropTypes.bool,
};

Board.defaultProps = {
  onClick: _noop,
  squares: [],
  isMyTurn: false,
  isLoading: true,
};

export default Board;
