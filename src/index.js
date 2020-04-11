import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Layout} from "antd";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';

const {Content} = Layout;


ReactDOM.render(
    <React.StrictMode>
        <Layout className="layout te-game-layout">
            <Content className="te-game-content">
                <div className="site-layout-content">
                    <App/>
                </div>
            </Content>
        </Layout>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
