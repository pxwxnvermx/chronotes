import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false },
);

const randomIdString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

type Note = {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

const Note = ({
  note,
  changeNote,
}: {
  note: Note;
  changeNote: (content: string) => void;
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.innerHTML = note.content;
  }, [note.content]);

  return (
    <div className="border rounded p-2 mb-2">
      <div className="text-xs mb-1">
        Created AT {new Date(note.createdAt).toString()} : Last Updated At{" "}
        {new Date(note.updatedAt).toString()}
      </div>
      <hr />
      <div className="mt-2 markdown-body" ref={contentRef} />
    </div>
  );
};

const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");

  const addNote = (note: string) => {
    const newNotes = [
      ...notes,
      {
        id: randomIdString(),
        content: note,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ].sort((a, b) => b.createdAt - a.createdAt);
    setNotes(newNotes);
  };

  const changeNote = (id: string) => {
    return (content: string) => {
      setNotes(
        notes.map((note) => {
          if (note.id === id) {
            note.content = content;
            note.updatedAt = Date.now();
          }

          return note;
        }),
      );
    };
  };

  return (
    <div className="mx-2 md:max-w-screen-lg md:mx-auto">
      <header>
        <nav className="mt-3 mb-6">
          <h1 className="text-xl">
            ⏳ CHRO<i>NOtes</i>
          </h1>
        </nav>
      </header>
      <main>
        <div className="mt-2">
          <ReactQuill
            className="border rounded p-2"
            theme="bubble"
            value={content}
            onChange={setContent}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                addNote(content);
                setContent("");
              }
            }}
          />
        </div>

        <div className="mt-2">
          <h1 className="text-3xl my-2">All Notes</h1>
          {notes.map((note) => (
            <Note note={note} changeNote={changeNote(note.id)} key={note.id} />
          ))}
        </div>
      </main>
      <footer>
        <nav></nav>
      </footer>
    </div>
  );
};

export default Home;
