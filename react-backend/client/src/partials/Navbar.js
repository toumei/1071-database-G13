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
                                <Link class="nav-link dropdown-toggle" data-toggle="dropdown" to="/user">
                                    <i class="fas fa-user"></i> Welcome Brad
                                </Link>
                                <div class="dropdown-menu">
                                    <Link class="dropdown-item" to="/profile">
                                        <i class="fas fa-user-circle"></i> Profile
                                    </Link>
                                    <Link class="dropdown-item" to="/settings">
                                        <i class="fas fa-cog"></i> Settings
                                    </Link>
                                </div>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/login">
                                    <i class="fas fa-user-times"></i> Logout
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;