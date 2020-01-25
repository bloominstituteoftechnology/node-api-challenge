import React, { useState } from 'react';
import Projects from '../src/components/Projects';
import ProjectDetail from '../src/components/ProjectDetail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { ProjectContext } from '../src/contexts/ProjectContext';

function App() {
  const [projectsDetail, setProjectDetail] = useState([]);

  return (
    <Router>
      <div className="App">
        <ProjectContext.Provider value={{ projectsDetail, setProjectDetail }}>
          <Route exact path="/" component={Projects} />
          <Route path="/projectdetail" component={ProjectDetail} />
        </ProjectContext.Provider>
      </div>
    </Router>
  );
}

export default App;
