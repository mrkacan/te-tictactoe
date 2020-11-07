import React, { useState } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import Header from '../../components/Header';

function RegisterUser({ checkUser }) {
  const [userId, setUserId] = useState('');
  const onRegisterPress = () => {
    checkUser(userId);
  };

  return (
    <div className="te-register-form d-flex justify-content-center align-items-center">
      <div>
        <Header />
        <Input
          size="large"
          placeholder="username"
          onChange={e => setUserId(e.target.value.toLowerCase())}
          className="text-center"
          value={userId}
          spellCheck={false}
          autoFocus
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

RegisterUser.propTypes = {
  checkUser: PropTypes.func,
};

RegisterUser.defaultProps = {
  checkUser: _noop,
};

export default RegisterUser;
