'use client'
import { useEffect } from 'react';

const DragDropHandler = () => {
    useEffect(() => {
        const preventDefaults = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };

        window.addEventListener("dragover", preventDefaults);
        window.addEventListener("drop", preventDefaults);

        return () => {
            window.removeEventListener("dragover", preventDefaults);
            window.removeEventListener("drop", preventDefaults);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default DragDropHandler;
