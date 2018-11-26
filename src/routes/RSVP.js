import React from 'react';
import Identity from "../components/Identity";

export default () => {
    return (
        <div>
            <h1>RSVP</h1>
            <Identity loginPrompt='Login to view and update your RSVP status'>
                <form name="contact" method="post">
                    <input type="hidden" name="form-name" value="rsvp" />
                    <p>
                        <label>Number Attending:<input type="number" name="confirmations"/></label>
                    </p>
                    <p>
                        <label>Number Declining:<input type="number" name="declines"/></label>
                    </p>
                    <p>
                        <button type="submit">Send</button>
                    </p>
                </form>
            </Identity>
        </div>
    );
};