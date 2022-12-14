import React, { useState } from 'react';
import {
    FaBriefcase,
    FaBars,
    FaUserAlt,
    FaProjectDiagram,
    FaChevronRight,
    FaHome,
} from "react-icons/fa";
import { NavLink,Link, Outlet } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = (props, { children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const clear = (event) => {
        localStorage.clear()
    }
    const menuItem = [
        {
            path: "/main",
            name: "Ana Sayfa",
            icon: <FaHome/>
        },
        {
            path:"main/projects",
            name : "Projeler",
            icon : <FaProjectDiagram/>
        },
        {
            path: "/login",
            name: "Çıkış",
            icon: <FaChevronRight onClick={clear}/>
        }
        
        
    ]
    return (
        <div className='cont' >
            <div style={{ width: isOpen ? "215px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <div style={{ display: isOpen ? "block" : "none" }} className="logo">{props.profile}</div>
                    <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div> 
                {
                    menuItem.map((item, index) => (
                        <Link to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none","padding":"15px" }} className="link_text">{item.name}</div>
                        </Link>
                      ))
                }
                <main>{children}</main>
            </div>
            <Outlet/>
        </div>
    );
};

export default Sidebar;