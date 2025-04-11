'use client';
import { useState } from "react";
import { uploadMp3 } from "../server/upload-mp3";

const Mp3UploadBox = () => {
    const [fileUrls, setFileUrls] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // prevents browser from opening the file
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const handleFile = (file: File) => {
            if (!file.type.startsWith("audio/")) return;

            const blobUrl = URL.createObjectURL(file);
            setFileUrls(prev => [...prev, blobUrl]);

            try {
                uploadMp3(file);
            } catch (err) {
                console.error(`Upload failed for ${file.name}:`, err);
            }
        };

        if (event.dataTransfer.items) {
            for (const item of event.dataTransfer.items) {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) handleFile(file);
                }
            }
        } else if (event.dataTransfer.files) {
            for (const file of event.dataTransfer.files) {
                handleFile(file);
            }
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
            {fileUrls.length > 0 && (
                <div className="space-y-6">
                    <p className="mb-4">Files dropped:</p>
                    {fileUrls.map((url, idx) => (
                        <audio key={idx} controls src={url} className="mx-auto" />
                    ))}
                </div>
            )}

            <p className="text-gray-600">Drop one or more MP3 files here or click to browse</p>
        </div>
    );
};

export default Mp3UploadBox;
