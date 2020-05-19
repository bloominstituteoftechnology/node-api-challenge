import React,{ useState, useEffect } from "react";
import axios from "axios";

const Projects = () =>{

    const getProjects = () => {
        axios
            .get(`http://localhost:5000/api/projects/1`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const pullLog = e =>{
        e.preventDefault();
        getProjects();
    }

    return (
        <>
        <h1> Projects </h1>
        <button onClick={pullLog}>Pull and Log</button>
        </>
    )
}

export default Projects;