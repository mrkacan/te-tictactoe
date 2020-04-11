import React, {useState} from 'react';
import {Button, Input} from 'antd';
import Header from "../../components/Header";

function CreateOrJoinRoom({checkRoom}) {
    const [roomId, setRoomId] = useState('');

    const onJoinPress = () => {

        if (roomId && roomId.length === 4) {
            checkRoom(roomId)
        }
    }


    const isNumberValid = (number) => {
        return number === '' ? true : !!(number && number.length < 5);
    }


    return (
        <div className="te-register-form d-flex justify-content-center align-items-center">
            <div>
                <Header/>
                <Input
                    size="large"
                    placeholder="room id (4 digit)"
                    onChange={e => isNumberValid(e.target.value) && setRoomId(e.target.value)}
                    className="text-center"
                    value={roomId}
                    max={4}
                    type="number"
                    autoFocus={true}
                />
                <Button
                    disabled={roomId.length !== 4}
                    className="mt-2"
                    type="primary"
                    block
                    onClick={onJoinPress}
                >
                    JOIN & CREATE ROOM
                </Button>
            </div>
        </div>
    );
}

export default CreateOrJoinRoom;
