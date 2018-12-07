import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Error from './pages/Error';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/dbCtrl" component={App} />
            <Route path="/products" component={App} />
            <Route path="/login" component={App} />
            <Route component={Error} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
