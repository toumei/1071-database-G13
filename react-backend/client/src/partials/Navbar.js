import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand" to="/">首頁</Link>
                    <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" to="/dbCtrl">資料庫</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/malfunction">報修單</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/processing">維修單</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/products">products</Link>
                            </li>
                        </ul>

                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                    <i class="fas fa-user"></i>
                                    <Link to="/Welcome">Welcome Brad</Link>
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-user-circle"></i>
                                        <Link to="/Profile">Profile</Link>
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-cog"></i>
                                        <Link to="/Settings">Settings</Link>
                                    </a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="fas fa-user-times"></i>
                                    <Link to="/Logout">Logout</Link>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;