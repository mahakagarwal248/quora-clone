import React,{useState} from 'react';
import '../css/Navbar.css';
import HomeIcon from '@material-ui/icons/Home';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/icons/Link';
import {Avatar, Button, Input} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { auth } from '../Firebase';
import Modal from 'react-modal';
import db from '../Firebase';
import firebase from 'firebase/compat/app';

export default function Navbar() {
    const user = useSelector(selectUser);
    const [openModal, setOpenModal]= useState(false);
    const [input, setInput] = useState("")
    const [inputUrl, setInputUrl] = useState("");
    const handleQuestion =(e)=>{
        e.preventDefault()
        setOpenModal(false)
        db.collection('questions').add({
            question: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user
        });
        setInput("");
        setInputUrl("");
    }
    return (
        <div className="navbar">
            <div className="qHeader_logo">
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/1920px-Quora_logo_2015.svg.png'
                    alt=""
                />
            </div>
            <div className="qHeader_icons">
                <div className="qHeader_icon">
                    <HomeIcon/>
                </div>
                <div className="qHeader_icon">
                    <FeaturedPlayListOutlinedIcon/>
                </div>
                <div className="qHeader_icon">
                    <AssignmentTurnedInOutlinedIcon/>
                </div>
                <div className="qHeader_icon">
                    <PeopleAltOutlinedIcon/>
                </div>
                <div className="qHeader_icon">
                    <NotificationsOutlinedIcon/>
                </div>
            </div>
            <div className="qHeader_input">
                <SearchIcon/>
                <input type="text" placeholder="Search Quora" />
            </div>
            <div className="qHeader_rem">
                <div className="qHeader_avatar">
                    <Avatar
                        onClick={()=>auth.signOut()}
                        src={user.photo}
                    />
                </div>
                <LanguageIcon/>
                <Button onClick={()=>setOpenModal(true)}>Add Question</Button>
                <Modal
                    isOpen = {openModal}
                    onRequestClose={()=>setOpenModal(false)}
                    shouldCloseOnOverlayClick={false}
                    style={{
                        overlay:{
                            width:700,
                        height:600,
                        backgroundColor:"rgba(0,0,0,0.8)",
                        zIndex:"1000",
                        top:"50%",
                        left:"50%",
                        marginTop:"-300px",
                        marginLeft:"-350px"
                        }
                    }}
                >
                    <div className="modal_title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>   
                    <div className="modal_info">
                        <Avatar
                            className="avatar"
                            src={user.photo}
                        />
                        <p>{user.displayName ? user.displayName : user.email}  asked </p>
                        <div className="modal_scope">
                            <PeopleAltOutlinedIcon/>
                            <p>Public</p>
                            <ExpandMore/>
                        </div>
                    </div>
                    <div className="modal_field">
                        <Input
                            required
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                            type="text"
                            placeholder="Start your question with 'what','how','why' etc."
                        />
                        <div className="modal_fieldLink">
                            <Link/>
                            <Input
                                value={inputUrl}
                                onChange={(e)=>setInputUrl(e.target.value)}
                                className="input"
                                type="text"
                                placeholder="Optional : include a link that gives context"
                            />
                        </div>
                    </div>   
                    <div className="modal_buttons">
                        <button onClick={()=>setOpenModal(false)} className="cancel">Cancel</button>
                        <button onClick={handleQuestion} type="submit" className="add">Add Question</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
