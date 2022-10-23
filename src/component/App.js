import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import FirstPage from './FirstPage';
import axios from 'axios';
class App extends React.Component {
    state = {

    }
    render() {
        
        return (
            <>
            
                <Routes>
                    <Route path="/" element={<FirstPage />}></Route>
                    <Route path="/Register" element={<Register />}></Route>
                    <Route path="/Login" element={<Login />}></Route>
                </Routes>
            </>
        )
    }
}
export default App;