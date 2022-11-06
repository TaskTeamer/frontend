import React, { useState } from 'react';
import {
    FaBriefcase,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaChevronRight
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import Projects from './Projects';
import './Sidebar.css'
const Sidebar = (props, { children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/profile",
            name: "Profil",
            icon: <FaUserAlt />
        },
        {
            path: "/projects",
            name: "Projeler",
            icon: <FaBriefcase />
        },
        {
            path: "/logged/analytics",
            name: "Analytics",
            icon: <FaRegChartBar/>
        },
        {
            path: "/login",
            name: "Çıkış",
            icon: <FaChevronRight onClick={props.logOut}/>
        }
    ]
    return (
        <div className='cont'>
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <p style={{ display: isOpen ? "block" : "none" }} className="logo">{props.name}</p>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>

                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Sidebar;