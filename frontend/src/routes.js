import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login/'
import Dashboard from './pages/Dashboard/'
import Register from './pages/Register/'
import EventsPage from './pages/EventsPage'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/' exact component={Dashboard} />
                <Route path='/events' exact component={EventsPage} />
            </Switch>
        </BrowserRouter>
    )
}