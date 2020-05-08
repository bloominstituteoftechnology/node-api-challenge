import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from './ProjectsList';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <section>
          <ProjectList />
        </section>
      </main>
    </div>
  );
}

export default App;
