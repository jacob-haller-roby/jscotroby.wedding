import React from 'react';
import Paper from '@material-ui/core/Paper';

export default () => {
    return (
        <Paper className='collage-paper'>
            <div className='collage'>
                <div className='row'>


                    <div className='col-6'>
                        <img src='/images/waterfall.jpg'/>
                    </div>

                    <div className='col-6'>
                        <img src='/images/couch.jpg'/>
                    </div>
                </div>
                <div className='row'>

                    <div className='col-4'>
                        <img src='/images/kiss.jpg'/>
                    </div>

                    <div className='col-4'>
                        <img src='/images/oranges.jpg'/>
                    </div>

                    <div className='col-4'>
                        <img src='/images/pumpkins.jpg'/>
                    </div>
                </div>
            </div>
        </Paper>
    );
};