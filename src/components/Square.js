import React from 'react';
import posed from 'react-pose';

const Box = posed.div({
    hidden: {
        scale: 0,
        opacity: 0
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            opacity: { ease: 'easeOut', duration: 300 },
            default: { ease: 'linear', duration: 500 }
        }
    }
});

function Square(props) {
    return (
            <button

                className={`square ${props.isMyTurn ? 'te-my-turn' : ''}`} onClick={props.onClick}>
                <Box
                    pose={(props.value === 'X' || props.value === 'O') ? 'visible' : 'hidden'}
                >
                    {props.value}
                </Box>
            </button>
    );
}

export default Square;
