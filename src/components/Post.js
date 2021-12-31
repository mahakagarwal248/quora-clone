import React from 'react';
import '../css/Post.css';
import { Avatar } from '@material-ui/core';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import MoreHorizOutlined from '@material-ui/icons/MoreHorizOutlined';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import '../css/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectquestionId, selectquestionName, setQuestionInfo } from '../features/questionSlice';
import db from "../Firebase";
import { selectUser } from '../features/userSlice';
import firebase from 'firebase/compat/app';

Modal.setAppElement("#root");

function Post({ Id, question, image, timestamp, quoraUser }) {

    const user = useSelector(selectUser);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const questionId = useSelector(selectquestionId);
    const questionName = useSelector(selectquestionName);
    const [answer, setAnswer] = useState("");
    const [getAnswer, setGetAnswer] = useState([])

    useEffect(() => {
        if (questionId) {
            db.collection('questions').doc(questionId).collection('answers').orderBy('timestamp', "desc").onSnapshot((snapshot) => setGetAnswer(snapshot.docs.map((doc) => ({
                id: doc.id,
                answers: doc.data()
            }))))
        }
    },[questionId]);

    const handleAnswer = (e) => {
        e.preventDefault()
        if (questionId) {
            db.collection('questions').doc(questionId).collection('answers').add({
                questionId: questionId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                answer: answer,
                user: user,
            })
        }
        console.log(questionId, questionName);
        setAnswer("")
        setOpenModal(false);
    }
    return (
        <div className="post" onClick={() => dispatch(setQuestionInfo({
            questionId: Id,
            questionName: question
        }))}>
            <div className="post_info">
                <Avatar
                    src={quoraUser.photo}
                />
                <h5>{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</h5>
                <small>{new Date(timestamp.toDate()).toLocaleString()}</small>
            </div>
            <div className="post_body">
                <div className="post_ques">
                    <p>{question}</p>
                    <button onClick={() => setOpenModal(true)} className="post_btn_ans">Answer</button>
                    <Modal
                        isOpen={openModal}
                        onRequestClose={() => setOpenModal(false)}
                        shouldCloseOnOverlayClick={false}
                        style={{
                            overlay: {
                                width: 700,
                                height: 600,
                                backgroundColor: "rgba(0,0,0,0.8)",
                                zIndex: "1000",
                                top: "50%",
                                left: "50%",
                                marginTop: "-300px",
                                marginLeft: "-350px"
                            }
                        }}
                    >
                        <div className="modal_question">
                            <h1>{question}</h1>
                            <p>
                                asked by <span className="name">{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</span>
                                {""}
                                on <span className="name">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                        </div>
                        <div className="modal_answer">
                            <textarea
                                required
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter your answer"
                                type="text"
                            />
                        </div>
                        <div className="modal_button">
                            <button className="cancel" onClick={() => setOpenModal(false)}>Cancel</button>
                            <button onClick={handleAnswer} type="submit" className="add">Add answer</button>
                        </div>
                    </Modal>
                </div>
                <div className="post_answer">
                    {
                        getAnswer.map(({ id, answers }) => (
                            <p
                                key={id}
                                style={{ position: "relative", paddingBottom: "5px", fontSize:"20px" }}
                            >
                                {
                                    Id === answers.questionId ?
                                        (<span>
                                            {answers.answer}
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    color: "gray",
                                                    fontSize: "small",
                                                    display: "flex",
                                                    right: "0px",
                                                }}
                                            >
                                                <span style={{ color: "#b92b27" }}>
                                                    {answers.user.displayName
                                                        ? answers.user.displayName
                                                        : answers.user.email}{" "}
                                                    on{" "}
                                                    {new Date(answers.timestamp?.toDate()).toLocaleString()}
                                                </span>
                                            </span>
                                        </span>) : ("")
                                }
                            </p>
                        ))
                    }
                </div>
                <img
                    src={image}
                    alt=""
                />
            </div>
            <div className="post_footer">
                <div className="post_footer_actions">
                    <ArrowUpwardOutlinedIcon />
                    <ArrowDownwardOutlinedIcon />
                </div>
                <RepeatOutlinedIcon />
                <ChatBubbleOutlineOutlinedIcon />
                <div className="post_footer_left">
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>
        </div>
    )
}

export default Post
