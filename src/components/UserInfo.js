import { Avatar } from 'antd';
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import React from 'react';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { getAvatarFirstCharacter } from '../utils/helper';

const UserInfo = ({ currentUserId, logout, currentRoom }) => (
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div className="d-flex align-items-center">
      <Avatar className="te-avatar">
        {getAvatarFirstCharacter(currentUserId)}
      </Avatar>
      <div className="d-flex align-items-start flex-column">
        <div className="te-active-user ml-2">
          {`user: ${currentUserId}`}
        </div>
        {currentRoom
          ? (
            <div className="te-active-user ml-2">
              {`room code: ${currentRoom}`}
            </div>
          ) : null}
      </div>
    </div>
    <div onClick={logout} className="cursor-pointer te-logout" role="button">
      Logout
      <LogoutOutlined size="medium" className="ml-1" />
    </div>
  </div>
);

UserInfo.propTypes = {
  logout: PropTypes.func,
  currentRoom: PropTypes.string,
  currentUserId: PropTypes.string,
};

UserInfo.defaultProps = {
  logout: _noop,
  currentRoom: '',
  currentUserId: '',
};

export default UserInfo;
