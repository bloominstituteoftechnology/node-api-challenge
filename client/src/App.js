import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";

import ProjectList from "./components/ProjectList";
import Project from "./components/Project";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Container>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={ProjectList} />
              <Route exact path="/:id" component={Project} />
            </Switch>
          </main>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
