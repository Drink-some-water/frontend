import Mp3UploadBox from './components/client/mp3-upload-box'
import DragDropHandler from './components/client/drag-drop-handler'
import "./globals.css";

export default function Home() {
  return (
    <div>
      <DragDropHandler />
      <main className="min-h-screen flex items-center justify-center">
        <Mp3UploadBox />
      </main>
    </div>
  );
}
