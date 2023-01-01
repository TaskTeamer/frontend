import BaseURL from './BaseURL.json';
import { React, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
function AllProjects(props) {
    const [projects, setProjects] = useState(0);
    const [member,setMember] = useState(0);
    const baseUrl = BaseURL.baseUrl;
    const getProjects = () => {
        axios({
            method: "GET",
            url: `${baseUrl}/projects/getbyuserid/${localStorage.getItem('userId')}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(data => { setProjects(data.data)})
            .catch(err => { alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') })
    }
    const getUserName = (event) => {
        event.preventDefault()
        setMember(event.currentTarget.value)
    }
    const addUser = (event,projectId) => {
        event.preventDefault()
        axios({
            method : "POST",
            url : `${baseUrl}/projects/addusertoproject`,
            headers : {
                "Autorization" : 'Bearer '+ localStorage.getItem('accessToken')
            },
            data : {
                "userName" : `${member}`,
                "projectId" : `${projectId}`
            }
        }).then(alert("Kullanıcı Eklendi")).catch(err => alert(err))
    }
    useEffect(() => {
        getProjects()
    }, [])
    const InputUserName = useRef(null);
    const navigate = useNavigate();
    return (
        <div className="App">
            <div className='container overflow-hidden text-center'>
            {Object.values(projects).map(key => (
                <div className='row gx-5 p-3'>
                    <div className="col card row m-2">
                        <h4 className='card-title p-3'>{key.name}</h4>
                        <p style={{ "textAlign": "center" }} key={key.user_name}>{key.user_name} üyesiniz </p>
                    </div>
                    <div class="col card p-3">
                        <input type="text" class="form-control" onChange={getUserName} placeholder='Kullanıcı Adı'/>
                        <button type='submit' className='btn btn-primary m-2' onClick={(event)=> addUser(event,key.id)} >Üye Ekle</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
export default AllProjects;