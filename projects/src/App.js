import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ProjectList from './components/ProjectList';
 import AddProject from './components/AddProject';
import Home from './components/Home';
import ProjectPage from './components/ProjectPage';
import EditProject from './components/EditProject';
function App() {
  return (
    <div className="App">
      <Route exact path ="/" component={Home} />
      <Route exact path="/api/projects" component={ProjectList} />
      <Route exact path="/api/newproject" component={AddProject} />
      <Route exact path="/api/projects/:id" component={ProjectPage} />
      <Route exact path="/edit/:id" component={EditProject} />
    </div>
  );
}

export default App;
