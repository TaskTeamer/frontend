import React, { useState, useEffect, useRoutes} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import axios from 'axios';
import Unique from './Unique';
import PrivateRoute from '../PrivateRoute/ProtectedRoute';
import SelectedProject from './BackLogTasks';
import Profile from './Profile';
import Projects from './Projects';
import SidebarLayout from './SidebarLayout';
import BaseURL from './BaseURL.json';
import BackLogTasks from './BackLogTasks';
function App() {
    const navigate = useNavigate();
    const baseUrl = BaseURL.baseUrl;
    const clear = (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate('/login')
    }
    const unAuth = () => {
        localStorage.clear()
        navigate('/login')
    }
    const auth = (event) => {
        event.preventDefault();
        axios.post(`${baseUrl}/users/login`,
            { email: event.currentTarget.parentElement.parentElement.parentElement[0].value, password: event.currentTarget.parentElement.parentElement.parentElement[1].value })
            .then((res) => {
                setIsLogged(true)
                navigate('/main')
                localStorage.setItem('log', true)
                localStorage.setItem('accessToken', res.data.tokens.accessToken)
                localStorage.setItem('refreshToken', res.data.tokens.refreshToken)
                localStorage.setItem('userId', res.data.user)
                localStorage.setItem('userName', res.data.username)
            }).catch((err) => { alert("Kullanıcı Adı veya parola hatalı") })
    }
    
    const [isLogged, setIsLogged] = useState(false)
    return (
        <>
            <Routes>
                <Route path="/Register" element={<Register />}></Route>
                <Route path="/" element={<Login login={auth} />}></Route>
                <Route element={<PrivateRoute isLogged={isLogged || localStorage.getItem('log')} />}>
                    <Route element={<SidebarLayout />}>
                        <Route path='/main' element={<Unique />} />
                        <Route path='/main/profile' element={<Profile />} />
                        <Route path='/main/project' element={<Projects/>} />
                        <Route path='/main/backlogtasks' element={<BackLogTasks/>}/>
                    </Route>
                </Route>
                <Route path="Login" element={<Login login={auth} />}></Route>
            </Routes>
        </>
    );
}
export default App;