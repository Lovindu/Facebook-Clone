import React from 'react';
import "./SidebarOption.css";

function SidebarOption({text, icon}) {
    return (
        <div className="sidebarOption">
            <img src={icon} alt=""/>
            <p>{text}</p>
        </div>
    )
}

export default SidebarOption
