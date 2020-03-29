import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
const Home = () => {
  
    return(
        <div>
        <Navigation />
            <div className="image-wrapper">
                <img
                    src="https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    alt="project sign"
                />  
            </div>
            <Footer/>
        </div>
    )
}
export default Home;