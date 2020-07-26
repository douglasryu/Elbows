import React, { useState } from "react";
import Dropzone from 'react-dropzone-uploader'

import { baseUrl } from "../config";

const Upload = () => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");

    const [customInput, setCustomInput] = useState(false);
    const [inputText, setInputText] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const handleTextInput = event => {
        setInputText(event.target.value);
    }

    const getUploadParams = async ({ meta: { name } }) => {
        const res = await fetch(`${baseUrl}/api/aws/presign/${name}`);
        const { fields, url, fileUrl } = await res.json();
        setFileUrl(fileUrl);
        console.log(fields, url, fileUrl);
        return { fields, meta: { fileUrl: fileUrl }, url: url }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        // console.log(status, meta, file);
        setCustomInput(true);
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = async (files, allFiles) => {
        // console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove());
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, location: "New York", postImage: fileUrl, postBody: inputText }),
        }
        const response = await fetch(`${baseUrl}/api/posts`, options);
        setCustomInput(false);
    }

    return (
        <div className="upload__container">
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,video/*"
                inputContent={(files, extra) => (extra.reject ? "Cannot upload this file type" : "Drag an image or click to select a file")}
                styles={{
                    dropzone: { border: "1px dashed rgba(156, 175, 183, 0.9)", padding: "100px 100px 100px 100px" },
                    dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA', padding: "100px 135px" },
                    dropzoneActive: { borderColor: 'green', backgroundColor: "rgba(156, 175, 183, 0.5)" },
                    input: { display: "none" },
                    inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                    previewImage: { width: 500 },
                    submitButtonContainer: { display: "flex", justifyContent: "center" },
                    submitButton: { padding: "10px 30px 10px 30px", marginTop: "100px", marginBottom: "-70px", backgroundColor: "rgba(156, 175, 183, 0.7)", borderRadius: "4px" },
                    inputLabelWithFiles: { display: "none" },
                }}
                submitButtonContent="Upload"
            />
            {customInput ? <textarea className="upload__input" rows="3" cols="40" wrap="soft" value={inputText} onChange={handleTextInput} placeholder="Add a caption.." /> : null}
        </div>
    )
}

export default Upload;