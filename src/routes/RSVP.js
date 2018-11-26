import React from 'react';
import Identity from "../components/Identity";
import RSVPView from "../components/RSVPView";

export default () => {
    return (
        <div>
            <h1>RSVP</h1>
            <Identity loginPrompt='Login to view and update your RSVP status'>
                <RSVPView/>
            </Identity>
        </div>
    );
};