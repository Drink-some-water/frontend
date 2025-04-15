export async function uploadMp3(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://webhook.site/your-temp-url', {
    method: 'POST',
    body: formData,
  }); 

  if (!response.ok) {
    throw new Error(`Failed to upload MP3: ${response.statusText}`);
  }

  const result = await response.json().catch(() => ({})); // In case it returns plain text
  return result;
}
