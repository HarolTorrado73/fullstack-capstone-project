import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("Login invoked");
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">

                    <div className="login-card p-4 border rounded">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-100"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <p className="mt-4 text-center">
                            New here?
                            <a href="/app/register"> Register</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;