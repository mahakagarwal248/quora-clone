import React,{useState} from 'react';
import '../css/Feed.css';
import Post from './Post';
import QuoraBox from './QuoraBox';
import {useEffect} from 'react';
import db from '../Firebase';

function Feed() {
    const [posts,setPosts] = useState([])
    useEffect(() => {
       db.collection('questions').orderBy('timestamp',"desc").onSnapshot(snapshot => setPosts(snapshot.docs.map((doc)=>(({
           id: doc.id,
           question: doc.data()
       })))))
    }, [])
    return (
        <div className="feed">
            <QuoraBox/>
            {
                posts.map(({id,question})=>(
                    <Post
                        key = {id}
                        Id = {id}
                        image = {question.imageUrl}
                        question = {question.question}
                        timestamp = {question.timestamp}
                        quoraUser = {question.user}
                    />
                ))
            }
        </div>
    )
}

export default Feed
