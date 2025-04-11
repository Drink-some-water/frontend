export async function uploadMp3(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    // Debug: log the form data
    console.log("Uploading file:");
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const contentType = res.headers.get("content-type");
            const errorText = contentType?.includes("application/json")
                ? (await res.json())?.error || "Unknown server error"
                : await res.text();

            throw new Error(`Server responded with ${res.status}: ${errorText}`);
        }

        return await res.json();
    } catch (err: any) {
        throw new Error(`Upload failed (${file.name}, ${file.size} bytes): ${err.message}`);
    }
}
