import React from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import classNames from 'classnames';
import './square.scss';

const Box = posed.div({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: { ease: 'easeOut', duration: 300 },
      default: { ease: 'linear', duration: 500 },
    },
  },
});

const Square = ({
  onClick,
  isMyTurn,
  value,
  index,
}) => {
  const buttonClassNames = classNames({
    square: true,
    'te-my-turn': isMyTurn,
    [`squareIndex${index}`]: true,
  });
  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
    >
      <Box
        className="choose-text"
        pose={(value === 'X' || value === 'O') ? 'visible' : 'hidden'}
      >
        {value}
      </Box>
    </button>
  );
};

Square.propTypes = {
  onClick: PropTypes.func,
  isMyTurn: PropTypes.bool,
  value: PropTypes.string,
  index: PropTypes.number,
};

Square.defaultProps = {
  onClick: _noop,
  isMyTurn: false,
  value: '',
  index: 0,
};

export default Square;
