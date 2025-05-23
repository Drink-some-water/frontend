"use client";

import Mp3UploadBox from './components/client/mp3-upload-box'
import DragDropHandler from './components/client/drag-drop-handler'
import "./globals.css";
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirect to Discord auth
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  return (
    <div>
      Welcome, {session.user?.name}!
      <DragDropHandler />
      <main className="min-h-screen flex items-center justify-center">
        <Mp3UploadBox />
      </main>
    </div>
  );
}
