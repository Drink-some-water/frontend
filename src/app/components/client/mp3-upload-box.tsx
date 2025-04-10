'use client'
import {useState} from "react";

//BACKLOG: add userFiles as an arg of mp3UploadBox when loading playlist from server 
const mp3UploadBox = () => {
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
            onDrop={fileDrop}
            onDragOver={(e) => e.preventDefault()} // Allow drag over
        >
            {/* Your content here */}
        </div>
    )
}

export default mp3UploadBox;