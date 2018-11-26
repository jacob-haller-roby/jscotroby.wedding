import React from 'react';
import Identity from "../components/Identity";
import RSVPForm from "../components/RSVPForm";

export default () => {
    return (
        <div>
            <h1>RSVP</h1>
            <Identity loginPrompt='Login to view and update your RSVP status'>
                <RSVPForm/>
            </Identity>
        </div>
    );
};