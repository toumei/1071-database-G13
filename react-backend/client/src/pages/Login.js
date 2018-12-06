import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div class="container">
                <h1 class="text-center d-4">Log in</h1>
                <form name="addform" action="/login" method="post" accept-charset="utf-8" onSubmit="return Check();">
                    <div class="form-group">
                        <label for="emailInput">Email</label>
                        <input type="text" class="form-control" id="EmailInput" name="email" aria-describedby="EmailHelp"
                            placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <label for="passwordInput">Password</label>
                        <input type="text" class="form-control" id="passwordInput" name="pwd" placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;