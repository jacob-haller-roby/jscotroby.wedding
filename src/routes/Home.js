import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import netlifyIdentity from "netlify-identity-widget";

class Home extends Component {
    openLogin() {
        netlifyIdentity.open();
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <Button onClick={this.openLogin}>Login</Button>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum</p>
            </div>
        );
    }
};

export default Home;