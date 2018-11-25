import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Collage from './Collage';


const AppRouter = () => (
    <Router>
        <div className="col-md-8 offset-md-2">
            <nav>
                <Collage/>
                <h1>Jade and Jake</h1>
                <h2>Wedding</h2>
            </nav>
            <Route path="/" exact component={() => null}/>
        </div>
    </Router>
);

export default AppRouter;