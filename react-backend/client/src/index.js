import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './partials/Navbar';
import Header from './partials/Header';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Link, hashHistory } from 'react-router'

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<Header />, document.getElementById('header'));
// ReactDOM.render(<App />, document.getElementById('root'));
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/users/1">Users 1</Link></li>
                    <li><Link to="/users/2">Users 2</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

class About extends React.Component {
    render() {
        return (<h1>About</h1>);
    }
}

class Users extends React.Component {
    render() {
        const id = this.props.params.userId;
        return (
            <div>
                user id: {id}
            </div>
        )
    }
}


ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="about" component={About} />
                <Route path="users/:userId" component={Users} />
            </Route>
        </Router>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
