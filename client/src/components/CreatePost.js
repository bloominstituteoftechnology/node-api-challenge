import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
// import Posts from './Posts';
import axios from 'axios';

const Page = styled.div`
  background-color: peachpuff;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const Card = styled.div`
  background-color: plum;
  width:12em;
  border: 1px black solid;
  border-radius: 13px;
  
  
`
function App() {
  // const [ info, setInfo] = useState({
  //   name:'',
  // })
  
  const [ projects, setProjects] = useState();
  
  // const changeHandler = e => {
  //   setInfo({
  //     ...info,
  //     [e.target.name]: e.target.value
  //   })
  // }
  
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

  // function resolveAfter2Seconds() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve('resolved');
  //     }, 100);
  //   });
  // }

  // async function asyncRefresh(){
  //   // eslint-disable-next-line
  //   const result = await resolveAfter2Seconds()
  //   const windowRefresh = window.location.reload(true)
  //   console.log("You deleted it")
  //   return windowRefresh
  // }


  return (
    <div>
        
        <Page>
          {projects && projects.map(project => (
              <Card key={project.id}>
                  <h1>{project.name}</h1>
                  <button id={project.id}>Get Actions</button>
                  
                  {/* <Posts posts={posts}/> */}

              </Card> 
          ))}
          
        </Page>

      </div>
    );
}

export default App;
