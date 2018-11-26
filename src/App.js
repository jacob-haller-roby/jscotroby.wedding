import React, {Component} from 'react';
import store from './redux/Store';
import {Provider} from 'react-redux';
import Router from './Router.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Router/>
                </div>
            </Provider>
        );
    }
}

export default App;
