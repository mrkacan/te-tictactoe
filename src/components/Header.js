import React from 'react';
import logo from '../assets/image/logo.png';
import {Spin} from "antd";

function Header(props) {
    return (
        <div className="te-logo-header">
            <div>
                <img className="te-logo" src={logo}/>
            </div>
            <div>
                {
                    props.isLoading && <Spin/>
                }
            </div>
        </div>
    );
}

export default Header;
