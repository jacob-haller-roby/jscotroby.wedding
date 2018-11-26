import React, {Component} from 'react';
import store from './redux/Store';
import {Provider} from 'react-redux';
import Router from './Router.js';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Elsie'
    },
    palette: {
        primary: {main: '#b21c0e'},
        secondary: {main: '#B171C4'}
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <div className="App">
                        <Router/>
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
