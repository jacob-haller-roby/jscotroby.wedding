import React, {Component} from 'react';
import {Dialog, DialogTitle, TextField} from '@material-ui/core';
import Button from './Button';


class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
    }

    handleChange(key) {
        return (e) => {
            let newState = {};
            newState[key] = e.target.value;
            this.setState(newState);
        }
    };

    checkEnter(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    };

    handleClose() {
        this.props.onClose();
    };

    login() {
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="login-dialog-title" {...this.props}>
                <DialogTitle id="login-dialog-title">Login</DialogTitle>
                <div className='login-dialog-form'>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        onChange={this.handleChange('email')}
                        onKeyDown={this.checkEnter}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        onChange={this.handleChange('password')}
                        onKeyDown={this.checkEnter}
                        margin="normal"
                        type="password"
                        variant="outlined"
                    />
                    <Button onClick={this.login}>Login</Button>
                </div>
            </Dialog>
        );
    }
}

export default LoginDialog;