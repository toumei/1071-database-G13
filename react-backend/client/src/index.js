import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './partials/Navbar';
import Header from './partials/Header';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router, Route
} from 'react-router-dom'

// ReactDOM.render(<Navbar />, document.getElementById('navbar'));
// ReactDOM.render(<App />, document.getElementById('root'));

const index = () => (
    <div>

    </div>
)

const dbCtrl = () => (
    <div>
        <section class="bg-light py-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-2">
                        <a class="btn btn-primary text-light btn-block" href="#"><i class="fas fa-plus"></i> Add Post</a>
                    </div>
                    <div class="col-md-2">
                        <a class="btn btn-success text-light btn-block" href="#"><i class="fas fa-plus"></i> Add Category</a>
                    </div>
                    <div class="col-md-2">
                        <a class="btn btn-warning btn-block" href="#"><i class="fas fa-plus"></i> Add Users</a>
                    </div>
                </div>
            </div>
        </section>
        <App />
    </div>
)

ReactDOM.render(
    <Router>
        <div>
            <Navbar />
            <Header />
            <Route exact path="/" component={index} />
            <Route path="/dbCtrl" component={dbCtrl} />
            <Route path="/products" component={App} />
        </div>
    </Router>,
    document.getElementById('root'));

serviceWorker.unregister();
