import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function Landing() {
    return (
        <div>
            <h1>Welcome to the project list</h1>
             <Link to ="/projects">Project List</Link>
        </div>
    )
}

export default Landing;
