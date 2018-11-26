import React from 'react';
import Button from '@material-ui/core/Button';

let Btn = (props) => <div {...props}/>;

export default (props) => {
    return <Button component={Btn} {...props}/>;
}