import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="bg-primary text-light ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className="fas fa-cog"></i>
                                title
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;