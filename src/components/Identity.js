import React, {Component} from 'react';
import Authentication from '../hoc/Authentication';
import Button from '../components/Button';
import LoginDialog from '../components/LoginDialog';

class Identity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.isOpen = this.isOpen.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    isOpen() {
        return this.state.open && !this.props.isLoggedIn;
    }

    render() {
        return (
            <div>
                {this.renderButton()}
                <LoginDialog login={this.props.login}
                             open={this.isOpen()}
                             onClose={this.handleClose}/>
            </div>
        )
    }

    renderButton() {
        return this.props.isLoggedIn ? this.renderLogoutButton() : this.renderLoginButton();
    }

    renderLoginButton() {
        return (
            <div>
                <h3>{this.props.loginPrompt}</h3>
                <Button onClick={this.handleOpen}>Login</Button>
            </div>
        )
    }

    renderLogoutButton() {
        return <div>
            <p>Logged in as {this.props.user.user_metadata.full_name}</p>
            <Button onClick={this.props.logout}>Logout</Button>
            {this.props.children}
        </div>
    }

};

export default Authentication(Identity);