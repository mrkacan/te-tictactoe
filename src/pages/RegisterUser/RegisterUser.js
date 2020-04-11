import React, {useState} from 'react';
import {Button, Input} from 'antd';
import LocalStorage from "../../utils/storage";
import Header from "../../components/Header";

function RegisterUser({checkUser}) {
    const [userId, setUserId] = useState('');
    const onRegisterPress = () => {
        LocalStorage.setItem('userId', userId).then(() => {
            checkUser()
        })

    }


    return (
        <div className="te-register-form d-flex justify-content-center align-items-center">
            <div>
                <Header/>
                <Input
                    size="large"
                    placeholder="username"
                    onChange={e => setUserId(e.target.value.toLowerCase())}
                    className="text-center"
                    value={userId}
                    spellCheck={false}
                    autoFocus={true}
                />
                <Button
                    className="mt-2"
                    type="primary"
                    block
                    onClick={onRegisterPress}
                >
                    CONTINUE
                </Button>
            </div>
        </div>
    );
}

export default RegisterUser;
