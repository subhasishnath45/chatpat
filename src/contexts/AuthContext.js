import React, {useContext, useState, useEffect, createContext} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from '../firebase';

// creating our context
const AuthContext = createContext();

// exporting our entire context to use it later.
export function useAuth(){return useContext(AuthContext)};

// children is used along with Auth provider.
// children will render all of the children that we pass into the auth provider.
export const AuthProvider = ({children})=>{
    // setup our states.
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    // The useHistory hook gives you access to the history instance that you may use to navigate.
    const history = useHistory();

    // useEffect takes a callback function as the first argument & 
    // a dependancy array as a second argument.
    useEffect(()=>{
        // following method will detect whenever the state of the auth will change.
        // grabbing the user from firebase authentication.
        auth.onAuthStateChanged((user)=>{
            setUser(user); // setting new user for the application.
            setLoading(false); // make loading to be false.
            history.push('/chats'); // pushing our application to that route.
        });
    },[user,history]) // useEffect will run when the user or history changes.
    // we need one value object.
    const value = { user };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}


