import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import axios from 'axios';
import Unique from './Unique';
import PrivateRoute from '../PrivateRoute/ProtectedRoute';
import { data } from 'jquery';
import Profile from './Profile';
import Projects from './Projects';
import Sidebar from './Sidebar';
function App() {
    const navigate = useNavigate();
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
    const clear = (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate('/login')
    }
    const unAuth = () => {
        localStorage.clear()
        navigate('/login')
    }
    const auth = (event) =>{
    event.preventDefault();
    axios({
        method: 'POST',
        url: 'https://localhost:7072/authenticate',
        data: {
            "name": event.currentTarget.parentElement.parentElement.parentElement[0].value,
            "password": event.currentTarget.parentElement.parentElement.parentElement[1].value
        }
    }).then(data =>{
        setIsLogged(true)
        navigate('/logged')
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('log', true)
    }).catch(err => {if((err.response.status) == 404){alert("Kullanıcı adı veya parola hatalı")} else {alert("Giriş Yapılamıyor Lütfen Daha Sonra Tekrar Deneyin")} })}
    const [isLogged, setIsLogged] = useState(false)
    return (
        <div className='App'>
            <Routes>
                <Route path="/" element={<Login login={auth} />}></Route>
                    <Route element={<PrivateRoute isLogged={isLogged || localStorage.getItem('log')} />}>
                        <Route path='/logged' element={<Unique />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/projects' element={<Projects/>} />
                    </Route>
                <Route path="/Register" element={<Register />}></Route>
                <Route path="Login" element={<Login login={auth} />}></Route>
            </Routes>
        </div>
    );
}
export default App;