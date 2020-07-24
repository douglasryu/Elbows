import React, { useState, useCallback, useMemo } from "react";
import Dropzone from 'react-dropzone-uploader'

import { baseUrl } from "../config";

const Upload2 = () => {
    const getUploadParams = async ({ meta: { name } }) => {
        const res = await fetch(`${baseUrl}/api/aws/presign/${name}`);
        const { fields, url, fileUrl } = await res.json();
        console.log(fields, url, fileUrl);
        return { fields, meta: { fileUrl: fileUrl }, url: url }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        // files.map()
        allFiles.forEach(f => f.remove())
    }

    return (
        <div className="upload__container">
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*"
            />
        </div>
    )
}

export default Upload2;