import React, { useState, useRef } from 'react';
import './FileDropZone.styles.css';

export default function DropArea() {

    const onDragOver = e => {
        e.preventDefault();
    }

    const onDragEnter = e => {
        e.preventDefault();
        setDragEntered(true)
    }

    const onDragLeave = e => {
        e.preventDefault();
        setDragEntered(false)
    }

    const fileDrop = e => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) setCurrentFile("jimmy");
        setCurrentFile(files[0].name);
        setDragEntered(false)
    }

    const handleFiles = () => {
        if (dragEntered) return "Then let go to drop!"
        if (currentFile != null) return currentFile;
        return "Double click or drag to add file 📄😎";
    }

    const handleClick = e => {
        e.preventDefault();
        dropAreaBtn.current.click();
    }

    const handleFileChange = e => {
        setCurrentFile(e.currentTarget.value)
    }

    const dropAreaBtn = useRef();

    const [currentFile, setCurrentFile] = useState(null);
    const [dragEntered, setDragEntered] = useState(false);

    return (
        <div>
            <input ref={dropAreaBtn} onChange={handleFileChange} id="fileUpload" className="dropAreaBtn" type="file" hidden />

            <div className="dropArea"
                onDoubleClick={handleClick}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={fileDrop}
            >
                {
                    handleFiles()
                }
            </div>
        </div>

    )
}
