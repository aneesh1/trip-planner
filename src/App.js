import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from "./components/Header"
import "./App.css";
import { HowItWorks } from "./components/HowItWorks";
import { TryIt } from "./components/TryIt"

function App() {
    return (
    <div className='App'>
        <Router>
            <Route path='/:page' component={Header} />
            <Route exact path='/' component={Header} />
            <Route exact path='/' component={HowItWorks} />
            <Route exact path='/howitworks' component={HowItWorks} />
            <Route exact path='/tryit' component={TryIt} />
        </Router>
    </div>
  );
}

export {
    App
}