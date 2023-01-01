import { React, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BaseURL from './BaseURL.json';
import { format } from 'date-fns';
import Moment from 'moment';
import moment from "moment";
import {
    FaAngleRight,
    FaCheck,
    FaUserCircle,
    FaTrash
} from "react-icons/fa";
function Projects(state) {
    const location = useLocation();
    const [activeTask, setActiveTask] = useState(0);
    const baseUrl = BaseURL.baseUrl;
    const [sections, setSections] = useState(0);
    const [selectSections, setSelectSections] = useState(0);
    const navigate = useNavigate();
    const getActiveTask = () => {
        axios({
            method: "GET",
            url: `${baseUrl}/tasks/getprojectwithuser/${location.state.id}/active`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).
            then(data => { setActiveTask(data.data) })
            .catch(err => { alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') })
    }
    const addTask = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            url: `${baseUrl}/tasks/`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            data: {
                "title": `${InputTitle.current.value}`,
                "description": `${InputDesc.current.value}`,
                "creatorId": `${localStorage.getItem('userId').toString()}`,
                "createDate": `${moment(Date.now()).format("YYYY-MM-DD HH:MM")}`,
                "endDate": `${moment(InputEndDate.current.value).format("YYYY-MM-DD HH:mm").toString()}`,
                "statusId": 2,
                "sectionId": 1,
                "projectId": location.state.id
            }
        }).then(data => {window.location.reload(false); }).catch(err => { alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') })
    }
    const goBacklog = () => {
        navigate('/main/backlogtasks', { state: { id: location.state.id } });
    }
    const getEndDate = (e) => {
        e.preventDefault();
    }
    const changeSelectSection = (e) => {
        e.preventDefault();
        if (e.currentTarget.value == "Waiting") {
            setSelectSections(1)
        }
        else if (e.currentTarget.value == "In Progress") {
            setSelectSections(2)
        }
        else if (e.currentTarget.value == "Review") {
            setSelectSections(3)
        }
        else {
            setSelectSections(4)
        }
        console.log(selectSections)
    }
    const changeSection = (event,pId) => {
        axios({
            method: "PUT",
            url: `${baseUrl}/tasks/updatesection`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            },
            data: {
                "taskId": pId,
                "sectionId": selectSections
            }
        }).then(data => { window.location.reload(false) }).catch(err => {alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') })
    }
    const changeStatus = (event,pId) => {
        event.preventDefault()
        axios({
            method : "PUT",
            url : `${baseUrl}/tasks/updatestatus`,
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem('accessToken')
            },
            data : {
                "taskId" : pId,
                "statusId" : 1
            }
        }).then(window.location.reload(false)).catch(err => {alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') })
    }
    const delTask = (event,pId) => {
        event.preventDefault()
        axios({
            method : "DELETE",
            url : `${baseUrl}/tasks/${pId}`,
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem('accessToken')
            }
        }).then(window.location.reload(false)).catch(err => {alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login')})
    }
    useEffect(() => {
        getActiveTask()
        axios({
            method: "GET",
            url: `${baseUrl}/sections`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            }
        }).then(data => { setSections(data.data) }).catch(err => {alert("Oturumunuz Sonlandırılmıştır devam etmek için tekrar giriş yapınız"); navigate('/login') })
    }, [])
    const InputTitle = useRef(null);
    const InputDesc = useRef(null);
    const InputEndDate = useRef(null);
    return (
        <div className="App">
            <div className="container overflow-hidden text-center p-2">
                <div className="card text-bg-secondary p-3 mt-1 text-light">Active Görevleriniz</div>
                <button className='btn btn-sm btn-primary pe-2 mt-1' onClick={() => goBacklog()}>Backlog Tasklara Dönmek İçin Tıklayınız <FaAngleRight/> </button>
                {activeTask.length <= 0 ? <div className="card bg-danger text-white mt-5 p-3"><div className="card-title p-2">Active Task Bulunamadı ! </div></div> : Object.values(activeTask).map(key => (
                    <div className="row gx-5 card-title m-1">
                        {Object.values(key.projectList).map(pList => (
                            <div className="col p-3 m-3 card">
                                <div className="card-title" key={key.user.user_name}><FaUserCircle/>{key.user.user_name}</div>
                                <div className='card-body'> {pList.section_id == 1 ? <div className='bg-warning text-light'>{sections[pList.section_id - 1]?.name}</div>
                                    : pList.section_id == 2 ? <div className='bg-secondary text-white'>{sections[pList.section_id - 1]?.name}</div>
                                        : pList.section_id == 3 ? <div className='bg-primary text-white'>{sections[pList.section_id - 1]?.name}</div>
                                            : <div className='bg-success text-white'>{sections[pList.section_id - 1]?.name}</div>}</div>
                                    <div className='text-bg-info'>{pList.title}<br />
                                {pList.description}
                                {Date.parse(pList.end_date) >= Date.now() ?
                                    <div className="card text-bg-success">{moment(pList.end_date).format('DD.MM.YYYY')}</div> :
                                    <div className="card text-bg-danger">{moment(pList.end_date).format('DD.MM.YYYY')}
                                        <p>Belirlenen tarih geçti !</p>
                                    </div>}
                            </div>
                                <div className='row m-2'>
                                    <select className='form-select col' onChange={(e) => changeSelectSection(e, pList.id)} >
                                        {Object.values(sections).map(key => (
                                            <option>{key?.name}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-sm btn-outline-primary mt-2" onClick={(event) => changeSection(event,pList.id) }>Uygula</button>
                                </div>
                                <button className="btn btn-sm btn-primary pe-2 mb-1" style={{ "fontSize": "9pt" }} type="button" onClick={event => changeStatus(event,pList.id)}>
                                    Backlog olarak işaretle <br /><FaCheck />
                                </button>
                                <center><FaTrash style={{"fontSize":"20pt"}} className="text-danger" onClick={(event) => delTask(event,pList.id)}/></center>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="input-group input-group-sm mt-3 mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Başlık</span>
                <input type="text" className="form-control" ref={InputTitle} />
                <span className="input-group-text ms-2" id="inputGroup-sizing-sm">Açıklama</span>
                <input type="text" className="form-control" ref={InputDesc} />
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm" >Bitiş Tarihi</span>
                <input type="date" className="form-control" ref={InputEndDate} />
            </div>
            <div className="input-group-text bg-white" style={{ "border": "none" }}>
                <button type="button" className="btn btn-primary" onClick={addTask}>Task Ekle</button>
            </div>
        </div>
    )
}
export default Projects;