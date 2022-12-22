import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BaseURL from './BaseURL.json';
const Projects = (state) => {
    const location = useLocation();
    const [task, setTask] = useState(0);
    const [users, setUsers] = useState(0);
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
        }).then(data => {/*setUsers(data.data)*/console.log(data)}).catch(err => {console.log(err)})
    }
    useEffect(() => {
        getTask()
    }, [])
    return (
        <div>
            {Object.values(task).map(key => (
                <div className="card m-3">
                <div className="card-title m-2" style={{"display":""}}>
                    {key.title}
                    <div className="card-body">
                        {getUsers(key.id)}
                    </div>
                </div>
                </div>
            ))}
        </div>
    )
}
export default Projects;