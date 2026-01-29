import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../src/pages/Home";


function App() {
  return (
    <Router>
      <div style={{padding: "1rem", fontFamily: "sans-serif"}}>
        <header style={{marginBottom: "2rem"}}>
          <h1>welcome to github</h1>
          <nav>
            <Link to="/" style={{marginRight: "1rem"}}>Home</Link>
            {/* <Link to="/about">About</Link> */}
          </nav>
        </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
      {/* <Route path="/about" element={<About />}/> */}
      </Routes>
      </div>
      </Router>
      );
}

export default App;