import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import Collage from './Collage';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {listForms} from "./redux/Actions";

import Home from './routes/Home';
import About from './routes/About';
import Location from './routes/Location';
import Registry from './routes/Registry';
import RSVP from './routes/RSVP';

const StyledLink = (props) => {
    return <NavLink exact {...props} activeStyle={
        {
            color: '#b21c0e',
            userSelect: 'none'
        }
    }/>;
};

const styles = {
    link: {
        textTransform: 'initial',
        fontFamily: 'Blacksword',
        color: '#B171C4',
        fontSize: 18,
        textShadow: '0px 1px gray'
    }
};

const PageLink = withStyles(styles)(
    (props) => {
        let {classes} = props;
        return (
            <Button component={StyledLink} to={props.to} className={classes.link}>
                {props.label}
            </Button>
        );
    }
);


class AppRouter extends Component {
    constructor(props) {
        super(props);
        props.listForms();
    };


    render() {
        return (
            <Router>
                <div className="col-md-8 offset-md-2">
                    <nav>
                        <Collage/>
                    </nav>

                    <Paper className='route'>
                        <h1>Jade and Jake</h1>
                        <h2>Wedding</h2>
                        <div className="full">
                            <PageLink to='/' label='Home'/>
                            <PageLink to='/about' label='About Us'/>
                            <PageLink to='/rsvp' label='RSVP'/>
                            <PageLink to='/registry' label='Registry'/>
                            <PageLink to='/location' label='Location'/>
                        </div>
                        <Paper className='route' elevation={10}>
                            <div className="full">
                                <Route path="/" exact component={Home}/>
                                <Route path="/about/" component={About}/>
                                <Route path="/rsvp/" component={RSVP}/>
                                <Route path="/registry/" component={Registry}/>
                                <Route path="/location/" component={Location}/>
                            </div>
                        </Paper>
                    </Paper>


                </div>
            </Router>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        listForms: () => dispatch(listForms())
    })
)(AppRouter);