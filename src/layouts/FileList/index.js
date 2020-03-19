import React from 'react'
import File from '../File';
import { useSelector } from 'react-redux';

const FileList = () => {
    const {files} = useSelector(state => state.files.list);
    return (
        <>
            {files.map(o => <File key={o.id} {...o} />)}
        </>
    )
}

export default FileList;
