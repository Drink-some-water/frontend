export async function getMp3(): Promise<string[]> {
    const res = await fetch("http://localhost:8000/get-files");
    const data = await res.json();

    const urls: string[] = [];

    for (const file of data.files) {
        // Decode base64 to a Blob
        const byteString = atob(file.content);
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        urls.push(url);
    }

    return urls;
}


