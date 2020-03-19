import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFile } from '../../actions/actionCreators';

const File = ({id, ownerId, filename}) => {
    const dispatch = useDispatch();
    const handleRemove = () => {
        dispatch(removeFile(id, ownerId));
    };

    return (
        <div className="col-md-4">
            <div className="thumbnail">
                <button onClick={handleRemove} type="button" className="close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <img className="img-fluid img-thumbnail" src={`${process.env.REACT_APP_MEDIA_URL}/${filename}`} alt="" />
            </div>
        </div>
    );
}

export default File;
