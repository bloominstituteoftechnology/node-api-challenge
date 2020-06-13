import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/projects')    
      .then(res => {
        console.log(res)
        setData(res.data.project)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Projects</h1>
        {data.map((data) => (
          <p key={data.id}>name: {data.name}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
