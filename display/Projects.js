import React, {useState, useEffect} from 'react';
import axios from 'axios'

function Projects() {
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        fetchProjects()
    },[])
   async function fetchProjects(){
        try {
            const fetchProj = await axios.get('https://web-api-challenge.herokuapp.com/api/project');
            setProjects(fetchProj.data)
        } catch (error) {
            throw Error(error)
        }
    }
    return (
        <div className="container">
            {projects.length >=1 && projects.map((project, i) => (
            <div key={i}>
                   <p>ProjectName: {project.name}</p>
                <button>Complete</button>
            </div>))}
        </div>
    )
}

export default Projects