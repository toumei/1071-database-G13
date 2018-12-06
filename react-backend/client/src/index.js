import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './partials/Navbar';
import Header from './partials/Header';
import DBCtrl from './pages/DBCtrl';
import Products from './pages/Products';
import Login from './pages/Login';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router, Route
} from 'react-router-dom'

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
                        <button class="btn btn-primary text-light btn-block"><i class="fas fa-plus"></i> Add Post</button>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-success text-light btn-block"><i class="fas fa-plus"></i> Add Category</button>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-warning btn-block"><i class="fas fa-plus"></i> Add Users</button>
                    </div>
                </div>
            </div>
        </section>
        <DBCtrl />
    </div>
)

ReactDOM.render(
    <Router>
        <div>
            <Navbar />
            <Header />
            <Route exact path="/" component={index} />
            <Route path="/dbCtrl" component={dbCtrl} />
            <Route path="/products" component={Products} />
            <Route path="/login" component={Login} />
        </div>
    </Router>,
    document.getElementById('root'));

serviceWorker.unregister();
