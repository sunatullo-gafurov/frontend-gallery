import React, { useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRegisterFieldChange, register, dismissMessages } from '../../actions/actionCreators';
import { EMAIL, PASSWORD, SERVER_ERROR } from '../../utils';
import Loader from '../Loader';



const RegistrationForm = () => {
    const {user: {fname, lname, email, password}, loading, error} = useSelector(state => state.users.current);
    const dispatch = useDispatch();
    const emailRef = useRef(null);


    useEffect(() => {
        if (error && error.type === EMAIL) {
            emailRef.current.focus();
        }
    }, [error]);
    

    const newUser = {
        fname,
        lname,
        email,
        password
    };


    const handleSubmit = e => {
        e.preventDefault();        
        dispatch(register(newUser));
    };

    const handleChange = e => {
        const {name, value} = e.target;
        dispatch(userRegisterFieldChange(name, value));
    };

    const handleDismiss = () => {
        dispatch(dismissMessages());
    };    

    return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">
                            <i className="fas fa-user-plus"/> Register
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <label htmlFor="fname">First Name</label>
                            <input
                                type="text"
                                id="fname"
                                name="fname"
                                className="form-control"
                                placeholder="Enter your first name"
                                onChange={handleChange}
                                required                                
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <input
                                type="text"
                                id="lname"
                                name="lname"
                                className="form-control"
                                placeholder="Enter your last name"
                                onChange={handleChange}
                                required                                
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="email">Email</label>
                            {error && error.type === EMAIL &&
                                <div className="alert alert-warning">
                                <span>{error.message}</span>
                                <button onClick={handleDismiss} type="button" className="close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                            }
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={handleChange}
                                required
                                ref={emailRef}
                                
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Create Password"
                                onChange={handleChange}
                                required                                
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            {error && error.type === PASSWORD &&
                                <div className="alert alert-warning">
                                <span>{error.message}</span>
                                <button onClick={handleDismiss} type="button" className="close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                            }
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                className="form-control"
                                placeholder="Confirm Password"
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
                            <button type="submit" className="btn btn-primary btn-block">
                            Register
                            </button>
                        </form>
                        <p className="lead mt-4">Have An Account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
                {loading && <Loader />}
            </div>
    );
};

export default RegistrationForm;
