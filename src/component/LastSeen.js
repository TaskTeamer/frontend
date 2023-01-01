import React, { useEffect, useState } from "react";
import {
    FaRegClock,
    FaRegStar,
    FaTrash,
    FaList
} from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import BaseURL from './BaseURL.json';
import Projects from "./Projects";
function LastSeen() {
    const [projects, setProjects] = useState(0);
    const baseUrl = BaseURL.baseUrl;
    const navigate = useNavigate();
    const getProjects = () => {
        axios({
            method: "GET",
            url: `${baseUrl}/projects/getbyuserid/${localStorage.getItem('userId')}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(data => { setProjects(data.data) })
            .catch(err => { alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') })
    }
    const deleteProject = (event, pId) => {
        event.preventDefault()
        axios({
            method: "DELETE",
            url: `${baseUrl}/projects/${pId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            }
        }).then(window.location.reload(false)).catch(err => console.log(err))
    }
    const addProject = () => {

    }
    useEffect(() => {
        getProjects()
    }, [])
    const toComponentB = (projeid) => {
        navigate('/main/project', { state: { id: projeid } });
    }
    return (
        <div className="App">
            <div style={{ "fontSize": "13px", "color": "#5E6C84" }}>
                <FaList className="m-2" />
                Çalışma Alanları
            </div>
            <div style={{ "height": "450px", "overflow": "auto" }} className="m-2">
                Detaylı Görüntüleme <br />İçin Proje Seçiniz
                {Object.values(projects).map(key => (
                    <div className="card row m-2">
                        <center key={key.name}>
                            <button onClick={() => { toComponentB(key.id) }} className="col card text-primary fs-5" style={{ "border": "none" }} >
                                {key.name}
                            </button>
                        </center>
                        <p style={{ "textAlign": "center" }} key={key.user_name}>Oluşturan : {key.user_name} </p>
                        <center key={key.id}><big><FaTrash onClick={(event) => deleteProject(event, key.id)} className="text-danger mr-2" /></big></center>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default LastSeen;