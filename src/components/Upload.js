import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from 'react-dropzone'

import { baseUrl } from "../config";

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setImage(acceptedFiles[0]);
        // setFiles(Object.assign(files, { preview: URL.createObjectURL(files) }))
        console.log(acceptedFiles[0].path);
    });

    const uploadHandler = async (event) => {
        event.stopPropagation();
        const formData = new FormData()
        formData.append('file', image)
        // console.log(formData).getAll();
        const options = {
            method: "POST",
            body: formData
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ files: image })
        }
        const response = await fetch(`${baseUrl}/api/aws/1`, options);
        console.log(response.json());

    }

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

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 300,
        height: 300,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 0,
        // overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    const onDrop2 = (e) => {
        setImage(e.target.files[0]);
        // setImagePreview(URL.createObjectURL(e.target.files[0]))
    };

    return (
        <div className="upload__container">
            <div {...getRootProps({ style })} className="upload__box">
                <input {...getInputProps()} />
                {isDragAccept && (<p>Upload</p>)}
                {isDragReject && (<p>Cannot upload this file type</p>)}
                {!isDragActive && (<p>Drag an image or click to select files</p>)}
                <aside style={thumbsContainer} className="upload__thumbnail">
                    {thumbs}
                </aside>
                <button onClick={uploadHandler} className="upload__button">Upload</button>
            </div>
            <form method="POST" enctype="multipart/form-data">
                {/* <input type="file" name="file" /> */}
                <input className="custom-file-input" type='file' multiple={false} accept='.jpg, .gif, .png, .gif' onChange={onDrop2} />
                <button onClick={uploadHandler}>Upload</button>
            </form>
        </div>
    )

}

export default Upload;