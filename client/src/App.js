import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import './App.css';

const App = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		axios
			.get('https://backend-sprint-john.herokuapp.com/api/projects/')
			.then(res => {
				// console.log(res.data);
				setProjects(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const Container = Styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    text-align: center;
  `;

	const Card = Styled.div`
  border: 1px solid black;
  padding: 4%;
  `;

	return (
		<div>
			<Route path='/'>
				<h1>Projects</h1>
				<Container>
					{projects.map(project => (
						<Card key={project.id}>
							<h2>{project.name}</h2>
							<p>{project.description}</p>
							<Link to='/:id/actions'>Actions</Link>
						</Card>
					))}
				</Container>
			</Route>
		</div>
	);
};

export default App;
