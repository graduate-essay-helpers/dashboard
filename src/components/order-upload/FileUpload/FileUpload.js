import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.css'
import axios from 'axios'

const FileUpload = ({ files, setFiles, removeFile }) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        file.isUploading = true;
        setFiles([...files, file])

        // upload file
        const formData = new FormData();
        formData.append(
            "newFile",
            file,
            file.name
        )
        axios.post('http://localhost:8000/essay-helpers/api/uploadfile.php', {
            formData,
            filename: file.name,
        })
            .then((res) => {
                file.isUploading = false;
                console.log(res);
                setFiles([...files, file])
            })
            .catch((err) => {
                // inform the user
                console.error(err)
                removeFile(file.name)
            });

        console.log(file);
        console.log(formData);
        // console.log(file);
    }

    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} />
                    <button>
                        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
                        Upload
                    </button>
                </div>

                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>

            </div>
        </>
    )
}

export default FileUpload
