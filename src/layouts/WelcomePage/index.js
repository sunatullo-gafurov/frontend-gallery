import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Logos/pngtree.jpg';

const WelcomePage = () => {
    
    return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body text-center">
                    <img className="w-25 mx-auto" src={logo} alt=""/>
                    <h1>My Gallery</h1>
                    <p>Create an account or login</p>
                    <Link to="/register" className="btn btn-primary btn-block mb-2">Register</Link>
                    <Link to="/login" className="btn btn-success btn-block">Login</Link>
                    </div>
                </div>
            </div>
    );
};

export default WelcomePage;
