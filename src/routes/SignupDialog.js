import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from "../redux/Actions";
import {Dialog, DialogTitle, TextField, InputLabel} from '@material-ui/core';
import Button from '../components/Button';


class SignupDialog extends Component {

    constructor(props) {
        super(props);
        if (window.location.hash && window.location.hash.indexOf('#invite_token=') === 0) {
            window.location.hash.slice(1).split('&').forEach(item => {
                let parameter = item.split('=');
                this[parameter[0]] = parameter[1];
            });
            this.state = {
                open: true
            };
        } else {
            this.state = {
                open: false
            }
        }
        this.signup = this.signup.bind(this);
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
            this.signup();
        }
    };

    signup() {
        if (this.state.password !== this.state.confirm) {
            this.setState({error: true})
        } else {
            this.props.signup(this.invite_token, this.state.password)
            this.setState({open: false});
        }
    }

    render() {
        return (
            <Dialog aria-labelledby="signup-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}>
                <DialogTitle id="signup-dialog-title"><h1>Complete Account</h1></DialogTitle>
                <div className='dialog-form'>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        value={decodeURIComponent(this.email)}
                        margin="normal"
                        type="email"
                        variant="outlined"
                        disabled
                    />
                    {this.renderError()}
                    <TextField
                        id="outlined-password"
                        label="Password"
                        onChange={this.handleChange('password')}
                        onKeyDown={this.checkEnter}
                        margin="normal"
                        type="password"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-password"
                        label="Confirm Password"
                        onChange={this.handleChange('confirm')}
                        onKeyDown={this.checkEnter}
                        margin="normal"
                        type="password"
                        variant="outlined"
                    />
                    <Button onClick={this.signup}>Submit Password</Button>
                </div>
            </Dialog>
        );
    };

    renderError() {
        if (this.state.error && this.state.password !== this.state.confirm) {
            return (
                <InputLabel error>
                    Passwords don't match
                </InputLabel>
            );
        }
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        signup: (token, password) => dispatch(signup(token, password))
    })
)(SignupDialog);