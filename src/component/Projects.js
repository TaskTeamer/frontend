import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Projects = () => {
    const [data, setData] = useState(0);
    const getData = async () => {
        const { data } = await axios({
            method: 'GET',
            url: 'https://localhost:7072/todoitems',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).catch(data => { unAuth() })
        setData(data)
    }
    useEffect(() => {
        getData();
    }, [])
    const navigate = useNavigate()
    const clear = (event) => {
        event.preventDefault()
        localStorage.clear()
        navigate('/login')
    }
    const unAuth = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className="App">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Lokasyon</th>
                        <th scope="col">Gezilecek Yer</th>
                        <th scope="col">Tamamlandı mı ?</th>
                    </tr>
                </thead>
                {
                data.map((todo) => (
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td>{todo.location}</td>
                            <td>{todo.job}</td>
                            <td>
                                
                            </td>
                        </tr>
                    </tbody>
                ))
            }
            </table>
            
        </div>
    )
}
export default Projects;