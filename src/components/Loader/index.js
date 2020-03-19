import React from 'react'

const Loader = () => {
    return (
        <div className="d-flex justify-content-center loading">
            <div className="spinner-border text-primary loader" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Loader;
