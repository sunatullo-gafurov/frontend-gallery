import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, fetchFiles, fileUpload, dismissMessages } from '../../actions/actionCreators';
import FileList from '../FileList';
import Loader from '../../components/Loader';

const Dashboard = () => {
    const {message, user: {fname, lname}} = useSelector(state => state.auth.list);
    const {message: fileMessage, loading, error} = useSelector(state => state.files.list);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    
    useEffect(() => {
        dispatch(fetchFiles());
    }, [dispatch]);

    const handleChange = () => {       

    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleUpload = e => {
        e.preventDefault();
        const [file] = Array.from(fileRef.current.files);
        dispatch(fileUpload(file));
        fileRef.current.value = '';
    };

    const handleDismiss = () => {
        dispatch(dismissMessages());
    };

    return (
        <>
            <div className="d-flex">
                <div className="col-md-6 m-auto">
                    {message && 
                    <div className="mt-2 p-1 alert alert-success text-center">
                        <span>{message}</span>
                        <button onClick={handleDismiss} type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    }
                    {fileMessage && 
                    <div className="mt-2 p-1 alert alert-success text-center">
                        <span>{fileMessage}</span>
                        <button onClick={handleDismiss} type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    }
                    <h3 className="text-muted">Welcome {fname} {lname} </h3>
                    {error &&
                        <div className="alert alert-warning">
                        <span>{error.message}</span>
                        <button onClick={handleDismiss} type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    }
                    <form onSubmit={handleUpload}>
                        <div className="custom-file mt-2">
                            <input ref={fileRef} type="file" className="custom-file-input" onChange={handleChange} required/>
                            <label className="custom-file-label">Choose file</label>
                        </div>
                        <button className="btn btn-primary btn-block mt-2">Upload</button>
                    </form>
                </div>
                <div className="mt-2 mr-2">
                    <button onClick={handleLogout} className="btn btn-secondary float-right">Logout</button>
                </div>
            </div>
            <div className="containner">
                <div className="d-flex mt-4">
                    <FileList />
                </div>
            </div>
            {loading && <Loader />}
        </>
    );
}

export default Dashboard;
