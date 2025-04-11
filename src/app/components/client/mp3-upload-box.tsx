'use client'
import { useState } from "react";
import { uploadMp3 } from "../server/upload-mp3";

const Mp3UploadBox = () => {
    const [file, setFile] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        if (event.dataTransfer.items) {
            [...event.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                        let blobUrl = URL.createObjectURL(file);
                        setFile(blobUrl);
                        console.log(`items file[${i}].name = ${file.name}`);
                        try {
                            const result = uploadMp3(file);
                        } catch (err) {
                            console.error(`Upload failed for ${file.name}:`, err);
                        }
                    }
                }
            });
        } else {
            [...event.dataTransfer.files].forEach((file, i) => {
                console.log(`file[${i}].name = ${file.name}`);
                try {
                    const result = uploadMp3(file);
                } catch (err) {
                    console.error(`Upload failed for ${file.name}:`, err);
                }
            });
        }
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-4 border-dashed rounded-lg p-10 text-center transition-colors duration-200
                ${isDragging ? 'border-blue-400 bg-blue-50 shadow-md shadow-blue-200' : 'border-gray-400 bg-white'}`}
        >
            {file ? (
                <div>
                    <p className="mb-4">File dropped:</p>
                    <audio controls src={file} className="mx-auto" />
                </div>
            ) : (
                <p className="text-gray-600">Drop an MP3 file here or click to browse</p>
            )}
        </div>
    );
};

export default Mp3UploadBox;
