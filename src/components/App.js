import React from 'react'
import '../index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {AuthProvider} from '../contexts/AuthContext';
import Login from './Login';
import Chats from './Chats';
export default function App() {
    return (
        <div className="wrapper">
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route path="/chats" component={Chats} />
                        <Route path="/" component={Login} />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    )
}
