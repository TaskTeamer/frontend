import React, { useEffect, useState,useRef } from "react";
import { json, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import LastSeen from "./LastSeen";
import BaseURL from './BaseURL.json';
function Unique(props) {
    const [data, setData] = useState(0);
    const baseUrl = BaseURL.baseUrl;
    const addProject = (event) => {
        axios({
            method : "POST",
            url : "http://localhost:3002/projects",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data : {
                "name": Inputloc.current.value,
                "ownerId" : localStorage.getItem('userId'),
                "teamName" : Inputjob.current.value,
                "team" : [localStorage.getItem('userId')]
            }
        }).catch(err => {alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') }).then(window.location.reload(false))
    }
    const navigate = useNavigate()
    const clear = (event) => {
        localStorage.clear()
        navigate('/login')
    }
    const unAuth = () => {
        localStorage.clear()
        navigate('/login')
    }
    const Inputjob = useRef(null);
    const Inputloc = useRef(null);
    return (
        <>

            <div className="App">
                <div style={{ "position": "absolute", "right": "1rem", "top": "1em" }}>
                    <LastSeen />
                </div>
                <div className="card m-5" style={{ "width": "50%","textAlign":"center" }}>
                    <img src="https://serving.photos.photobox.com/32307779d65eebc59486b1b3da085e5132d4e83f74c536f2d9a4e0b085d17a27a779f3e6.jpg" style={{ "width": "100%" }} />
                        <div className="card-body">
                            <h5 className="card-title">Proje Ekle</h5>
                            <div className="form-group">
                                <input placeholder="Projenize isim verin" ref={Inputloc} className="form-control" id="exampleFormControlInput1"/>
                                <input placeholder="Takımınıza isim verin" ref={Inputjob} className="form-control mt-2"/>
                            <button className="btn btn-primary mt-3" onClick={addProject}>
                                Proje Ekle
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default Unique;