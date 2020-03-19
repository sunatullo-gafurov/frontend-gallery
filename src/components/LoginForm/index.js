import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Logos/pngtree.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginFieldChange, userLogin, dismissMessages } from '../../actions/actionCreators';
import { ERROR, SERVER_ERROR } from '../../utils';
import Loader from '../Loader';

const LoginForm = () => {
    const {loading, error} = useSelector(state => state.auth.list);
    const dispatch = useDispatch();

    const handleChange = e => {
        const {name, value} = e.target;
        dispatch(userLoginFieldChange(name, value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(userLogin());
        
    };

    const handleDismiss = () => {
        dispatch(dismissMessages());
    };

    return (
    <>
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                <img className="w-25 mx-auto" src={logo} alt=""/>
                <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"/>  Login</h1>
                <form onSubmit={handleSubmit}>
                {error && error.type === ERROR &&
                    <div className="alert alert-warning">
                    <span>{error.message}</span>
                    <button onClick={handleDismiss} type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                }
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        required
                    />
                    </div>
                    {error && error.type === SERVER_ERROR &&
                    <div className="alert alert-warning">
                    <span>{error.message}</span>
                    <button onClick={handleDismiss} type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                }
                    <button type="submit" className="btn btn-success btn-block">Login</button>
                </form>
                <p className="lead mt-4">
                    No Account? <Link to="/register">Register</Link>
                </p>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    </>
    );
};

export default LoginForm;
