import React from 'react';
import {createBrowserHistory} from 'history';
import {Router, Switch, Route, Redirect, Link} from 'react-router-dom';

// Components:
import Main from "../Main/Main";
import DropdownPage from "../DropdownPage/DropdownPage";
import DropdownPageWithHooks from "../DropdownPageWithHooks/DropdownPageWithHooks";

import './App.css';

const history = createBrowserHistory();

export default () => (
    <Router history={history}>
        <div className="app">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-fifth">
                        <aside className="menu main-menu">
                            <p className="menu-label">General</p>
                            <ul className="menu-list">
                                <li><Link to="/main">Overview</Link></li>
                            </ul>
                            <p className="menu-label">Components</p>
                            <ul className="menu-list">
                                <li><Link to="/dropdown">Dropdown</Link></li>
                                <li><Link to="/dropdown-hooks">Dropdown Hooks</Link></li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column">
                        <Switch>
                            <Route path="/" exact component={() => <Redirect to={{pathname: '/main'}}/>}/>
                            <Route path="/main" component={Main}/>
                            <Route path="/dropdown" component={DropdownPage}/>
                            <Route path="/dropdown-hooks" component={DropdownPageWithHooks}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    </Router>
);