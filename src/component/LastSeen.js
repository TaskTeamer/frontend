import React, { useEffect, useState} from "react";
import {
    FaRegClock,
    FaRegStar
} from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import {Route, Routes,useNavigate} from "react-router-dom";
import BaseURL from './BaseURL.json';
import Projects from "./Projects";
function LastSeen() {
    const [projects, setProjects] = useState(0);
    const baseUrl = BaseURL.baseUrl;
    const navigate = useNavigate();
    const getProjects = () => {
        axios.get(`${baseUrl}/projects/getbyuserid/${localStorage.getItem('userId')}`, {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type" : "application/json; charset=utf-8",
            "ngrok-skip-browser-warning":"any"
          }}).
        then(data => {setProjects(data.data)}).catch(err => {console.log(err)})
    }
    useEffect(() => {
        getProjects()
    }, [])
    const toComponentB=(projeid)=>{
        navigate('/main/project',{state:{id:projeid}});
    }
    return (
        <>
            <div style={{ "fontSize": "13px", "color": "#5E6C84" }}>
                <FaRegClock className="m-2" />
                Proje Oluştur
            </div>
            <div style={{ "fontSize": "13px", "color": "#5E6C84" }}>
                <FaRegClock className="m-2" />
                Çalışma Alanları
            </div>
            {
            <div style={{ "height": "450px", "overflow": "auto" }}>
                Detaylı Görüntüleme <br/>İçin Proje Seçiniz
                {Object.values(projects).map(key => (
                    <div className="card row m-2">
                        <center>
                            <button onClick={() => {toComponentB(key.id)}} className="col card" style={{"border":"none"}}  key={key.name}>
                                {key.name}
                            </button>
                        </center>
                        <p style={{ "textAlign": "center" }} key={key.user_name}>Oluşturan : {key.user_name} </p>
                    </div>
                ))}
                
            </div>
            }
        </>
    )
}
export default LastSeen;