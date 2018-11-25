import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    row: {
        width: '100%',
        margin: 'auto'
    },
    bigAvatar: {
        width: 100,
        height: 100,
        margin: 4,
        display: 'inline-block'
    }
};

const About = (props) => {

    const { classes } = props;
    return (
        <div>
            <h1>About Us</h1>
            <div className={classes.row}>
                <Avatar component={Paper} src='/images/jade.jpg' className={classes.bigAvatar}/>
                <Avatar component={Paper} src='images/jake.jpg' className={classes.bigAvatar}/>
            </div>
            <p>Todo: Info about us</p>
        </div>
    );
};

export default withStyles(styles)(About);