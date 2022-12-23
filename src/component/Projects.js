import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BaseURL from './BaseURL.json';
import { FaDiscourse } from "react-icons/fa";
import ReactDOMServer from 'react-dom/server';
function Projects(state){
    const location = useLocation();
    const [task, setTask] = useState(0);
    const [user,setUsers] = useState(1);
    const baseUrl = BaseURL.baseUrl;
    const getTask = () => {
        axios.get(`${baseUrl}/tasks/getbyprojectid/${location.state.id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json; charset=utf-8",
                "ngrok-skip-browser-warning": "any"
            }
        }).
            then(data => { setTask(data.data) }).catch(err => { console.log(err) })
    }
    const getUsers = (id) => {
        axios.get(`${baseUrl}/tasks/gettaskusers/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json; charset=utf-8",
                "ngrok-skip-browser-warning": "any"
            }
        }).then(data => {
            console.log(data.data)
            setUsers(data.data)
        }).catch(err => {
        })
    }
    useEffect(() => {
        getTask()
    }, [])
    return (
        <div>
            {Object.values(task).map(key => (
                <div className="card m-3">
                    <div className="card-title m-2" style={{ "display": "" }}>
                        {key.title}
                        <div className="card-body p-4" id="#parent">
                            {getUsers(key.id)}
                            <div>Üyeler : </div>
                            {Object.values(user).map(key => (
                                <div>{key.id}</div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Projects;