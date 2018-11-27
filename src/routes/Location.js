import React from 'react';

export default () => {
    return (
        <div>
            <h1>Location</h1>
            <div className="row">
                <div className="col-xl-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.9008578509865!2d-122.72391968444364!3d45.5925377328918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495a7de067cd157%3A0x4b152b8321a8958b!2s5326+N+Cecelia+St%2C+Portland%2C+OR+97203!5e0!3m2!1sen!2sus!4v1543284476587"
                        width="100%" height="450" frameBorder="0" allowFullScreen/>
                </div>
                <div className="col-xl-4">
                    <h3>Some Descriptions Here</h3>
                    <p>
                        You can get to the location by driving, but first we need to pick a location so /shrug.
                    </p>
                </div>
            </div>
        </div>
    );
};