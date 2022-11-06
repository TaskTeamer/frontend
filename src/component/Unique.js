import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Projects from "./Projects";
import PrivateRoute from "../PrivateRoute/ProtectedRoute";
function Unique(props) {
    const [data, setData] = useState(0);
    const getData = async () => {
        const { data } = await axios({
            method: 'GET',
            url: 'https://localhost:7072/authenticate',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).catch(data => { unAuth() })
        setData(data)
    }
    useEffect(() => {
        getData();
    }, [])
    const navigate = useNavigate()
    const clear = (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate('/login')
    }
    const unAuth = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className="App">
            <Sidebar logOut={clear} name={data.name}/>
        </div>
    )           
}
export default Unique;