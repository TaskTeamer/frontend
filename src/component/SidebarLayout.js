import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BaseURL from './BaseURL.json';
const SidebarLayout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(0);
  const baseUrl = BaseURL.baseUrl;
  const getData = () => {
    axios.get(`${baseUrl}/projects/getbyuserid/${localStorage.getItem('userId')}`, {headers: {
      "Access-Control-Allow-Origin" : "*",
      "Content-Type" : "application/json; charset=utf-8",
      "ngrok-skip-browser-warning":"any"
    }})
      .then(res => {
          setData(res)
      })
      .catch(err => {console.log(err)})
  }
  useEffect(() => {
    getData()
  }, [])
  const unAuth = () => {
    localStorage.clear()
    navigate('/login')
  }
  const clear = (event) => {
    localStorage.clear()
    event.preventDefault()
    navigate('/login')
  }
  return (
    <Sidebar logOut={clear} profile={localStorage.getItem('userName')}>
      <Outlet />
    </Sidebar>
  );
}

export default SidebarLayout;