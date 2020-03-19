import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFile } from '../../actions/actionCreators';

const File = ({id, ownerId, filename}) => {
    const dispatch = useDispatch();
    const handleRemove = () => {
        dispatch(removeFile(id, ownerId));
    };

    return (
        <div className="BlockTwo">
            <div className="">
                <button onClick={handleRemove} type="button" className="CloseBlock">
                    <span aria-hidden="true"><i className="far fa-times-circle"></i></span>
                </button>
                <img className="img-fluid img-thumbnail" src={`${process.env.REACT_APP_MEDIA_URL}/${filename}`} alt="" />
            </div>
        </div>
    );
}

export default File;
