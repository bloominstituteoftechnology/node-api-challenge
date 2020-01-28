import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";

import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import ActionList from "./components/actions/ActionList";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Container>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={ProjectList} />
              <Route path="/project/:id" component={Project} />
              <Route exact path="/project/:id/actions" component={ActionList} />
            </Switch>
          </main>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
