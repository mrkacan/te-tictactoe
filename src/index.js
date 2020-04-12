import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Layout} from "antd";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "firebase";

const {Content} = Layout;

const firebaseConfig = {
    apiKey: "AIzaSyDQtpaeFhvUUeUtUUxA4xlDaEzDiSo7fHc",
    authDomain: "te-tictactoe.firebaseapp.com",
    databaseURL: "https://te-tictactoe.firebaseio.com",
    projectId: "te-tictactoe",
    storageBucket: "te-tictactoe.appspot.com",
    messagingSenderId: "478023561910",
    appId: "1:478023561910:web:81e0297885e6397316ec17",
    measurementId: "G-LB8CWZC46J"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <>
        <Layout className="layout te-game-layout">
            <Content className="te-game-content">
                <div className="site-layout-content">
                    <App/>
                </div>
            </Content>
        </Layout>
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
