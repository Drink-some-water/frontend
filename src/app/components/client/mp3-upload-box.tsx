'use client'
import {useState} from "react";

//BACKLOG: add userFiles as an arg of mp3UploadBox when loading playlist from server 
const Mp3UploadBox = () => {
    const [file, setFile] = useState<string>();
    //const [fileEnter, setFileEnter] = useState(false) //used to track whether there is a file being dragged for visualization

    const fileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // stops the browser from opening the file
        if (event.dataTransfer.items) {
            [...event.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                        let blobUrl = URL.createObjectURL(file);
                        setFile(blobUrl);
                    }
                    console.log(`items file[${i}].name = ${file?.name}`);
                }
            });
        } else {
            [...event.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    }
    
    return (
        <div
        className="border-4 border-dashed border-gray-400 rounded-lg p-10 text-center hover:border-blue-400 transition-colors duration-200"
        onDrop={fileDrop}
        onDragOver={(e) => e.preventDefault()}
    >
        {file ? (
            <div>
                <p className="mb-4">File dropped:</p>
                <audio controls src={file} className="mx-auto" />
            </div>
        ) : (
            <p className="text-gray-600">Drop an MP3 file here</p>
        )}
    </div>
    )
}

export default Mp3UploadBox;