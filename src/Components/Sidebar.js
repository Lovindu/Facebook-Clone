import React from 'react';
import "./Sidebar.css";
import SidebarOption from './SidebarOption';
import { Avatar } from '@material-ui/core';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__user">
                <Avatar className="sidebarUser__avatar"/>
                <p>Lovindu</p>
            </div>

           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/5rR6LRpNc5u.png" text="COVID-19 Information Center"/>
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png" text="Find Friends"/>    
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png" text="Pages"/>
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png" text="Groups"/>
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png" text="Watch"/>
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/8wTx0Eu2vRq.png" text="Events"/>
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/VPndBxotRgH.png" text="Memories"/>
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png" text="Saved"/>
           <SidebarOption icon="https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/DO-SN-shaZL.png" text="Jobs"/>
        </div>
    )
}

export default Sidebar;
