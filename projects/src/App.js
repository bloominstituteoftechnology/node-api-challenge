import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ProjectList from './components/projects/ProjectList';
import AddProject from './components/projects/AddProject';
import Home from './components/Home';
import EditProject from './components/projects/EditProject';
import ActionsList from './components/actions/ActionsList';
import ProjectPage from './components/projects/ProjectPage';
import ActionPage from './components/actions/ActionPage';
import { AddActions } from './components/actions/AddActions';
import EditAction from './components/actions/EditAction';
function App() {
  return (
    <div className="App">
      <Route exact path ="/" component={Home} />
      <Route exact path="/api/projects" component={ProjectList}/>
      <Route exact path="/api/newproject" component={AddProject} />
      <Route exact path="/api/projects/:id" component={ProjectPage} />
      <Route exact path="/edit/:id" component={EditProject} />
      <Route exact path="/editaction/:id" component={EditAction} />
      <Route exact path="/api/actions" component={ActionsList} />
      <Route exact path="/api/actions/:id" component={ActionPage} />
      <Route exact path="/api/addaction" component={AddActions} />
    </div>
  );
}

export default App;
