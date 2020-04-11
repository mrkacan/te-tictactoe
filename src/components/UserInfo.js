import {Avatar} from "antd";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import React from "react";

function UserInfo({currentUserId, logout, currentRoom}) {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
                <Avatar className="te-avatar">
                    {currentUserId.charAt(0).toUpperCase()}
                </Avatar>
                <div className="d-flex align-items-start flex-column">
                    <div className="te-active-user ml-2">
                        {'user: ' + currentUserId}
                    </div>
                    {currentRoom ?
                    <div className="te-active-user ml-2">
                        {'room code: ' + currentRoom}
                    </div>: null}
                </div>
            </div>
            <div onClick={logout} className="cursor-pointer te-logout">
                Logout <LogoutOutlined size={"medium"}/>
            </div>
        </div>
    );
}

export default UserInfo;
