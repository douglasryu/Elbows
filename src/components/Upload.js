import React, { useCallback, useMemo } from "react";
import { useDropzone } from 'react-dropzone'

const Upload = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };


    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, accept: 'image/*' })

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div {...getRootProps({ style })} className="upload">
            <input {...getInputProps()} />
            {isDragAccept && (<p>Upload</p>)}
            {isDragReject && (<p>Cannot upload this file type</p>)}
            {!isDragActive && (<p>Drag an image or click to select files</p>)}
        </div>
    )

}

export default Upload;