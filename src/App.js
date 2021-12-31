import React,{useEffect} from 'react';
import './App.css';
import Login from './components/auth/Login';
import Quora from './components/Quora';
import { login, logout, selectUser } from './features/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import { auth } from './Firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          displayName:authUser.displayName,
          email:authUser.email
        }));
      }
      else{
        dispatch(logout())
      }
    })
  },[dispatch]);

  return (
    <div className="App">
      {
        user ? (<Quora/>) : (<Login/>)
      }
      
    </div>
  );
}

export default App;
