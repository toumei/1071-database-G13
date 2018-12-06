import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header class="bg-primary text-light ">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <h1><i class="fas fa-cog"></i>
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