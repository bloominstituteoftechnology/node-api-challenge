import React, {useState, useEffect} from 'react';
import Posts from './Posts';
import axios from 'axios';

function App() {
  const [ info, setInfo] = useState({
    name:'',
  })
  
  const [ projects, setProjects] = useState();
  const [ posts, setPosts] = useState();
  
  const changeHandler = e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }
  
  // const submitHandler = e => {
  //   e.preventDefault();
  //   axios
  //   .post("http://localhost:5000/api/users", info)
  //   .then(res => asyncRefresh())
  //   .catch(err => console.log("Error", err.message));
  // }

  // const getPosts = e => {
  //   axios
  //   .get(`http://localhost:5000/api/users/${e.target.id}/posts`)
  //   .then(res => setPosts(res.data))
  //   .catch( err => console.log("Error", err.message, err.response));
  // }

  useEffect(()=>{
    axios
    .get("http://localhost:4000/api/project")
    .then(res => setProjects(res.data))
    .catch( err => console.log("Error", err.message, err.response));
  },[])

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 100);
    });
  }

  async function asyncRefresh(){
    // eslint-disable-next-line
    const result = await resolveAfter2Seconds()
    const windowRefresh = window.location.reload(true)
    console.log("You deleted it")
    return windowRefresh
  }


  return (
    <div>
        
        <div>
          {projects && projects.map(project => (
              <div key={project.id}>
                  <h1>{project.name}</h1>
                  <button id={project.id}>Get Actions</button>
                  
                  {/* <Posts posts={posts}/> */}
              </div> 
          ))}
          
        </div>

      </div>
    );
}

export default App;
