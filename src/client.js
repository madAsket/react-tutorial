import React from "react"
import {browserHistory, Router} from 'react-router'
import routes from './routes'
import ReactDOM from "react-dom"

const component = (
    <Router history={browserHistory}>
        {routes}
    </Router>
);

ReactDOM.render(component, document.getElementById('react-view'));