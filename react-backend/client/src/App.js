import React, { Component } from 'react';
import Navbar from './partials/Navbar';
import Header from './partials/Header';
import DBCtrl from './pages/DBCtrl';
import Products from './pages/Products';
import Login from './pages/Login';
import { Switch, Route } from 'react-router-dom'

const index = () => (
    <div>

    </div>
)

const dbCtrl = () => (
    <div>
        <section className="bg-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <button className="btn btn-primary text-light btn-block"><i className="fas fa-plus"></i> Add Post</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success text-light btn-block"><i className="fas fa-plus"></i> Add Category</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-warning btn-block"><i className="fas fa-plus"></i> Add Users</button>
                    </div>
                </div>
            </div>
        </section>
        <DBCtrl />
    </div>
)

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={index} />
            <Route path="/dbCtrl" component={dbCtrl} />
            <Route path="/products" component={Products} />
            <Route path="/login" component={Login} />
        </Switch>
    </main>
)

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;