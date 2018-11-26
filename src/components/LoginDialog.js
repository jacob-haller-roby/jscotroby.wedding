import React, {Component} from 'react';
import {Dialog, DialogTitle, TextField} from '@material-ui/core';
import Button from './Button';


class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key) {
        return (e) => {
            let newState = {};
            newState[key] = e.target.value;
            this.setState(newState);
        }
    }
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
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
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