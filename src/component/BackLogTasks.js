import BaseURL from './BaseURL.json';
import { React, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import moment, { updateLocale } from "moment";
import {
    FaCheck,
    FaPen,
    FaAngleLeft,
    FaUserCircle,
    FaTrash
} from "react-icons/fa";
function BackLogTasks(state, props) {
    const [backlogTask, setBacklogTask] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [sections, setSections] = useState(0);
    const [selectSections,setSelectSections] = useState(0)
    let counter = 0;
    const baseUrl = BaseURL.baseUrl;
    const getBacklogTask = () => {
        axios.get(`${baseUrl}/tasks/getprojectwithuser/${location.state.id}/backlog`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json; charset=utf-8",
                "ngrok-skip-browser-warning": "any",
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).
            then(data => { setBacklogTask(data.data)})
            .catch(err => { alert('Oturumunuz sonlandırılmıştır !'); navigate('/login') })
    }
    const changeSelectSection = (e, pId) => {
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
    }
    const changeStatus = (e,pId) => {
        e.preventDefault();
        axios({
            method : "PUT",
            url:`${baseUrl}/tasks/updatestatus`,
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem('accessToken')
            },
            data:{
                "taskId" : pId,
                "statusId" : 2
            }
        }).then(data => {window.location.reload(false)}).catch(err => alert("Hata"))
    }
    const changeSection = (event,pId) => {
        event.preventDefault();
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
        }).then(data => { window.location.reload(false) }).catch(err => {alert('Oturumunuz sonlandırılmıştır !'); navigate('/login')})
    }
    const addTask = (e) => {
        e.preventDefault()
        if (InputTitle.current.value.length != 0 && InputDesc.current.value.length != 0 && InputEndDate.current.value.length != 0) {
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
                    "statusId": 1,
                    "sectionId": 1,
                    "projectId": location.state.id
                }
            }).then(data => {window.location.reload(false); }).catch(err => {alert('Oturumunuz Sonlandırılmıştır ! '); navigate('/login') })
        }
        else {
            alert("Task Eklemek için ayrılan alanları eksiksiz doldurunuz ! ");
        }
    }
    const goActiveTasks = () => {
        navigate('/main/project', { state: { id: location.state.id } });
    }
    const delTask = (event,pId) => {
        event.preventDefault()
        axios({
            method : "DELETE",
            url : `${baseUrl}/tasks/${pId}`,
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem('accessToken')
            }
        }).then(window.location.reload(false)).catch(err => alert(err))
    }
    useEffect(() => {
        getBacklogTask();
        axios({
            method: "GET",
            url: `${baseUrl}/sections`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            }
        }).then(data => { setSections(data.data) })
    }, [])
    const InputTitle = useRef(null);
    const InputDesc = useRef(null);
    const InputEndDate = useRef(null);
    return (
        <div className="App">
            <div class="container overflow-hidden text-center p-2">
                <div className="card text-bg-secondary p-3 mt-1 text-light">Backlog Görevleriniz</div>
                <button className='btn btn-sm btn-primary pe-2 mt-1' onClick={() => goActiveTasks()}><FaAngleLeft /> Aktif Tasklara Dönmek İçin Tıklayınız</button>
                {backlogTask.length <= 0 ? <div className="card bg-danger text-white mt-5 p-3"><div className="card-title p-2">Backlog Task'ınız Bulunamadı ! </div></div> : Object.values(backlogTask).map(key => (
                    <div class="row gx-5">
                        {Object.values(key.projectList).map(pList => (
                                <div className='col p-3 m-4 card'>
                                    <div className="card-title text-dark text-opacity-75" key={key.user.user_name}><FaUserCircle/> {key.user.user_name}</div>
                                    <div className='card-body'> {pList.section_id == 1 ? <div className='bg-warning text-light'>{sections[pList.section_id - 1]?.name}</div>
                                        : pList.section_id == 2 ? <div className='bg-secondary text-white'>{sections[pList.section_id - 1]?.name}</div>
                                            : pList.section_id == 3 ? <div className='bg-primary text-white'>{sections[pList.section_id - 1]?.name}</div>
                                                : <div className='bg-success text-white'>{sections[pList.section_id - 1]?.name}</div>}</div>
                                    <div className='text-bg-info'><h5>{pList.title}</h5>
                                        <b>{pList.description}</b>
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
                                        Aktif olarak işaretle <br /><FaCheck />
                                    </button>
                                    <center><FaTrash style={{"fontSize":"20pt"}} className="text-danger" onClick={(event) => delTask(event,pList.id)}/></center>
                                </div>
                        ))}
                    </div>
                ))}
            </div>
            <div class="input-group input-group-sm mt-3 mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Başlık</span>
                <input type="text" class="form-control" ref={InputTitle} />
                <span class="input-group-text ms-2" id="inputGroup-sizing-sm">Açıklama</span>
                <input type="text" class="form-control" ref={InputDesc} />
            </div>
            <div className="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm" >Bitiş Tarihi</span>
                <input type="date" class="form-control" ref={InputEndDate} />
            </div>
            <div className="input-group-text bg-white" style={{ "border": "none" }}>
                <button type="button" class="btn btn-primary" onClick={addTask}>Task Ekle</button>
            </div>
        </div>
    )
}
export default BackLogTasks;