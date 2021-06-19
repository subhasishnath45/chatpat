import React, {useRef, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import '../index.css';
import {useAuth} from '../contexts/AuthContext';
import axios from 'axios';

import logo from '../images/logobrand.png';

// logout functionality
export default function Chats() {
    // useRef returns a mutable ref object whose .current property is initialized to 
    // the passed argument (initialValue). 
    const didMountRef = useRef(false);
    const history = useHistory();
    // destructurizing user from the imported context.
    // user data is comming from useAuth.
    const {user} = useAuth();
    // console.log(user);
    const [loading, setLoading] = useState(true);

    // following method is for loggingout.
    const handleLogout = async ()=>{
        await auth.signOut(); // signing out
        history.push('/'); // going back to the root directory.
    }
    // following method will fetch the user image.
    async function getFile(url){
        const response = await fetch(url);
        // blobs are usuually any files, like images or other files.
        const data = await response.blob();
        return new File([data], 'test.jpg', {type: 'image/jpeg'});
    }

    useEffect(()=>{
        if (!didMountRef.current) {
            didMountRef.current = true
            if(!user || user === null){ // if noone is loggedin yet.
                history.push('/');
                return;
            }
            //if someone is loggedin already.
            // we fetch user data.
            axios.get('https://api.chatengine.io/users/me/', {
                headers:  {
                    'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
                    'user-name': user.email,
                    'user-secret': user.uid,
                }
            }).then(()=>setLoading(false)).catch((e)=>{
                //The FormData() constructor creates a new FormData object.
                let formdata = new FormData();
                // You could add a key/value pair to this using FormData.append:
                formdata.append('email',user.email);
                formdata.append('username',user.email);
                formdata.append('secret',user.uid);
                // if a photo available for the user.
                getFile(user.photoURL).then((avatar)=>{
                    formdata.append('avatar',avatar, avatar.name);
                    // calling our chat engine api and sending a post request
                    // to create a user.
                    axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {
                        headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}
                    }).then(()=>setLoading(false))
                    .catch((e)=>console.log('e',e.response))
                })
            });
        }
    },[user,history]);
    if(!user || loading) return <div />;
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    <img src={logo} className="logo-img"/>
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh-66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}
