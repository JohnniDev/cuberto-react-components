import React from 'react';
import {createBrowserHistory} from 'history';
import {Router, Switch, Route, Redirect, Link} from 'react-router-dom';

// Components:
import Main from "../Main/Main";
import Dropdown from "../Dropdown/Dropdown";

import './App.css';

const history = createBrowserHistory();

export default () => (
    <Router history={history}>
        <div className="app">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <aside className="menu main-menu">
                            <p className="menu-label">General</p>
                            <ul className="menu-list">
                                <li><Link to="/main">Overview</Link></li>
                            </ul>
                            <p className="menu-label">Components</p>
                            <ul className="menu-list">
                                <li><Link to="/dropdown">Dropdown</Link></li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column">
                        <Switch>
                            <Route path="/" exact component={() => <Redirect to={{pathname: '/main'}}/>}/>
                            <Route path="/main" component={Main}/>
                            <Route path="/dropdown" component={Dropdown}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    </Router>
);