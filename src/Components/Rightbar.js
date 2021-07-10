import React from 'react';
import './Rightbar.css';
import AddIcon from '@material-ui/icons/Add';

function Rightbar() {
    return (
        <div className="rightbar">
            <h3>Group Converstation</h3>
            <div className="rightbar__item">
                <AddIcon className="rightbar__icon"/>
                <p>Create a new Group</p>
            </div>
        </div>
    )
}

export default Rightbar;
