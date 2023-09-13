import { useState, useRef } from 'react';
import './DragDropFile.css';
import SuccessModal from './SuccessModal';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
export const DragDropFile = ({ oldFiles, setFiles, parentSetOpen }) => {
    const [open, setOpen] = useState(false);
    const [filesArray, setFilesArray] = useState([]);

    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    function handleFile(files) {
        setOpen(true);
        setFilesArray(files);
        const data = new FormData();
        console.log(files);
        for (let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/upload',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        let newFiles = [];
        Array.from(files).forEach((file) => {
            newFiles.push({ name: file.name, id: uuid() });
        });
        setFiles([...oldFiles, ...newFiles]);
    }

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form
            className="form-file-upload"
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
        >
            <input
                ref={inputRef}
                type="file"
                className="input-file-upload"
                id="input-file-upload"
                multiple={true}
                onChange={handleChange}
            />
            <label
                id="label-file-upload"
                htmlFor="input-file-upload"
                className={dragActive ? 'drag-active' : ''}
            >
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button" onClick={onButtonClick}>
                        Upload a file
                    </button>
                </div>
            </label>
            {dragActive && (
                <div
                    className="drag-file-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                ></div>
            )}
            <SuccessModal
                open={open}
                setOpen={setOpen}
                files={filesArray}
                parentSetOpen={parentSetOpen}
            />
        </form>
    );
};
