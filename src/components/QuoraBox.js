import React from 'react';
import '../css/QuoraBox.css';
import {Avatar, Button} from '@material-ui/core';
import { selectUser } from '../features/userSlice';
import {useSelector} from 'react-redux';

function QuoraBox() {
    const user =useSelector(selectUser)
    return (
        <div className="quoraBox">
            <div className="quoraBox_info">
                <Avatar
                    src={user.photo}
                />
                <h5>{user.displayName}</h5>
            </div>
            <div className="quoraBox_quora">
                <p>What's your question or link?</p>
            </div>
        </div>
    )
}

export default QuoraBox;
