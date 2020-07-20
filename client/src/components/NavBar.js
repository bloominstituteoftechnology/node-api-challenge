import React from 'react';

import CreatePost from '../components/CreatePost';

import { BrowserRouter as Router,Route, Switch, Link } from "react-router-dom";

export default function NavBar(){
  

return (
        <Router>
            <div>
                <Link to="/">POSTS</Link>
             
            </div>

            <Switch>
                <Route exact path="/" component={CreatePost}/>
              

            </Switch>
        </Router>
  );
}

