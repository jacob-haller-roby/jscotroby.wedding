import React, {Component} from 'react';
import {connect} from 'react-redux';
import {areSubmissionsReceived, selectCurrentUserRSVPs} from "../redux/Selectors";
import {submitRSVP} from "../redux/Actions";
import {CircularProgress} from "@material-ui/core";
import RSVPForm from "./RSVPForm";

class RSVPView extends Component {

    propsToRsvps(props = this.props) {
        let rsvps = [];
        for (let i = 0; i < this.getRSVPCount(); i++) {
            let rsvp = props.previousRSVPs[i] || {};
            rsvps.push(rsvp.data || {});
        }
        return rsvps;
    }

    getRSVPCount() {
        return 2;
    }

    render() {
        if (!this.props.submissionsReceived) {
            return (
                <div className="row center">
                    <CircularProgress/>
                </div>
            );

        } else {
            return <RSVPForm {...this.props}
                             RSVPCount={this.getRSVPCount()}
                             previousRSVPs={this.propsToRsvps()}/>
        }
    }
}

export default connect(
    (state) => ({
        previousRSVPs: selectCurrentUserRSVPs(state),
        submissionsReceived: areSubmissionsReceived(state)
    }),
    (dispatch) => ({
        submitRSVPs: (RSVPs) => dispatch(submitRSVP(RSVPs))
    })
)(RSVPView);
